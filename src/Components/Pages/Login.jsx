import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth, requireFirebaseConfig } from '../../firebase.inti'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const destination = location.state?.from?.pathname || '/'

  async function handleLogin(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      requireFirebaseConfig()
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Welcome back to ToyTopia!')
      navigate(destination, { replace: true })
    } catch (error) {
      toast.error(error.message || 'We could not log you in. Please check your details.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true)
    try {
      requireFirebaseConfig()
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Welcome to ToyTopia!')
      navigate(destination, { replace: true })
    } catch (error) {
      toast.error(error.message || 'Google sign-in did not work. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-side auth-side-login">
        <span className="auth-deco auth-deco-one">✳</span>
        <div className="auth-side-content">
          <span className="eyebrow">Your happy place for play</span>
          <h1>Welcome back,<br />playful soul.</h1>
          <p>Pick up right where the fun left off. Your next little discovery is waiting.</p>
          <span className="auth-doodle">♡</span>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="form-card" onSubmit={handleLogin}>
          <span className="eyebrow">Come on in</span>
          <h2>Log in to ToyTopia</h2>
          <p className="form-intro">We’ve saved you a spot.</p>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          <div className="label-row"><label htmlFor="login-password">Password</label><Link to="/forgot-password" state={{ email }}>Forgot password?</Link></div>
          <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" />
          <button className="button button-primary button-full" type="submit" disabled={submitting}>{submitting ? 'One moment…' : 'Log in'} <span>→</span></button>
          <div className="form-divider"><span>or</span></div>
          <button className="button button-google button-full" type="button" onClick={handleGoogleLogin} disabled={submitting}><span className="google-g">G</span> Continue with Google</button>
          <p className="form-switch">New around here? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Login
