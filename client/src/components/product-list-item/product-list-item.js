import Component from '@/components/component';

import ImgBox from '@/components/img-box/img-box';

import likeImg from '@/assets/images/like.svg';
import likeActiveImg from '@/assets/images/like_active.svg';

import styles from '@/styles/components/product-list-item/product-list-item.module.scss';

function getTimeStamp(createdDatetime) {
  const today = new Date();
  const timeValue = new Date(createdDatetime);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

// proprs { title, location, timeStamp, price, commentCount, likeCount }
export default class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.productData = this._props.productData;

    this.ImgBox = new ImgBox({
      type: 'large',
      imageURL: this.productData.image,
    });

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
          <div class="${styles['like-button']}">
            ${this.productData.watch ? `<img src="${likeActiveImg}">` : `<img src="${likeImg}">`}
          </div>
        </div>
        <div class="${styles['info-main']}">
          <div class="${styles['info-detail']}">
            <span>${this.productData.location}</span> ·
            <span>${getTimeStamp(this.productData.createdDatetime)}</span>
          </div>
          <div class="${styles['price']}">${this.productData.price.toLocaleString()}</div>
        </div>
        <div class="${styles['info-stats']}">
          <div class="${styles['comment']}">
            <i class="wmi-message-square"></i>
            <span>${this.productData.count.chat}</span>
          </div>
          <div class="${styles['like']}">
            <i class="wmi-heart"></i>
            <span>${this.productData.count.watch}</span>
          </div>
        </div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
  };

  addEvent = () => {
    this.$dom.addEventListener('click', (e) => {
      console.log(e.target.className, e.target.parentElement.className);
      if (
        e.target.className === styles['like-button'] ||
        e.target.parentElement.className === styles['like-button']
      ) {
        this.toggleWatch();
      }
      this._props.onClick(this._props.id);
    });
  };
}
