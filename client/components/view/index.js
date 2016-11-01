import { connect } from 'react-redux'

function View({ number, post_count, increase, decrease }) {
  console.log('yes')
  return (
    <div>
      Visible post count currently:
      {post_count}
      <br />
      <hr />
    </div>
  )
}

export default connect(
  state => ({}),
  { test: function(){} }
)(View)
