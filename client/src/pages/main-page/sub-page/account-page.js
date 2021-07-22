import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import TextInput from '@/components/text-input/text-input';
import ButtonNormal from '@/components/button/button-normal';

import classNames from 'classnames';
import styles from '@/styles/pages/main-page/sub-page/account-page.module.scss';
import common from '@/styles/common.module.scss';

import { showAlert } from '@/screens/alert-screen';
import { postApi, getApi } from '@/utils/api';
import jwtDecode from 'jwt-decode';
import store from '@/utils/store';

export default class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['account-page-wrapper'], common['sub-page']),
    });

    if (props.type === 'login') this.initLoginPage();
    else if (props.type === 'signup') this.initSignupPage();
    else if (props.type === 'logined') this.initMyPage();
  }

  getAndSetLocation = () => {
    return getApi('/users/me/locations', (locations) => {
      store.setState('locations', locations);
    }).then(() => {
      return getApi('/users/me/locations/selection', (selection) => {
        store.setState('selection', selection);
      });
    });
  };

  processLogin = () => {
    const username = this.LoginInput.$dom.value.trim();
    if (!username) {
      showAlert({
        message: '아이디 값이 없습니다.',
      });
      return;
    }

    postApi(
      '/auth/token',
      { username },
      (data) => {
        const payload = jwtDecode(data.access);
        const login = {
          access: data.access,
          refresh: data.refresh,
          userId: payload.userId,
          username: payload.username,
        };
        store.setState('login', login);
        this.getAndSetLocation().then(() => {
          location.href = '/';
        });
      },
      {
        404: () => showAlert({ message: '존재하지 않는 아이디입니다.' }),
      },
    );
  };

  processSignup = () => {
    const username = this.IdInput.$dom.value.trim();
    const location = this.LocationInput.$dom.value.trim();
    postApi(
      '/users',
      {
        username,
        location,
      },
      () => {
        showAlert({
          message: '회원가입 성공!',
          onClickOk: () => this.initLoginPage(),
        });
      },
      {
        409: () => {
          showAlert({
            message: '이미 사용중인 아이디 입니다.',
          });
        },
      },
    );
  };

  processLogout = () => {
    showAlert({
      message: '진짜 로그아웃 하나요?',
      okMessage: '네!',
      onClickOk: () => {
        store.reset();
      },
      onClickCancel: () => {},
    });
  };

  initMyPage = () => {
    this.HeaderMenu = new HeaderMenu({
      title: '내 계정',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: this.togglePage,
    });

    this.LogoutButton = new ButtonNormal({
      buttonType: 'large',
      buttonState: '',
      buttonText: '로그아웃',
      onClick: this.processLogout,
    });

    this.renderMyPage();
  };

  renderMyPage = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <div class="${styles['page-main']} ${styles['logined']}">
        <div class="${styles['user-name']}">
          <span>${store.state.login.username}</span>
        </div>
        <div class="LogoutButton"></div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
    this.replaceElement(this.$dom.querySelector('.LogoutButton'), this.LogoutButton.$dom);
  };

  initSignupPage = () => {
    this.HeaderMenu = new HeaderMenu({
      title: '회원가입',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: this.initLoginPage,
    });

    this.IdInput = new TextInput({
      type: 'large',
      text: '아이디를 입력하세요.',
      onInput: this.validateSignupInput,
    });

    this.LocationInput = new TextInput({
      type: 'large',
      text: '시·구 제외, 동만 입력',
      onInput: this.validateSignupInput,
    });

    this.SignupButton = new ButtonNormal({
      buttonType: 'large',
      buttonState: 'disable',
      buttonText: '회원가입',
      onClick: this.processSignup,
    });

    this.renderSignupPage();
  };

  validateSignupInput = () => {
    if (this.IdInput.$dom.value.length > 0 && this.LocationInput.$dom.value.length > 0) {
      this.SignupButton.setState({ buttonState: '' });
    } else {
      this.SignupButton.setState({ buttonState: 'disable' });
    }
  };

  renderSignupPage = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <div class="${styles['page-main']} ${styles['signup']}">
        <div class="${styles.label}">
          <span>아이디</span>
        </div>
        <div class="IdInput"></div>
        <div class="${styles.label}">
          <span>우리 동네</span>
        </div>
        <div class="LocationInput"></div>
        <div class="SignupButton"></div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
    this.replaceElement(this.$dom.querySelector('.IdInput'), this.IdInput.$dom);
    this.replaceElement(this.$dom.querySelector('.LocationInput'), this.LocationInput.$dom);
    this.replaceElement(this.$dom.querySelector('.SignupButton'), this.SignupButton.$dom);
  };

  initLoginPage = () => {
    this.HeaderMenu = new HeaderMenu({
      title: '로그인',
      menuType: 'default',
      menuColor: 'grey',
      noneLeft: this._props.single,
      onClickBack: this.togglePage,
    });

    this.LoginInput = new TextInput({
      type: 'large',
      text: '아이디를 입력하세요.',
    });

    this.LoginButton = new ButtonNormal({
      buttonType: 'large',
      buttonState: '',
      buttonText: '로그인',
    });

    this.renderLoginPage();
  };

  renderLoginPage = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <div class="${styles['page-main']} ${styles['login']}">
        <div class="LoginInput"></div>
        <div class="LoginButton"></div>
        <div class="${styles['signup-move-button']}">
          <span>회원가입</span>
        </div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
    this.replaceElement(this.$dom.querySelector('.LoginInput'), this.LoginInput.$dom);
    this.replaceElement(this.$dom.querySelector('.LoginButton'), this.LoginButton.$dom);

    this.LoginButton.$dom.addEventListener('click', this.processLogin);

    const $signupMoveButton = this.$dom.querySelector(`.${styles['signup-move-button']}`);
    $signupMoveButton.addEventListener('click', this.initSignupPage);
  };

  togglePage = () => {
    this.$dom.classList.toggle(styles['show']);
  };

  hidePage = () => {
    this.$dom.classList.remove(styles['show']);
  };

  showPage = () => {
    this.$dom.classList.add(styles['show']);
  };

  addEvent = () => {};
}
