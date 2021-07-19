import Component from '@/components/Component';

import styles from '@/styles/components/text-input/text-input.module.scss';

// props : { type, onInput }
export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('input', {
      className: styles['text-input'],
      type: 'text',
      placeholder: this._props.text,
    });

    this.$dom.classList.add(styles[this._props.type]);

    this.addEvent();
  }

  addEvent = () => {
    this.$dom.addEventListener('input', this._props.onInput);
  };
}
