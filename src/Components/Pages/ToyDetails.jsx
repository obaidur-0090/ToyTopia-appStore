import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { getToy } from '../../data/toys'
import { useAuth } from '../../context/AuthContext'

function ToyDetails() {
  const { toyId } = useParams()
  const toy = getToy(toyId)
  const { user } = useAuth()
  const [name, setName] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')

  if (!toy) {
    return <section className="not-found inline-not-found"><span className="eyebrow">Toy not found</span><h1>That little treasure is hiding.</h1><Link className="button button-primary" to="/">Browse all toys</Link></section>
  }

  function handleTryNow(event) {
    event.preventDefault()
    toast.success(`Thanks, ${name}! ${toy.toyName} is ready for your next adventure.`)
  }

  return (
    <section className="detail-page">
      <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>{toy.toyName}</span></div>
      <div className="detail-layout">
        <div className="detail-image-wrap"><img className="detail-image" src={toy.pictureURL} alt={toy.toyName} /><span className="detail-sticker">local<br />favorite</span></div>
        <div className="detail-content">
          <span className="eyebrow">{toy.subCategory} · {toy.ageRange}</span>
          <h1>{toy.toyName}</h1>
          <p className="detail-seller">Thoughtfully brought to you by <strong>{toy.sellerName}</strong></p>
          <div className="detail-rating"><span>★ {toy.rating.toFixed(1)}</span><span>·</span><span>{toy.availableQuantity} ready for play</span></div>
          <p className="detail-description">{toy.description}</p>
          <div className="detail-price">${toy.price.toFixed(2)} <small>USD</small></div>
          <div className="seller-note"><span>♡</span><p><strong>Shop small, play big.</strong><br />Your order supports a local toy seller.</p></div>
          <form className="try-form" onSubmit={handleTryNow}>
            <h2>Try this toy</h2>
            <p>Leave your details and we’ll help you connect with the seller.</p>
            <label htmlFor="try-name">Name</label>
            <input id="try-name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
            <label htmlFor="try-email">Email</label>
            <input id="try-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
            <button className="button button-primary button-full">Try now <span>→</span></button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ToyDetails
