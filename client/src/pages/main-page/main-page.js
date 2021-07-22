import Component from '@/components/component';

import styles from '@/styles/pages/main-page/main-page.module.scss';

import HeaderMain from '@/components/header/header-main.js';
import ProductListItem from '@/components/product-list-item/product-list-item';

import CategoryPage from './sub-page/category-page';
import AccountPage from './sub-page/account-page';
import MenuPage from './sub-page/menu-page';

import DropDown from '@/components/drop-down/drop-down';

import { getLocationList, getLocation, getProducDatatList } from '@/utils/api';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: styles['main-page-wrapper'] });
    this.CategoryPage = new CategoryPage({
      onClickCategoryItem: this.filterCategory,
    });
    this.AccountPage = new AccountPage({
      type: 'login',
    });
    this.MenuPage = new MenuPage({});

    props.$app.appendChild(this.$dom);
    props.$app.appendChild(this.CategoryPage.$dom);
    props.$app.appendChild(this.AccountPage.$dom);
    props.$app.appendChild(this.MenuPage.$dom);

    this._state = {
      location: getLocation(),
      categoryId: null,
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
        ...getLocationList(),
        {
          label: '내 동네 설정하기',
          state: 'normal',
        },
      ],

      onClick: (location) => {
        if (location === '내 동네 설정하기') {
          // 동네 설정 페이지로 이동
          return;
        } else if (location == null) {
          return;
        }

        this.setState({ location });
      },
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (nextState.location != null) this._state.location = nextState.location;
    if (nextState.categoryId != null) this._state.categoryId = nextState.categoryId;

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

    const $productList = this.$dom.querySelector(`.${styles['product-list']}`);

    const productList = getProducDatatList(this._state.location, this._state.categoryId).map(
      (productData) => {
        return new ProductListItem({
          productData,
          onClick: (id) => {
            console.log(id);
          },
        });
      },
    );

    for (const product of productList) {
      $productList.appendChild(product.$dom);
    }

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMain.$dom);
    this.replaceElement(this.$dom.querySelector('.DropDown'), this.DropDown.$dom);
  };

  filterCategory = (categoryId) => {
    console.log(categoryId, '카테고리 필터');
    this.CategoryPage.togglePage();

    this.setState({ categoryId });
  };

  getLoginInfo = () => {
    // 로그인 여부 확인.
    return true;
  };

  toggleDropDown = () => {
    const $dropDown = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
    $dropDown.classList.toggle(styles.show);
  };

  addEvent = () => {};
}
