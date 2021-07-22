import Component from '@/components/component';

import classNames from 'classnames';
import styles from '@/styles/screens/loading-screen.module.scss';
import common from '@/styles/common.module.scss';

import loadingImage from '@/assets/images/loading.gif';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['loading-screen'], common['sub-page']),
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
      <img src="${loadingImage}" alt="로딩중" />
      <p>로딩중...</p>
    `;
  };
}

const loadingScreen = new LoadingScreen();
document.querySelector('#app').appendChild(loadingScreen.$dom);

export const loadingOn = () => {
  loadingScreen.$dom.classList.add(styles.show);
};

export const loadingOff = () => {
  loadingScreen.$dom.classList.remove(styles.show);
};
