import Component from '@/components/component';

import ImgBox from '@/components/img-box/img-box';

import likeImg from '@/assets/images/like.svg';
import likeActiveImg from '@/assets/images/like_active.svg';
import DropDown from '@/components/drop-down/drop-down';

import styles from '@/styles/components/product-list-item/product-list-item.module.scss';

import { getTimeStamp } from '@/utils/getTimeStamp';
import { getApi, postApi, deleteApi } from '@/utils/api';
import { showAlert } from '@/screens/alert-screen';

// proprs { title, location, timeStamp, price, commentCount, likeCount }
export default class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.productData = this._props.productData;

    this.$dom = this.createDom('div', {
      className: styles['product-list-item'],
    });

    this.ImgBox = new ImgBox({
      type: 'large',
      imageURL: this.productData.image,
    });
    this.ImgBox.$dom.classList.add(styles['img-box']);

    this.DropDown = new DropDown({
      itemList: [
        {
          label: '수정하기',
          state: 'normal',
        },

        {
          label: '삭제하기',
          state: 'highlighted',
        },
      ],

      onClick: (e, label) => {
        e.stopPropagation();
        e._dropdownClicked = true;
        if (label === '수정하기') {
          location.href = `/products/${this._props.productData.id}/edit`;
        } else if (label == '삭제하기') {
          showAlert({
            message: '정말 삭제하나요??',
            okMessage: '삭제',
            onClickOk: () => {
              deleteApi(`/products/${this._props.productData.id}`, () => {
                showAlert({
                  message: '삭제되었습니다!',
                  onClickOk: () => {
                    location.href = '/';
                  },
                });
              });
            },
            onClickCancel: () => {},
          });
        }
      },
    });
    this.DropDown.$dom.classList.add(styles.dropdown);

    this.render();
    this.addEvent();
  }

  updateCount = () => {
    return getApi(`/products/${this.productData.id}/refresh`, (data) => {
      this.productData.count = data.count;
    });
  };

  toggleWatch = () => {
    if (this.productData.watch) {
      deleteApi(`/products/${this.productData.id}/watch`, () => {
        this.productData.watch = false;
        this.updateCount().then(() => this.render());
      });
    } else {
      postApi(`/products/${this.productData.id}/watch`, null, () => {
        this.productData.watch = true;
        this.updateCount().then(() => this.render());
      });
    }

    this.productData.watch = !this.productData.watch;
    if (this.productData.watch) {
      deleteApi(`/products/${this.productData.id}/watch`, () => {
        this.productData.watch = false;
        this.updateCount().then(() => this.render());
      });
    } else {
      postApi(`/products/${this.productData.id}/watch`, null, () => {
        this.productData.watch = true;
        this.updateCount().then(() => this.render());
      });
    }
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="ImgBox"></div>
      <div class="${styles['item-info-container']}">
        <div class="${styles['info-header']}">
          <div class="${styles['title']}">${this.productData.title}</div>
          ${this.buttonTemplate()}
        </div>
        <div class="${styles['info-main']}">
          <div class="${styles['info-detail']}">
            <span>${this.productData.location}</span> ·
            <span>${getTimeStamp(this.productData.createdDatetime)}</span>
          </div>
          <div class="${styles['price']}">${this.productData.price.toLocaleString()}</div>
        </div>
        <div class="${styles['info-stats']}">
          ${this.infoStatsTemplate()}
        </div>
      </div>
    `;

    const $dropdown = this.$dom.querySelector('.DropDown');
    if ($dropdown) {
      this.replaceElement($dropdown, this.DropDown.$dom);
    }

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
  };

  buttonTemplate = () => {
    if (this._props.sale) {
      return `
        <div class="${styles['option-button']}">
          <i class="wmi-more-vertical"></i>
          <div class="DropDown"></div>
        </div>
      `;
    } else {
      return `
        <div class="${styles['like-button']}">
          ${this.productData.watch ? `<img src="${likeActiveImg}">` : `<img src="${likeImg}">`}
        </div>
      `;
    }
  };

  infoStatsTemplate = () => {
    let template = '';
    if (this.productData.count.chat > 0) {
      template += `
        <div class="${styles['comment']}">
          <i class="wmi-message-square"></i>
          <span>${this.productData.count.chat}</span>
        </div>
      `;
    }

    if (this.productData.count.watch > 0) {
      template += `
        <div class="${styles['like']}">
          <i class="wmi-heart"></i>
          <span>${this.productData.count.watch}</span>
        </div>
      `;
    }

    return template;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      if (e.target.className === styles['like-button'] || e.target.parentElement.className === styles['like-button']) {
        this.toggleWatch();
      } else if (
        e.target.className === styles['option-button'] ||
        e.target.parentElement.className === styles['option-button']
      ) {
        this.DropDown.$dom.classList.toggle(styles.show);
      } else {
        location.href = '/products/' + this.productData.id;
      }
    });
  };
}
