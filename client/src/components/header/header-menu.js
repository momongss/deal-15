import Component from '@/components/component';

import styles from '@/styles/components/header/header-menu.module.scss';

// props : { title, noneLeft, menuType, menuColor, menuState, onClickBack, onClickExit, onClickSubmit, onClickOption }
export default class HeaderMenu extends Component {
  constructor(props) {
    super(props);

    this._state = {
      menuState: this._props.menuState,
    };

    this.$dom = this.createDom('header', {
      className: styles['header'],
    });

    if (this._props.menuColor != null) {
      this.$dom.classList.add(styles[this._props.menuColor]);
    }

    this.render();
  }

  setState = (nextState) => {
    if (nextState != null) this._state.menuState = nextState.menuState;
    this.render();
  };

  render = () => {
    if (this._props.noneLeft) {
      this.$dom.innerHTML = `
      <div class="${styles['left-area']}">
      </div>
      <div class="${styles['middle-area']}">
        <div class="${styles['title']}">${this._props.title}</div>
      </div>
      <div class="${styles['right-area']}">
        ${this.rightAreaTemplate()}
      </div>
    `;
    } else {
      this.$dom.innerHTML = `
      <div class="${styles['left-area']}">
        <button class="${styles['back-button']}">
          <i class="wmi-chevron-left"></i>
        </button>
      </div>
      <div class="${styles['middle-area']}">
        <div class="${styles['title']}">${this._props.title}</div>
      </div>
      <div class="${styles['right-area']}">
        ${this.rightAreaTemplate()}
      </div>
    `;

      this.addEvent();
    }
  };

  addEvent = () => {
    const $backButton = this.$dom.querySelector(`.${styles['back-button']}`);
    if ($backButton) {
      $backButton.addEventListener('click', this._props.onClickBack);
    }

    const $exitButton = this.$dom.querySelector(`.${styles['exit-button']}`);
    if ($exitButton != null) {
      $exitButton.addEventListener('click', this._props.onClickExit);
    }

    const $submitButton = this.$dom.querySelector(`.${styles['write-submit-button']}`);
    if ($submitButton != null) {
      $submitButton.addEventListener('click', () => {
        if (this._state.menuState === 'checked') {
          this._props.onClickSubmit();
        }
      });
    }

    const $optionButton = this.$dom.querySelector(`.${styles['option-button']}`);
    if ($optionButton != null) {
      $optionButton.addEventListener('click', this._props.onClickOption);
    }
  };

  rightAreaTemplate = () => {
    let template = '';

    if (this._props.menuType === 'writing') {
      template = `
        <button class="${styles['write-submit-button']} ${styles[this._state.menuState]}">
          <i class="wmi-check"></i>
        </button>
      `;
    } else if (this._props.menuType === 'chat-detail') {
      template = `
        <button class="${styles['exit-button']}">
          <i class="wmi-log-out"></i>
        </button>
      `;
    } else if (this._props.menuType === 'product-detail') {
      if (this._props.menuState === 'sell') {
        template = `
        <button class="${styles['option-button']}">
          <i class="wmi-more-vertical"></i>
        </button>
      `;
      }
    }

    return template;
  };
}
