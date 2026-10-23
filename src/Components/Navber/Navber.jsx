import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth, requireFirebaseConfig } from '../../firebase.inti'
import { useAuth } from '../../context/AuthContext'
import image from '../../assets/letter-t-.png'

function Navber() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    try {
      requireFirebaseConfig()
      await signOut(auth)
      toast.success('You have been logged out. See you next time!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Unable to log out. Please try again.')
    }
  }

  const navItems = (
    <>
      <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/community" onClick={() => setMenuOpen(false)}>Play community</NavLink>
      <NavLink to="/profile" onClick={() => setMenuOpen(false)}>My profile</NavLink>
    </>
  )

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="ToyTopia home">
          <img src={image} alt="logo image" />
          <span className="brand-name">toy<span>topia</span><small>little joys, made nearby</small></span>
        </Link>
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>{navItems}</div>
        <div className="nav-actions">
          {loading ? (
            <span className="nav-auth-loading" role="status">Loading…</span>
          ) : user ? (
            <>
              <Link className="user-chip" to="/profile" title={user.displayName || user.email}>
                {user.photoURL
                  ? <img src={user.photoURL} alt="" />
                  : <span className="avatar-fallback">{(user.displayName || user.email || 'T').charAt(0).toUpperCase()}</span>}
                <span className="user-name">{user.displayName || 'My profile'}</span>
              </Link>
              <button type="button" className="button button-small button-outline" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <Link className="button button-small button-outline" to="/login">Log in <span>↗</span></Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navber
