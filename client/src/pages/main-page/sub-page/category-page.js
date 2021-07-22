import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import CategoryListItem from '@/components/category-list-item/category-list-item';

import classNames from 'classnames';
import styles from '@/styles/pages/main-page/sub-page/category-page.module.scss';
import common from '@/styles/common.module.scss';

import { getApi } from '@/utils/api';

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this._state = {
      categoryListItems: [],
    };

    getApi('/categories', (categories) => {
      const categoryListItems = categories.map(({ id, title, imageUri }) => {
        return new CategoryListItem({
          title: title,
          imageURL: imageUri,
          onClick: () => {
            this._props.onClickCategoryItem(title);
          },
        });
      });
      this.setState({ categoryListItems });
    });

    this.HeaderMenu = new HeaderMenu({
      title: '카테고리',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: this.togglePage,
    });
    this.HeaderMenu.$dom.classList.add(styles.header);

    this.$dom = this.createDom('div', {
      className: classNames(styles['category-page-wrapper'], common['sub-page']),
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    this._state.categoryListItems = nextState.categoryListItems;
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <main class="${styles['app-main']}">
        <div class="${styles['category-list']}"></ul>
      </main>
    `;

    const $categoryList = this.$dom.querySelector(`.${styles['category-list']}`);
    for (const categoryListItem of this._state.categoryListItems) {
      $categoryList.appendChild(categoryListItem.$dom);
    }

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
  };

  togglePage = () => {
    this.$dom.classList.toggle(styles['show']);
  };

  hidePage = () => {
    this.$dom.classList.remove(styles['show']);
  };

  showPage = () => {
    this.$dom.classList.add(styles['show']);
  };

  addEvent = () => {};
}
