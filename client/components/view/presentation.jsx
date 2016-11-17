export default function ViewPresentation({ number, post_count, increase, decrease }) {
  console.log('yes')
  return (
    <div className="">
      Visible post count currently:
      {post_count}
      <br />
      <hr />
    </div>
  )
}