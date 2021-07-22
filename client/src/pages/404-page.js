import Component from '@/components/component';

import classNames from 'classnames';
import styles from '@/styles/pages/404-page.module.scss';
import common from '@/styles/common.module.scss';

import notFoundImage from '@/assets/images/not-found.png';

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['not-found-page'], common['sub-page']),
    });

    props.$app.appendChild(this.$dom);

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <img class="${styles.image}" src="${notFoundImage}" alt="헐~" />
      <p class="${styles.message}">페이지를 찾을 수 없어요</p>
    `;
  };

  addEvent = () => {};
}
