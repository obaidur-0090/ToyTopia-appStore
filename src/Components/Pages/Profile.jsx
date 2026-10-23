import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../firebase.inti'
import { useAuth } from '../../context/AuthContext'

function Profile() {
  const { user, refreshUser } = useAuth()
  const [name, setName] = useState(user?.displayName || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
  const [saving, setSaving] = useState(false)

  async function handleUpdate(event) {
    event.preventDefault()
    setSaving(true)
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL.trim() || null })
      await refreshUser()
      toast.success('Your profile has been updated.')
    } catch (error) {
      toast.error(error.message || 'We could not update your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="simple-page profile-page">
      <div className="profile-intro"><span className="eyebrow">Your ToyTopia corner</span><h1>Hello, {user?.displayName || 'friend'}!</h1><p>Keep your little corner of the neighborhood up to date.</p></div>
      <div className="profile-layout">
        <aside className="profile-summary">
          {user?.photoURL ? <img src={user.photoURL} alt="" /> : <div className="profile-avatar-fallback">{(user?.displayName || user?.email || 'T').charAt(0).toUpperCase()}</div>}
          <h2>{user?.displayName || 'ToyTopia friend'}</h2><p>{user?.email}</p>
          <span className="profile-badge">✦ Local play explorer</span>
        </aside>
        <form className="form-card profile-edit" onSubmit={handleUpdate}>
          <span className="eyebrow">Make it yours</span><h2>Edit your profile</h2>
          <label htmlFor="profile-name">Name</label><input id="profile-name" required value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="profile-email">Email address</label><input id="profile-email" value={user?.email || ''} readOnly />
          <label htmlFor="profile-photo">Photo URL (optional)</label><input id="profile-photo" type="url" value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} placeholder="https://…" />
          <button className="button button-primary" disabled={saving}>{saving ? 'Saving…' : 'Save changes'} <span>→</span></button>
        </form>
      </div>
    </section>
  )
}

export default Profile
