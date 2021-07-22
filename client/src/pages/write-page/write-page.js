import Component from '@/components/component';

import styles from '@/styles/pages/write-page/write-page.module.scss';

import HeaderMenu from '@/components/header/header-menu';
import ImgButton from '@/components/img-button/img-button';
import ButtonCategory from '@/components/button/button-category';
import LocationBar from '@/components/location-bar/location-bar';

import { api } from '@/utils/api';

export default class WritePage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: styles['write-page-wrapper'] });

    props.$app.appendChild(this.$dom);

    this.data = {
      title: null,
      categoryId: null,
      price: null,
      description: null,
      images: [],
    };

    this._state = {
      isComplete: false,
    };

    this.Header = new HeaderMenu({
      title: '글쓰기',
      menuType: 'writing',
      menuColor: 'white',

      onClickBack: () => {
        console.log('back');
      },
      onClickSubmit: () => {
        if (this._state.isComplete) {
          console.log(this.data);
        }
      },
    });

    this.ImgAddButton = new ImgButton({
      buttonType: 'add',
      imageCount: this.data.images.length,

      onClickAdd: () => {
        const $fileInput = this.$dom.querySelector(`.${styles['file-input']}`);
        $fileInput.click();
      },
    });

    this.CategoryButtonList = [];
    this.ImgButtonList = [];

    this.render();

    api.getLocation().then((location) => {
      this.LocationBar = new LocationBar({
        place: location,
      });

      this.replaceElement(this.$dom.querySelector('.LocationBar'), this.LocationBar.$dom);
    });

    api.getCategories().then((categoryList) => {
      const $categoryList = this.$dom.querySelector(`.${styles['category-list']}`);
      for (const category of categoryList) {
        const CategoryButton = new ButtonCategory({
          categoryId: category.id,
          buttonState: 'disable',
          buttonText: category.name,
          onClick: this.onClickCategory,
        });
        this.CategoryButtonList.push(CategoryButton);
        $categoryList.appendChild(CategoryButton.$dom);
      }
    });
  }

  onClickCategory = (categoryId) => {
    for (const categoryButton of this.CategoryButtonList) {
      if (categoryButton._props.categoryId === categoryId) {
        categoryButton.setState({ buttonState: '' });
        const $categoryInput = this.$dom.querySelector(`.${styles['category-input']}`);
        $categoryInput.innerHTML = categoryButton._props.buttonText;
        $categoryInput.classList.add(`${styles['set']}`);
      } else {
        categoryButton.setState({ buttonState: 'disable' });
      }
    }

    this.setData({ categoryId });
  };

  checkComplete = () => {
    return this.data.title && this.data.categoryId && this.data.description;
  };

  setComplete = () => {
    this._state.isComplete = true;
    this.Header.setState({ menuState: 'checked' });
  };

  setInComplete = () => {
    this._state.isComplete = false;
    this.Header.setState({ menuState: '' });
  };

  setData = (nextState) => {
    if (nextState.title != null) this.data.title = nextState.title;
    if (nextState.categoryId != null) this.data.categoryId = nextState.categoryId;
    if (nextState.price != null) this.data.price = nextState.price;
    if (nextState.description != null) this.data.description = nextState.description;

    if (this.checkComplete()) {
      this.setComplete();
    } else {
      this.setInComplete();
    }
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <main class="${styles['write-main']}">
        <div class="${styles['img-area']}">
          <div class="ImgAddButton"></div>
          <input class="${styles['file-input']}" type="file" accept="image/*" />
        </div>
        <div class="${styles['input-area-1']}">
          <input type="text" class="${styles['title-input']}" placeholder="글 제목">
          <div class="${styles['category-area']}">
            <div class="${styles['category-input']}">
              (필수)카테고리를 선택해주세요.
            </div>
            <div class="${styles['category-list']}"></div>
          </div>
        </div>
        <div class="${styles['input-area-2']}">
          <input type="text" class="${styles['price-input']}" placeholder="₩ 가격(선택사항)">
        </div>
        <div class="${styles['input-area-3']}">
          <textarea rows="8" class="${styles['description']}" placeholder="게시글 내용을 작성해주세요."></textarea>
        </div>
      </main>
      <div class="LocationBar"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.Header.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgAddButton'), this.ImgAddButton.$dom);

    this.ImgAddButton.setState({ imageCount: this.data.images.length });

    const $imgArea = this.$dom.querySelector(`.${styles['img-area']}`);

    for (const imgButton of this.ImgButtonList) {
      $imgArea.appendChild(imgButton.$dom);
    }

    const $categoryList = this.$dom.querySelector(`.${styles['category-list']}`);

    for (const CategoryButton of this.CategoryButtonList) {
      $categoryList.appendChild(CategoryButton.$dom);
    }

    this.addEvent();
  };

  setImageData = () => {
    this.data.images = this.ImgButtonList.filter((ImgButton) => {
      if (ImgButton._props.imageURL == null || ImgButton._props.imageURL === '') return false;
      else return true;
    }).map((ImgButton) => {
      return ImgButton._props.imageURL;
    });
  };

  addEvent = () => {
    const $titleInput = this.$dom.querySelector(`.${styles['title-input']}`);
    const $categoryArea = this.$dom.querySelector(`.${styles['category-area']}`);
    const $priceInput = this.$dom.querySelector(`.${styles['price-input']}`);
    const $description = this.$dom.querySelector(`.${styles['description']}`);

    const $fileInput = this.$dom.querySelector(`.${styles['file-input']}`);

    $titleInput.addEventListener('input', () => {
      if ($titleInput.value.length > 0) {
        $categoryArea.classList.add(styles.show);
      } else {
        $categoryArea.classList.remove(styles.show);
      }

      this.setData({ title: $titleInput.value });
    });

    $priceInput.addEventListener('input', () => {
      this.setData({ price: $priceInput.value });
    });

    $description.addEventListener('input', () => {
      this.setData({ description: $description.value });
    });

    $fileInput.addEventListener('change', (e) => {
      const src = URL.createObjectURL(e.target.files[0]);
      const imgButton = new ImgButton({
        buttonType: 'image',
        imageURL: src,
        onClickAdd: () => {
          console.log('image');
        },
        onClickRemove: (e) => {
          const index = this.ImgButtonList.indexOf(imgButton);
          if (index > -1) this.ImgButtonList.splice(index, 1);

          this.setImageData();
          this.render();
        },
      });

      this.ImgButtonList.push(imgButton);
      this.setImageData();
      this.render();
    });
  };
}
