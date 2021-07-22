import Component from '@/components/component';

import AccountPage from '@/pages/main-page/sub-page/account-page';

import styles from '@/styles/pages/login-page.module.scss';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.AccountPage = new AccountPage({
      type: 'login',
      single: true,
    });
    this.AccountPage.$dom.classList.add(styles['account-page']);

    props.$app.appendChild(this.AccountPage.$dom);

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    this.render();
  };

  render = () => {};

  addEvent = () => {};
}
