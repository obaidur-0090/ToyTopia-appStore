import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark">t<span>✳</span></span>
            <span className="brand-name">toy<span>topia</span><small>little joys, made nearby</small></span>
          </Link>
          <p>A little corner of the internet for big imaginations and the local shops that make them bloom.</p>
        </div>
        <div className="footer-column"><h3>Explore</h3><Link to="/">Home</Link><Link to="/community">Play community</Link><Link to="/profile">My profile</Link></div>
        <div className="footer-column"><h3>Good to know</h3><Link to="/terms">Terms & conditions</Link><Link to="/privacy">Privacy policy</Link><a href="mailto:hello@toytopia.local">Contact us</a></div>
        <div className="footer-column"><h3>Say hello</h3><p>Follow along for tiny joys and local stories.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">p</a></div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ToyTopia. Made for little moments.</span><span>Growing a more playful neighborhood, together <b>✳</b></span></div>
    </footer>
  )
}

export default Footer