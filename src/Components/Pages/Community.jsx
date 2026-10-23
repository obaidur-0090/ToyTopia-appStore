import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

function Community() {
  const { user } = useAuth()
  const [rating, setRating] = useState('5')
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState([])

  function handleReview(event) {
    event.preventDefault()
    const review = {
      id: Date.now(),
      name: user?.displayName || 'ToyTopia neighbor',
      rating: Number(rating),
      message,
    }
    setReviews((current) => [review, ...current])
    setMessage('')
    toast.success('Thanks for sharing a little love with the community!')
  }

  return (
    <section className="community-page">
      <div className="community-hero"><span className="eyebrow">A little space for big-hearted play</span><h1>Every good toy has a story.</h1><p>Share a favorite, celebrate a local maker, or help another family find something lovely.</p><span className="community-hero-flower">✿</span></div>
      <div className="community-layout">
        <form className="form-card review-form" onSubmit={handleReview}>
          <span className="eyebrow">Your turn to share</span><h2>Leave a little love</h2><p className="form-intro">Tell the neighborhood about a toy or local shop you love.</p>
          <label htmlFor="review-rating">Your rating</label>
          <select id="review-rating" value={rating} onChange={(event) => setRating(event.target.value)}>{[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{'★'.repeat(score)}{'☆'.repeat(5 - score)} · {score} out of 5</option>)}</select>
          <label htmlFor="review-message">Your note</label>
          <textarea id="review-message" required minLength="8" rows="5" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What made playtime special?" />
          <button className="button button-primary">Share your review <span>→</span></button>
        </form>
        <div className="review-wall"><span className="eyebrow">From our play community</span><h2>Kind words, shared nearby.</h2>
          {reviews.length ? reviews.map((review) => (
            <article className="review-card" key={review.id}><div className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div><p>“{review.message}”</p><strong>{review.name}</strong><small>Just now · ToyTopia neighbor</small></article>
          )) : (
            <div className="review-card sample-review"><div className="review-stars">★★★★★</div><p>“We found the sweetest little puzzle from a shop just around the corner. The kids are still playing with it!”</p><strong>A happy local family</strong><small>Community note</small></div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Community
