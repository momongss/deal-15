import Component from '@/components/component';

import styles from '@/styles/components/img-box/img-box.module.scss';

// props : { type, imageURL, onClick }
export default class ImgBox extends Component {
  constructor(props) {
    super(props);

    this._state = {
      ...props,
    };

    this.$dom = this.createDom('div', {
      className: styles['img-box'],
    });

    this.$dom.classList.add(styles[this._props.type]);

    this.render();
  }

  setState = (nextState) => {
    if (nextState.imageURL) this._state.imageURL = nextState.imageURL;

    this.render();
  };

  render = () => {
    if (this._props.imageURL == null || this._state.imageURL === '') {
      this.$dom.innerHTML = ``;
    } else {
      this.$dom.innerHTML = `
        <img src="${this._state.imageURL}">
      `;
    }
  };

  addEvent = () => {
    if (this._props.onClick) {
      this.$dom.addEventListener('click', this._props.onClick);
    }
  };
}
