import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth, requireFirebaseConfig } from '../../firebase.inti'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleRegister(event) {
    event.preventDefault()
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      toast.error('Use at least 6 characters with an uppercase and a lowercase letter.')
      return
    }
    setSubmitting(true)
    try {
      requireFirebaseConfig()
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name, photoURL: photoURL.trim() || null })
      toast.success('Your ToyTopia account is ready. Let’s play!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'We could not create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleRegister() {
    setSubmitting(true)
    try {
      requireFirebaseConfig()
      await signInWithPopup(auth, new GoogleAuthProvider())
      toast.success('Welcome to ToyTopia!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Google sign-in did not work. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-side auth-side-register">
        <span className="auth-deco auth-deco-one">✿</span>
        <div className="auth-side-content">
          <span className="eyebrow">A new kind of toy story</span>
          <h1>Let the little<br />adventures begin.</h1>
          <p>Join the neighborhood and find playthings with a little extra heart.</p>
          <span className="auth-doodle">✦</span>
        </div>
      </div>
      <div className="auth-form-wrap">
        <form className="form-card" onSubmit={handleRegister}>
          <span className="eyebrow">Make yourself at home</span>
          <h2>Create your account</h2>
          <p className="form-intro">A whole world of local play is just ahead.</p>
          <label htmlFor="register-name">Your name</label>
          <input id="register-name" type="text" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="How should we call you?" />
          <label htmlFor="register-email">Email address</label>
          <input id="register-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          <label htmlFor="register-photo">Photo URL (optional)</label>
          <input id="register-photo" type="url" value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} placeholder="https://…" />
          <label htmlFor="register-password">Password</label>
          <div className="password-wrap">
            <input id="register-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" aria-describedby="password-hint" />
            <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <small id="password-hint" className="field-hint">Include at least one uppercase and one lowercase letter.</small>
          <button className="button button-primary button-full" type="submit" disabled={submitting}>{submitting ? 'Creating your account…' : 'Create account'} <span>→</span></button>
          <div className="form-divider"><span>or</span></div>
          <button className="button button-google button-full" type="button" onClick={handleGoogleRegister} disabled={submitting}><span className="google-g">G</span> Continue with Google</button>
          <p className="form-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Register
