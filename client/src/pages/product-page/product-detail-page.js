import Component from '@/components/component';

import classNames from 'classnames';
import styles from '@/styles/pages/product-page/product-detail-page.module.scss';
import common from '@/styles/common.module.scss';

import ChatPage from './sub-page/chat-page';

import HeaderMenu from '@/components/header/header-menu';
import ImgBox from '@/components/img-box/img-box';
import ImgNav from '@/components/img-nav/img-nav';
import DropDown from '@/components/drop-down/drop-down';

import ButtonStatus from '@/components/button/button-status';
import InfoSaler from '@/components/info-saler/info-saler';
import ProductBar from '@/components/product-bar/product-bar';

import { deleteApi, getApi } from '@/utils/api';
import { getTimeStamp } from '@/utils/getTimeStamp';
import store from '@/utils/store';
import { showAlert } from '@/screens/alert-screen';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    getApi(location.pathname, (product) => {
      this._props.userType = product.saler.username === store.state.login.username ? 'sell' : 'buyer';

      this._state = { ...product, imageIndex: 0 };

      this.$dom = this.createDom('div', {
        className: classNames(styles['product-detail-page-wrapper'], common['sub-page']),
      });

      this.$dom.classList.add(styles[this._props.userType]);

      // this.ChatPage = new ChatPage({ productId: this._state.id });

      props.$app.appendChild(this.$dom);
      // props.$app.appendChild(this.ChatPage.$dom);

      this.Header = new HeaderMenu({
        title: '',
        menuType: 'product-detail',
        menuState: this._props.userType,
        menuColor: 'none',
        onClickBack: () => {
          location.href = '/';
        },
        onClickOption: this.toggleOption,
      });
      this.Header.$dom.classList.add(styles['top-header']);

      this.DropDown = new DropDown({
        itemList: [
          {
            label: '수정하기',
            state: 'normal',
          },

          {
            label: '삭제하기',
            state: 'highlighted',
          },
        ],

        onClick: (e, label) => {
          e._dropdownClicked = true;
          if (label === '수정하기') {
            location.href = `/products/${this._state.id}/edit`;
          } else if (label == '삭제하기') {
            showAlert({
              message: '정말 삭제하나요??',
              okMessage: '삭제',
              onClickOk: () => {
                deleteApi(`/products/${this._state.id}`, () => {
                  showAlert({
                    message: '삭제되었습니다!',
                    onClickOk: () => {
                      location.href = '/';
                    },
                  });
                });
              },
              onClickCancel: () => {},
            });
          }
        },
      });

      this.ImgBox = new ImgBox({
        type: 'gradient',
        imageURL: this._state.images[this._state.imageIndex],
        onClick: () => {
          console.log('img-gradient');
        },
      });

      this.ImgNav = new ImgNav({
        navCount: this._state.images.length,
        onClick: (navPosition) => {
          this._state.imageIndex = navPosition;

          this.ImgNav.setState({ navPosition });
          this.ImgBox.setState({ imageURL: this._state.images[this._state.imageIndex] });
        },
      });

      this.ButtonStatus = new ButtonStatus({
        buttonText: '판매중',
        onClick: () => {
          console.log('status');
        },
      });

      this.InfoSaler = new InfoSaler({
        name: this._state.saler.username,
        place: this._state.saler.location,
      });

      this.ProductBar = new ProductBar({
        price: this._state.price != null ? this._state.price : '가격 미정',
        buttonName: this._props.userType === 'sell' ? `채팅 목록 보기(${this._state.count.chat})` : `문의하기`,
        onClick: () => {
          showAlert({
            message: '채팅기능은 추후 공개 됩니다! 두둥!',
          });
        },
      });

      this.render();
      this.addEvent();
    });
  }

  onClickChatList = () => {
    console.log('move');
    // this.ChatPage.togglePage();
  };

  setState = (nextState) => {
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['header-wrapper']}">
        <div class="Header"></div>
        <div class="${styles['drop-down-wrapper']}">
          <div class="DropDown"></div>
        </div>
      </div>
      <div class="${styles['content-wrapper']}">
        <div class="${styles['image-wrapper']}">
          <div class="ImgBox"></div>
          <div class="ImgNav"></div>
        </div>
        <main class="${styles['page-main']}">
          <div class="ButtonStatus"></div>
          <div class="${styles['title']}">${this._state.title}</div>
          <div class="${styles['info']}">${this._state.category} · ${getTimeStamp(this._state.createdDatetime)}
          </div>
          <div class="${styles['content']}">${this._state.content}</div>
          <div class="${styles['status']}">
            채팅 ${this._state.count.chat} · 관심 ${this._state.count.watch} · 조회 ${this._state.count.views}
          </div>
          <div class="InfoSaler"></div>
        </main>
        <div class="ProductBar"></div>
      </div>
    `;

    if (this._props.userType === 'sell') {
      this.replaceElement(this.$dom.querySelector('.ButtonStatus'), this.ButtonStatus.$dom);
      this.replaceElement(this.$dom.querySelector('.DropDown'), this.DropDown.$dom);
    }

    this.replaceElement(this.$dom.querySelector('.ImgBox'), this.ImgBox.$dom);
    this.replaceElement(this.$dom.querySelector('.Header'), this.Header.$dom);
    this.replaceElement(this.$dom.querySelector('.ImgNav'), this.ImgNav.$dom);
    this.replaceElement(this.$dom.querySelector('.InfoSaler'), this.InfoSaler.$dom);
    this.replaceElement(this.$dom.querySelector('.ProductBar'), this.ProductBar.$dom);
  };

  toggleOption = (e) => {
    e._dropdownClicked = true;
    const $dropDownWrapper = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
    $dropDownWrapper.classList.toggle(styles.show);
  };

  addEvent = () => {
    window.addEventListener('click', (e) => {
      if (!('_dropdownClicked' in e)) {
        const $dropDownWrapper = this.$dom.querySelector(`.${styles['drop-down-wrapper']}`);
        $dropDownWrapper.classList.remove(styles.show);
      }
    });
  };
}
