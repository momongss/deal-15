import Component from '@/components/component';

import classNames from 'classnames';
import styles from '@/styles/pages/main-page/main-page.module.scss';
import common from '@/styles/common.module.scss';

import HeaderMain from '@/components/header/header-main.js';
import ProductListItem from '@/components/product-list-item/product-list-item';

import CategoryPage from './sub-page/category-page';
import AccountPage from './sub-page/account-page';
import MenuPage from './sub-page/menu-page';

import DropDown from '@/components/drop-down/drop-down';

import { getApi, putApi } from '@/utils/api';
import store from '@/utils/store';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['main-page-wrapper'], common['sub-page']),
    });
    this.CategoryPage = new CategoryPage({
      onClickCategoryItem: this.filterCategory,
    });
    this.AccountPage = new AccountPage({
      type: 'logined',
    });
    this.MenuPage = new MenuPage({});

    props.$app.appendChild(this.$dom);
    props.$app.appendChild(this.CategoryPage.$dom);
    props.$app.appendChild(this.AccountPage.$dom);
    props.$app.appendChild(this.MenuPage.$dom);

    this._state = {
      location: store.state.selection.location,
      category: null,
    };

    this.HeaderMain = new HeaderMain({
      location: '장소',
      onClickCategory: () => {
        this.CategoryPage.togglePage();

        this.AccountPage.hidePage();
        this.MenuPage.hidePage();
      },
      onClickPlace: this.toggleDropDown,
      onClickAccount: () => {
        this.AccountPage.togglePage();

        this.CategoryPage.hidePage();
        this.MenuPage.hidePage();
      },
      onClickMenu: () => {
        this.MenuPage.togglePage();

        this.AccountPage.hidePage();
        this.CategoryPage.hidePage();
      },
    });

    this.DropDown = new DropDown({
      itemList: [
        ...store.state.locations.map((l) => ({
          label: l.location,
          state: store.state.selection.position === l.position ? 'highlighted' : 'normal',
        })),
        {
          label: '내 동네 설정하기',
          state: 'normal',
        },
      ],

      onClick: (e, label) => {
        if (label === '내 동네 설정하기') {
          location.href = '/location';
          return;
        } else if (location == null) {
          return;
        }

        const selection = store.state.locations.find((l) => l.location === label);
        putApi(
          `/users/me/locations/selection`,
          {
            position: selection.position,
          },
          () => {
            store.setState('selection', selection);
            e._clickecByDropBox = true;
            this.setState({ location: selection.location });
          },
        );
      },
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.location != null) this._state.location = nextState.location;
    if (nextState.category != null) this._state.category = nextState.category;

    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['header-wrapper']}">
        <div class="Header"></div>
        <div class="${styles['drop-down-wrapper']}">
          <div class="DropDown"></div>
        </div>
      </div>
      <main class="${styles['app-main']}">
        <ul class="${styles['product-list']}"></ul>
      </main>
    `;

    this.DropDown.setState({
      itemList: [
        ...store.state.locations.map((l) => ({
          label: l.location,
          state: store.state.selection.position === l.position ? 'highlighted' : 'normal',
        })),
        {
          label: '내 동네 설정하기',
          state: 'normal',
        },
      ],
    });

    const $productList = this.$dom.querySelector(`.${styles['product-list']}`);

    let target = '/products?location=' + this._state.location;
    if (this._state.category) {
      target += '&category=' + this._state.category;
    }

    getApi(target, (products) => {
      const productList = products.map((product) => {
        return new ProductListItem({
          productData: product,
          onClick: (id) => {
            location.href = '/products/' + id;
          },
        });
      });

      for (const product of productList) {
        $productList.appendChild(product.$dom);
      }
    });

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMain.$dom);
    this.replaceElement(this.$dom.querySelector('.DropDown'), this.DropDown.$dom);
  };

  filterCategory = (category) => {
    console.log(category, '카테고리 필터');
    this.CategoryPage.togglePage();

    this.setState({ category });
  };

  toggleDropDown = (e) => {
    e._clickecByDropBox = true;
    const $dropDown = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
    $dropDown.classList.toggle(styles.show);
  };

  addEvent = () => {
    window.addEventListener('click', (e) => {
      if (!('_clickecByDropBox' in e)) {
        const $dropDown = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
        $dropDown.classList.remove(styles.show);
      }
    });
  };
}
