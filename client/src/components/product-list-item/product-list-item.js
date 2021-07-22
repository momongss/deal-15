import Component from '@/components/component';

import ImgBox from '@/components/img-box/img-box';

import likeImg from '@/assets/images/like.svg';
import likeActiveImg from '@/assets/images/like_active.svg';

import styles from '@/styles/components/product-list-item/product-list-item.module.scss';

import { getTimeStamp } from '@/utils/getTimeStamp';

// proprs { title, location, timeStamp, price, commentCount, likeCount }
export default class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.productData = this._props.productData;

    this.ImgBox = new ImgBox({
      type: 'large',
      imageURL: this.productData.image,
    });
    this.ImgBox.$dom.classList.add(styles['img-box']);

    this.$dom = this.createDom('div', {
      className: styles['product-list-item'],
    });

    this.render();
    this.addEvent();
  }

  toggleWatch = () => {
    this.productData.watch = !this.productData.watch;
    if (this.productData.watch) {
      this.productData.count.watch++;
    } else {
      this.productData.count.watch--;
    }
    this.render();

    // api post 처리 코드
    // /products/{this.productData.id}
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

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
  };

  buttonTemplate = () => {
    if (this._props.sale) {
      return `
        <div class="${styles['option-button']}">
          <i class="wmi-more-vertical"></i>
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
        console.log('option');
      } else {
        this._props.onClick(this.productData.id);
      }
    });
  };
}
