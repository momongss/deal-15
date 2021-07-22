import Component from '@/components/component';

import styles from '@/styles/components/img-nav/img-nav.module.scss';

// props : { nav-count }
export default class ImgNav extends Component {
  constructor(props) {
    super(props);

    this._state = {
      navCount: props.navCount,
      navPosition: 0,
    };

    this.$dom = this.createDom('div', {
      className: styles['img-nav'],
    });

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    if (
      nextState.navPosition == null ||
      nextState.navPosition < 0 ||
      nextState.navPosition >= this._state.navCount
    ) {
      return;
    }

    this._state.navPosition = parseInt(nextState.navPosition);
    this.render();
  };

  render = () => {
    let HTML = '';
    for (let i = 0; i < this._state.navCount; i++) {
      if (i === this._state.navPosition) {
        HTML += `
          <div class="${styles['nav-button-wrapper']}" data-pos=${i}>
            <div class="${styles['nav-button']} ${styles['selected']}" data-pos=${i}></div>
          </div>  
          `;
      } else {
        HTML += `
          <div class="${styles['nav-button-wrapper']}" data-pos=${i}>
            <div class="${styles['nav-button']}" data-pos=${i}></div>
          </div>
          `;
      }
    }

    this.$dom.innerHTML = HTML;
  };

  addEvent = () => {
    if (this._props.onClick) {
      this.$dom.addEventListener('click', (e) => {
        if (
          e.target.className === styles['nav-button-wrapper'] ||
          e.target.parentElement.className === styles['nav-button-wrapper']
        ) {
          this._props.onClick(e.target.dataset.pos);
        }
      });
    }
  };
}
