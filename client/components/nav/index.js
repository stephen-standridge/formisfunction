import { Link, browserHistory } from 'react-router'

export default function Nav({ location, children }) {
	let homeClass = location.pathname.split('/')[1] == '' ? 'selected' : ''
	let contactClass = location.pathname.split('/')[1] == 'contact' ? 'selected' : ''
  return (
    <div>
      <header>
        <Link to="/" className={`${homeClass}`} >Home</Link>
        <Link to="/contact" className={`${contactClass}`} >Contact</Link>
        <Link to="/test" className={`${contactClass}`} >Contact</Link>
      </header>
      <div>{children}</div>
    </div>
  )
}
