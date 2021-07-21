import Component from '@/components/component';

import styles from '@/styles/components/header/header-main.module.scss';

// props : { location, onClickCategory, onClickPlace, onClickAccount, onClickMenu }
export default class HeaderMain extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('header', {
      className: styles['header'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['left-area']}">
        <button class="${styles['category-button']}">
          <i class="wmi-category"></i>
        </button>
      </div>
      <div class="${styles['middle-area']}">
        <button class="${styles['place-button']}">
          <i class="wmi-map-pin"></i>
          <div class="${styles['place-name']}">${this._props.location}</div>
        </button>
      </div>
      <div class="${styles['right-area']}">
        <button class="${styles['account-button']}">
          <i class="wmi-user"></i>
        </button>
        <button class="${styles['menu-button']}">
          <i class="wmi-menu"></i>
        </button>
      </div>
    `;
  };

  addEvent = () => {
    const $categoryButton = this.$dom.querySelector(`.${styles['category-button']}`);
    $categoryButton.addEventListener('click', this._props.onClickCategory);

    const $placeButton = this.$dom.querySelector(`.${styles['place-button']}`);
    $placeButton.addEventListener('click', this._props.onClickPlace);

    const $accountButton = this.$dom.querySelector(`.${styles['account-button']}`);
    $accountButton.addEventListener('click', this._props.onClickAccount);

    const $menuButton = this.$dom.querySelector(`.${styles['menu-button']}`);
    $menuButton.addEventListener('click', this._props.onClickMenu);
  };
}
