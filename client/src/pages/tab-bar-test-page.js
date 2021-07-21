import Component from '@/components/component';

import TabBar from '@/components/tab-bar/tab-bar.js';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    const tabList = [
      { id: 0, title: '판매목록', initState: 'selected' },
      { id: 1, title: '채팅', initState: '' },
      { id: 2, title: '관심목록', initState: '' },
    ];
    this.TabBar1 = new TabBar({
      tabList: tabList,
      onClick: (index) => {
        console.log(tabList[index]);
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="TabBar1"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.TabBar1'), this.TabBar1.$dom);
  };

  addEvent = () => {
    //
  };
}
