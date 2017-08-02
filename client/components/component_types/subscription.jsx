import '../../styles/subscription.scss';
import isEmail from 'validator/lib/isEmail';

class SubscriptionComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = { active: false, valid: true, subscribed: false };
    this.toggleActive = this._toggleActive.bind(this);
    this.cancel = this._cancel.bind(this);
    this.handleKeyPress = this._handleKeyPress.bind(this);
    this.submitEmailMaybe = this._submitEmailMaybe.bind(this);
    this.removeValidation = this._removeValidation.bind(this);
    this.nullFunc = function(){};
  }
  _submitEmailMaybe() {
    const { subscribe } = this.props;
    if(isEmail(this.refs.subscription__input.value)) {
      subscribe(this.refs.subscription__input.value);
    } else {
      this.setState({ valid: false });
    }
  }
  _handleKeyPress(e) {
    if (e.key == "Enter") {
      this.submitEmailMaybe()
    }
  }
  _setSubscribed() {
    this.setState((prevState) => {
      prevState.subscribed = true;
      return prevState;
    })
  }
  _removeValidation() {
    if (this.state.valid) return;
    this.refs.subscription__input.value = "";
    this.setState({ valid: true })
  }
  _cancel() {
    this.refs.subscription__input.value = "";
    this.setState({ valid: true })
    this._toggleActive();
  }
  _toggleActive() {
    this.setState((prevState) => {
      prevState.active = !prevState.active;
      return prevState;
    })
  }
  componentWillReceiveProps({ store }) {
    const { subscribed } = store;
    if (subscribed) {
      this._toggleActive();
    }
  }
  renderForm() {
    const { subscribing, error } = this.props.store;
    return <div className='subscription__form subscription__content'>
      <div className="subscription__actions">
        <input className="subscription__input"
              type="text"
              ref="subscription__input"
              placeholder="email goes here"
              disabled={subscribing}
              onClick={subscribing ? this.nullFunc : this.removeValidation}
              onKeyPress={subscribing ? this.nullFunc : this.handleKeyPress}/>
        <div className={`subscription__confirm subscription__option clickable link ${subscribing ? 'disabled' : ''}`}
              onClick={subscribing ? this.nullFunc : this.submitEmailMaybe}> > </div>
        <div className={`subscription__cancel subscription__option clickable link ${subscribing ? 'disabled' : ''}`}
              onClick={subscribing ? this.nullFunc : this.cancel}> x </div>
      </div>
      { error ? <div className="subscription__error error">
        { error }
      </div> : null }
    </div>
  }
  render() {
    const { component, classNames, store } = this.props;
    const { subscribed, error } = store;
    const { slug } = component;
    const { active, valid } = this.state;
    return <div className={`subscription__wrapper subscription__wrapper--${slug} ${classNames && classNames.wrapper || ''}` }>
      <div onClick={subscribed || active ? this.nullFunc : this.toggleActive} className={`subscription__button clickable link ${classNames && classNames.button || ''} ${ active ? 'active' : ''} ${ valid ? '' : 'invalid'}`} >
        { active ? this.renderForm() :
          <div className={`subscription__text subscription__content ${subscribed ? 'subscribed' : ''}`}>
            {subscribed ? "subscribed!" : "subscribe"}
          </div>
        }
      </div>
    </div>
  }
}

export { SubscriptionComponent }
