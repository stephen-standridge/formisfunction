import { Link, browserHistory } from 'react-router'

export default function Nav({ children }) {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
      </header>
      <div>{children}</div>
    </div>
  )
}
