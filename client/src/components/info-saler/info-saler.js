import Component from '@/components/component';

import styles from '@/styles/components/info-saler/info-saler.module.scss';

// props : { name, place }
export default class InfoSaler extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['info-saler'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['info-header']}">판매자 정보</div>
      <div class="${styles['info-main']}">
        <div class="${styles['name']}">${this._props.name}</div>
        <div class="${styles['place']}">${this._props.place}</div>
      </div>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('input', this._props.onInput);
  };
}
