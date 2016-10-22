import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'

function Home({ number, post_count, increase, decrease }) {
  return (
    <div>
      Visible post count currently:
      {post_count}
      <br />
      <hr />
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  )
}

export default connect(
  state => ({
    number: state.count.get('number'),
    post_count: state.posts.get('data').filter((d)=> !d.get('hidden') ).size
  }),
  { increase, decrease }
)(Home)
