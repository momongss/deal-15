import Component from '@/components/Component';
import ImgBox from '@/components/img-box/img-box';

import styles from '@/styles/components/category-list-item/category-list-item.module.scss';

// props : { title, imageURL, onClick }
export default class CategoryListItem extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['category-list-item'],
    });

    this.ImgBox = new ImgBox({
      type: 'small',
      imageURL: this._props.imageURL,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['ImgBox']}"></div>
      <div class="${styles['title']}">${this._props.title}</div>
    `;

    this.replaceElement(this.$dom.querySelector(`.${styles['ImgBox']}`), this.ImgBox.$dom);
  };

  addEvent = () => {
    this.$dom.addEventListener('click', this._props.onClick);
  };
}
