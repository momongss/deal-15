import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import CategoryListItem from '@/components/category-list-item/category-list-item';

import styles from '@/styles/pages/main-page/sub-page/category-page.module.scss';

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.categories = this.getCategories().map(({ id, name, image }) => {
      return new CategoryListItem({
        title: name,
        imageURL: image,
        onClick: () => {
          this._props.onClickCategoryItem(id);
        },
      });
    });

    this.HeaderMenu = new HeaderMenu({
      title: '카테고리',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: this.togglePage,
    });

    this.$dom = this.createDom('div', {
      className: `${styles['category-page-wrapper']}`,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <main class="${styles['app-main']}">
        <div class="${styles['category-list']}"></ul>
      </main>
    `;

    const $categoryList = this.$dom.querySelector(`.${styles['category-list']}`);
    for (const category of this.categories) {
      $categoryList.appendChild(category.$dom);
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

  getCategories = () => {
    return [
      {
        id: '0',
        name: '디지털기기',
        image: '',
      },
      {
        id: '0',
        name: '생활가전',
        image: '',
      },
      {
        id: '0',
        name: '가구/인테리어',
        image: '',
      },
      {
        id: '0',
        name: '게임/취미',
        image: '',
      },
      {
        id: '0',
        name: '생활/가공식품',
        image: '',
      },
      {
        id: '0',
        name: '스포츠/레저',
        image: '',
      },
      {
        id: '0',
        name: '여성패션/잡화',
        image: '',
      },
      {
        id: '0',
        name: '남성패션/잡화',
        image: '',
      },
      {
        id: '0',
        name: '유아동',
        image: '',
      },
      {
        id: '0',
        name: '뷰티/미용',
        image: '',
      },
      {
        id: '0',
        name: '반려동물',
        image: '',
      },
      {
        id: '0',
        name: '도서/티켓/음반',
        image: '',
      },
      {
        id: '0',
        name: '식물',
        image: '',
      },
      {
        id: '0',
        name: '기타 중고물품',
        image: '',
      },
    ];
  };

  addEvent = () => {};
}
