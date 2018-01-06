class LineControls extends React.Component {
  render() {
    const { prevState, nextState, children, prevClick, nextClick } = this.props;
    return <div className="line-navigation__controls">
      { prevState ?
        <div className="line-navigation__controls--prev clickable" onClick={prevClick} >{"<"}</div> :
        <div className="line-navigation__controls--prev"/> }
      { children }
      { nextState ?
        <div className="line-navigation__controls--next clickable" onClick={nextClick} >{">"}</div> :
        <div className="line-navigation__controls--next"/> }
    </div>
  }
}

export { LineControls }
