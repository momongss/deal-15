import Component from '@/components/component';

import styles from '@/styles/components/img-box/img-box.module.scss';

// props : { type, imageURL, onClick }
export default class ImgBox extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['img-box'],
    });

    this.$dom.classList.add(styles[this._props.type]);

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <img src="${this._props.imageURL}">
    `;
  };

  addEvent = () => {
    if (this._props.onClick) {
      this.$dom.addEventListener('click', this._props.onClick);
    }
  };
}
