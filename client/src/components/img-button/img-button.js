import Component from '@/components/Component';

import ImgBox from '@/components/img-box/img-box';
import DefaultImg from '@/assets/images/button-default.svg';

import styles from '@/styles/components/img-button/img-button.module.scss';

const MAX_IMAGE_UPLOAD = 10;

export default class ImgButton extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['img-button'],
    });

    this.ImgBox = new ImgBox({
      type: 'medium',
      imageURL: '',
      onClick: () => {},
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    if (this._props.buttonType === 'add') {
      this.$dom.innerHTML = `
        <div class="${styles['ImgBox']}"></div>
        <div class="${styles['content-wrapper']}">
          <img src="${DefaultImg}">
          <div class="${styles['image-count']}">${this._props.imageCount}/${MAX_IMAGE_UPLOAD}</div>
        </div>
      `;
    } else {
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
    this.$dom.addEventListener('click', (e) => {
      this._props.onClick();
    });

    if (this._props.buttonType === 'add') return;

    const $removeButton = this.$dom.querySelector(`.${styles['remove-button']}`);
    $removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this._props.onRemove();
    });
  };
}
