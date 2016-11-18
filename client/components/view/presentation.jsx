export default function ViewPresentation({ number, post_count, increase, decrease }) {
  return (
    <div className="">
      Visible post count currently:
      {post_count}
      <br />
      <hr />
    </div>
  )
}