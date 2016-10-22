import React from 'react'
import { connect } from 'react-redux'
import { get_posts, hide_post } from '../actions/posts'

const Post=({ data, hide })=>{
  if(data.hidden){ return <div></div> }
  return (
    <div onClick={hide} style={ { 'cursor': 'pointer' } }>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
      <em>{data.id}</em>
      <hr />
    </div>
  )
}

const Posts = React.createClass({
  render: function(){
    return (
      <div>
        Here are some posts:
        {this.renderPosts()}
        <button onClick={this.props.get_posts}>Get Posts</button>
      </div>
    )
  },
  renderPosts: function(){
    return this.props.posts.map((p, i)=>{
      return <Post key={i} data={p} hide={this.props.hide_post.bind(this,i)}/>
    })
  }

})
export default connect(
  state => ({ posts: state.posts.get('data').toJS() }),
  { get_posts, hide_post }
)(Posts)
