import Component from '@/components/component';
import ButtonTab from '@/components/button/button-tab';

import styles from '@/styles/components/tab-bar/tab-bar.module.scss';

export default class TabBar extends Component {
  constructor(props) {
    super(props);

    this.tabList = this._props.tabList.map(({ title, initState }, index) => {
      return new ButtonTab({
        buttonState: initState,
        buttonText: title,
        index: index,
        onClick: this.onClickTab,
      });
    });

    this.$dom = this.createDom('div', {
      className: styles['tab-bar'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="buttonTab0"></div>
      <div class="buttonTab1"></div>
      <div class="buttonTab2"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.buttonTab0'), this.tabList[0].$dom);
    this.replaceElement(this.$dom.querySelector('.buttonTab1'), this.tabList[1].$dom);
    this.replaceElement(this.$dom.querySelector('.buttonTab2'), this.tabList[2].$dom);
  };

  onClickTab = (index) => {
    for (const tab of this.tabList) {
      tab.setState({ buttonState: '' });
    }

    this.tabList[index].setState({ buttonState: 'selected' });

    this._props.onClick(index);
  };

  addEvent = () => {};
}
