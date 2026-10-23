import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth, requireFirebaseConfig } from '../../firebase.inti'

function ForgotPassword() {
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [submitting, setSubmitting] = useState(false)

  async function handleReset(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      requireFirebaseConfig()
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent successfully. Please check your gmail inbox.....')
      
    } catch (error) {
      toast.error(error.message || 'We could not send a reset link. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="simple-page auth-simple-page">
      <form className="form-card compact-form" onSubmit={handleReset}>
        <span className="eyebrow">A little password help</span>
        <h1>Let’s get you back in.</h1>
        <p className="form-intro">Enter the email on your account and we’ll send a reset link.</p>
        <label htmlFor="reset-email">Email address</label>
        <input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        <button className="button button-primary button-full" disabled={submitting}>{submitting ? 'Sending…' : 'Reset password'} <span>→</span></button >
        <p className="form-switch"><Link to="/login">Back to log in</Link></p>
      </form>
    </section>
  )
}

export default ForgotPassword
