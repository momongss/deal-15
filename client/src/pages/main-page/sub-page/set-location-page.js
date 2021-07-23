import Component from '@/components/component';
import HeaderMenu from '@/components/header/header-menu';
import ButtonLocation from '@/components/button/button-location';
import InputPopup from '@/components/input-popup/input-popup';

import classNames from 'classnames';
import styles from '@/styles/pages/main-page/sub-page/set-location-page.module.scss';
import common from '@/styles/common.module.scss';

import store from '@/utils/store';

import { getApi, postApi, deleteApi, putApi } from '@/utils/api';
import { showAlert } from '@/screens/alert-screen';

export default class SetLocationPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: classNames(styles['set-location-page-wrapper'], common['sub-page']),
    });

    props.$app.appendChild(this.$dom);

    this.HeaderMenu = new HeaderMenu({
      title: '내 동네 설정하기',
      menuType: 'default',
      menuColor: 'grey',
      onClickBack: () => {
        location.href = '/';
      },
    });

    this.InputPopup = new InputPopup({
      onSubmit: (location) => {
        postApi(
          '/users/me/locations',
          {
            location,
          },
          (successMessage) => {
            this.renderLocation(location);
          },
          (erroerMessage) => {
            console.log(erroerMessage);
          },
        );
        this.hidePopup();
      },
      onCancel: () => {
        console.log('cancel');
        this.hidePopup();
      },
    });

    this.renderLocation();
  }

  renderLocation = () => {
    this.ButtonLocationList = [];

    getApi('/users/me/locations', (locationList) => {
      getApi('/users/me/locations/selection', (selection) => {
        store.setState('selection', selection);
        store.setState('locations', locationList);
        if (locationList.length >= 2) {
          this.ButtonLocationList.push(
            new ButtonLocation({
              position: 1,
              buttonState: selection.position === 1 ? 'active' : 'in-active',
              buttonText: locationList[0].location,
              onClickRemove: this.onClickRemove,
              onClickLocation: this.onClickLocation,
            }),
          );
          this.ButtonLocationList.push(
            new ButtonLocation({
              position: 2,
              buttonState: selection.position === 2 ? 'active' : 'in-active',
              buttonText: locationList[1].location,
              onClickRemove: this.onClickRemove,
              onClickLocation: this.onClickLocation,
            }),
          );
        } else if (locationList.length == 1) {
          this.ButtonLocationList.push(
            new ButtonLocation({
              position: 1,
              buttonState: selection.position === 1 ? 'active' : 'in-active',
              buttonText: locationList[0].location,
              onClickRemove: this.onClickRemove,
              onClickLocation: this.onClickLocation,
            }),
          );
          this.ButtonLocationList.push(
            new ButtonLocation({
              buttonState: 'add',
              buttonText: '',
              onClickAdd: this.onClickAdd,
            }),
          );
        } else if (locationList.length == 0) {
          this.ButtonLocationList.push(
            new ButtonLocation({
              buttonState: 'add',
              buttonText: '',
              onClickAdd: this.onClickAdd,
            }),
          );
        }
        this.render();
      });
    });
  };

  onClickLocation = (position) => {
    if (store.state.selection.position === position) {
      return;
    }

    putApi(
      '/users/me/locations/selection',
      {
        position,
      },
      () => {
        store.setState('selection', position);
        this.renderLocation();
      },
    );
  };

  onClickAdd = () => {
    this.showPopup();
  };

  onClickRemove = (position) => {
    if (store.state.locations.length === 1) {
      showAlert({
        message: '반드시 동네는 하나 이상 있어야 합니다.',
      });
      return;
    }

    deleteApi(`/users/me/locations/position/${position}`, this.renderLocation, {
      400: (res) => {
        console.log(res);
      },
    });
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="Header"></div>
      <main class="${styles['set-location-main']}">
        <div class="${styles['message']}">
          <div>지역은 최소 1개 이상</div>
          <div>최대 2개까지 설정 가능해요.</div>
        </div>
        <div class="${styles['location-buttons']}"></div>
      </main>
      <div class="${styles['input-popup-wrapper']}">
        <div class="InputPopup"></div>
      </div>
    `;

    this.replaceElement(this.$dom.querySelector('.Header'), this.HeaderMenu.$dom);
    this.replaceElement(this.$dom.querySelector('.InputPopup'), this.InputPopup.$dom);

    const $locationButtons = this.$dom.querySelector(`.${styles['location-buttons']}`);
    for (const ButtonLocation of this.ButtonLocationList) {
      $locationButtons.appendChild(ButtonLocation.$dom);
    }

    this.addEvent();
  };

  showPopup = () => {
    const $inputPopupWrapper = this.$dom.querySelector(`.${styles['input-popup-wrapper']}`);
    $inputPopupWrapper.classList.add(styles.show);
  };

  hidePopup = () => {
    const $inputPopupWrapper = this.$dom.querySelector(`.${styles['input-popup-wrapper']}`);
    $inputPopupWrapper.classList.remove(styles.show);
  };

  addEvent = () => {
    const $inputPopupWrapper = this.$dom.querySelector(`.${styles['input-popup-wrapper']}`);
    $inputPopupWrapper.addEventListener('click', (e) => {
      if (e.target === $inputPopupWrapper) this.hidePopup();
    });
  };
}
