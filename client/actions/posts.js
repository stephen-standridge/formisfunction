import agent from 'superagent'
import { GET_POSTS_SUCCESS, HIDE_POST } from './action_types'

export function get_posts() {
  return function( dispatch ){
    agent.get('http://jsonplaceholder.typicode.com/posts')
      .end((err, result)=>{
        dispatch({type: GET_POSTS_SUCCESS, data: result.body})
      })
  }
}

export function hide_post(i){
  return {
    type: HIDE_POST,
    index: i
  }
}
