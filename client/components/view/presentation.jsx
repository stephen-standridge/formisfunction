export default function ViewPresentation({ number, post_count, increase, decrease }) {
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