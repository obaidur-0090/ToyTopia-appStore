import { Link } from 'react-router'

function Error() {
  return (
    <section className="not-found">
      <span className="not-found-number">404</span>
      <span className="eyebrow">Oops, wrong playroom!</span>
      <h1>This page wandered off.</h1>
      <p>We couldn’t find the page you were looking for. Let’s get you back to the good stuff.</p>
      <Link className="button button-primary" to="/">Back to ToyTopia <span>→</span></Link>
    </section>
  )
}

export default Error
