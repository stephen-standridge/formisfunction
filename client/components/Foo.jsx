import React from 'react'

export var Enhance =( ComposedComponent )=> class extends React.Component {
  constructor() {
    super()
    this.state = { data: null };
  }
  componentDidMount() {
    this.setState({ data: 'Foo' });
  }
  render() {
    return <ComposedComponent {...this.props} data={this.state.data} />;
  }
};
class Foo {
  render() {
    if (!this.props.data) return <div>Waiting...</div>;
    return <div>{this.props.data}</div>;
  }
}
export default Enhance(Foo);
