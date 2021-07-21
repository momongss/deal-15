import Component from '@/components/component';

import styles from '@/styles/components/location-bar/location-bar.module.scss';

export default class LocationBar extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['location-bar'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <i class="wmi-map-pin"></i>
      <div class="${styles['place-name']}">${this._props.place}</div>
    `;
  };

  addEvent = () => {};
}
