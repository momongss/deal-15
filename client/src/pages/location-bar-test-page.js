import Component from '@/components/component';

import LocationBar from '@/components/location-bar/location-bar';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.LocationBar = new LocationBar({
      place: '장곡동',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="LocationBar"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.LocationBar'), this.LocationBar.$dom);
  };

  addEvent = () => {
    //
  };
}
