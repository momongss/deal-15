import Component from '@/components/component';

import ImgBox from '@/components/img-box/img-box';
import DefaultImg from '@/assets/images/button-default.svg';

import styles from '@/styles/components/img-button/img-button.module.scss';

const MAX_IMAGE_UPLOAD = 10;

// props : { buttonType, imageURL, onClickAdd, onClickRemove }
export default class ImgButton extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['img-button'],
    });

    if (props.buttonType === 'add') {
      this.$dom.classList.add(styles.add);
    }

    this.ImgBox = new ImgBox({
      type: 'medium',
      imageURL: this._props.imageURL || '',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    if (this._props.buttonType === 'add') {
      this.$dom.innerHTML = `
        <div class="${styles['ImgBox']} ${styles['add']}"></div>
        <div class="${styles['content-wrapper']}">
          <img src="${DefaultImg}">
          <div class="${styles['image-count']}">${this._props.imageCount}/${MAX_IMAGE_UPLOAD}</div>
        </div>
      `;
    } else if (this._props.buttonType === 'image') {
      this.$dom.innerHTML = `
        <div class="${styles['ImgBox']}"></div>
        <button class="${styles['remove-button']}">
          <i class="wmi-close"></i>
        </button>
      `;
    }

    this.replaceElement(this.$dom.querySelector(`.${styles['ImgBox']}`), this.ImgBox.$dom);
  };

  addEvent = () => {
    if (this._props.buttonType === 'add') {
      this.$dom.addEventListener('click', (e) => {
        this._props.onClickAdd();
      });
    } else if (this._props.buttonType === 'image') {
      const $removeButton = this.$dom.querySelector(`.${styles['remove-button']}`);
      $removeButton.addEventListener('click', (e) => {
        this._props.onClickRemove();
      });
    }
  };
}
