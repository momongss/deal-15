import Component from '@/components/component';

import styles from '@/styles/components/input-popup/input-popup.module.scss';

export default class InputPopup extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: styles['input-popup'],
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div class="${styles['label']}">현재 위치를 입력하세요</div>
      <input type="text" class="${styles['place-input']}" placeholder="시·구 제외, 동만 입력">
      <div class="${styles['buttons']}">
        <div class="${styles['cancel']}">취소</div>
        <div class="${styles['confirm']}">확인</div>
      </div>
    `;
  };

  addEvent = () => {
    const $confirmButton = this.$dom.querySelector(`.${styles['confirm']}`);
    const $cancelButton = this.$dom.querySelector(`.${styles['cancel']}`);
    const $placeInput = this.$dom.querySelector(`.${styles['place-input']}`);

    $confirmButton.addEventListener('click', (e) => {
      if ($placeInput.value.length > 0) this._props.onSubmit($placeInput.value);
    });

    $cancelButton.addEventListener('click', (e) => {
      this._props.onCancel($placeInput.value);
    });

    $placeInput.addEventListener('input', (e) => {
      if ($placeInput.value.length > 0) {
        $confirmButton.classList.add(styles['active']);
      } else {
        $confirmButton.classList.remove(styles['active']);
      }
    });
  };
}
