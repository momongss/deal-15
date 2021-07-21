import Component from '@/components/component';

import ButtonFab from '@/components/Button/button-fab';
import ButtonLocation from '@/components/Button/button-location';
import ButtonNormal from '@/components/Button/button-normal';
import ButtonStatus from '@/components/Button/button-status';
import ButtonCategory from '@/components/Button/button-category';
import ButtonTab from '@/components/Button/button-tab';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'test-page-wrapper' });

    this.ButtonFab1 = new ButtonFab({
      buttonState: null,
      onClick: () => {
        console.log('fab1');
      },
    });
    this.ButtonFab2 = new ButtonFab({
      buttonState: 'disable',
      onClick: () => {
        console.log('fab2');
      },
    });

    this.ButtonLocation1 = new ButtonLocation({
      buttonState: 'add',
      buttonText: '',
      onClickAdd: () => {
        console.log('추가');
      },
    });
    this.ButtonLocation2 = new ButtonLocation({
      buttonState: 'active',
      buttonText: 'Button',
      onClickRemove: () => {
        confirm('정말 삭제합니까?');
      },
    });
    this.ButtonLocation3 = new ButtonLocation({
      buttonState: 'in-active',
      buttonText: 'Button',
      onClickRemove: () => {
        confirm('정말 삭제합니까?');
      },
    });

    this.ButtonNormal1 = new ButtonNormal({
      buttonType: 'medium',
      buttonState: '',
      buttonText: 'Button',
      onClick: () => {
        console.log('normal');
      },
    });

    this.ButtonNormal2 = new ButtonNormal({
      buttonType: 'medium',
      buttonState: 'disable',
      buttonText: 'Button',
      onClick: () => {
        console.log('normal');
      },
    });

    this.ButtonNormal3 = new ButtonNormal({
      buttonType: 'large',
      buttonState: '',
      buttonText: 'Button',
      onClick: () => {
        console.log('normal');
      },
    });

    this.ButtonNormal4 = new ButtonNormal({
      buttonType: 'large',
      buttonState: 'disable',
      buttonText: 'Button',
      onClick: () => {
        console.log('normal');
      },
    });

    this.ButtonStatus = new ButtonStatus({
      buttonText: 'Button',
      onClick: () => {
        console.log('status');
      },
    });

    this.ButtonCategory1 = new ButtonCategory({
      buttonState: '',
      buttonText: 'Button',
      onClick: () => {
        console.log('status');
      },
    });

    this.ButtonCategory2 = new ButtonCategory({
      buttonState: 'disable',
      buttonText: 'Button',
      onClick: () => {
        console.log('status');
      },
    });

    this.ButtonTab1 = new ButtonTab({
      buttonState: '',
      buttonText: 'Button',
      onClick: () => {
        console.log('selected');
      },
    });

    this.ButtonTab2 = new ButtonTab({
      buttonState: 'selected',
      buttonText: 'Button',
      onClick: () => {
        console.log('selected');
      },
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="ButtonFab1"></div>
      <div class="ButtonFab2"></div>
      <div class="ButtonLocation1"></div>
      <div class="ButtonLocation2"></div>
      <div class="ButtonLocation3"></div>
      <div class="ButtonNormal1"></div>
      <div class="ButtonNormal2"></div>
      <div class="ButtonNormal3"></div>
      <div class="ButtonNormal4"></div>
      <div class="ButtonStatus"></div>
      <div class="ButtonCategory1"></div>
      <div class="ButtonCategory2"></div>
      <div class="ButtonTab1"></div>
      <div class="ButtonTab2"></div>
    `;

    this.replaceElement(this.$dom.querySelector('.ButtonFab1'), this.ButtonFab1.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonFab2'), this.ButtonFab2.$dom);

    this.replaceElement(this.$dom.querySelector('.ButtonLocation1'), this.ButtonLocation1.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonLocation2'), this.ButtonLocation2.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonLocation3'), this.ButtonLocation3.$dom);

    this.replaceElement(this.$dom.querySelector('.ButtonNormal1'), this.ButtonNormal1.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonNormal2'), this.ButtonNormal2.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonNormal3'), this.ButtonNormal3.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonNormal4'), this.ButtonNormal4.$dom);

    this.replaceElement(this.$dom.querySelector('.ButtonStatus'), this.ButtonStatus.$dom);

    this.replaceElement(this.$dom.querySelector('.ButtonCategory1'), this.ButtonCategory1.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonCategory2'), this.ButtonCategory2.$dom);

    this.replaceElement(this.$dom.querySelector('.ButtonTab1'), this.ButtonTab1.$dom);
    this.replaceElement(this.$dom.querySelector('.ButtonTab2'), this.ButtonTab2.$dom);
  };

  addEvent = () => {
    //
  };
}
