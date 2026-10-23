import { Link } from 'react-router'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import 'swiper/css'
import 'swiper/css/pagination'
import { toys } from '../../data/toys'
import { ArrowRightFromLine, Unlink } from 'lucide-react'

const slides = [
  {
    eyebrow: 'Little joys, made nearby',
    title: 'Big imagination starts with little things.',
    copy: 'Find thoughtful toys from the makers and neighborhood shops right around you.',
    image: toys[0].pictureURL,
    tone: 'peach',
  },
  {
    eyebrow: 'Play that brings us together',
    title: 'A whole world of wonder, just a click away.',
    copy: 'From first puzzles to forever-favorite plushies, there is something for every kind of play.',
    image: toys[1].pictureURL,
    tone: 'lavender',
  },
  {
    eyebrow: 'Made with care, found with love',
    title: 'Make room for a little more magic.',
    copy: 'Meet local sellers who put heart into every toy, and find your family’s next favorite.',
    image: toys[5].pictureURL,
    tone: 'mint',
  },
]

function ToyCard({ toy }) {
  return (
    <article className="toy-card">
      <Link className="toy-image-link" to={`/toys/${toy.toyId}`} aria-label={`Explore ${toy.toyName}`}>
        <img src={toy.pictureURL} alt={toy.toyName} className="toy-image" loading="lazy" />
        <span className="toy-category">{toy.subCategory}</span>
      </Link>
      <div className="toy-card-content">
        <div className="toy-title-row">
          <h3>{toy.toyName}</h3>
          <span className="rating">★ {toy.rating.toFixed(1)}</span>
        </div>
        <p className="seller-line">by {toy.sellerName}</p>
        <div className="toy-card-bottom">
          <div>
            <strong>${toy.price.toFixed(2)}</strong>
            <span className="stock-line">{toy.availableQuantity} ready for play</span>
          </div>
          <Link className="button button-small button-outline" to={`/toys/${toy.toyId}`}>View more</Link>
        </div>
      </div>
    </article>
  )
}

function Home() {
  return (
    <>
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className={`hero-slide hero-${slide.tone}`}>
                <div className="hero-copy">
                  <span className="eyebrow"><span className="sparkle">#</span> {slide.eyebrow}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.copy}</p>
                  <a className="button button-primary" href="#popular">Explore the toy shop <span>→</span></a>
                  <div className="hero-proof"><span className=""><ArrowRightFromLine /></span> Loved by little dreamers & their grown-ups</div>
                </div>
                <div className="hero-art">
                  <div className="hero-blob" />
                  <img src={slide.image} alt="" />
                  <span className="hero-sticker">play<br />happy!</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="section popular-section" id="popular">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A little bit of lovely</span>
            <h2>Neighborhood favorites</h2>
            <p>Handpicked playthings, loved by local families.</p>
          </div>
          <span className="hand-drawn-star" aria-hidden="true">✳</span>
        </div>
        <div className="toy-grid">
          {toys.map((toy) => <ToyCard key={toy.toyId} toy={toy} />)}
        </div>
      </section>

      <section className="maker-band">
        <div className="maker-doodle" aria-hidden="true">✿</div>
        <div className="maker-content">
          <span className="eyebrow">Good toys. Good neighbors.</span>
          <h2>Every little purchase can make a big local difference.</h2>
          <p>Behind every toy is a real person, a small shop, and a whole lot of heart. Discover the people who make our community a more playful place.</p>
          <Link className="button button-dark" to="/community">Meet our play community <span>→</span></Link>
        </div>
        <div className="maker-photo">
          <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=85" alt="A family sharing a playful moment" loading="lazy" />
          <span>Little moments<br />mean the most.</span>
        </div>
      </section>

      <section className="section promise-section">
        <div className="section-heading centered-heading">
          <span className="eyebrow">The ToyTopia promise</span>
          <h2>Play more. Worry less.</h2>
          <p>A happier way to find something wonderful.</p>
        </div>
        <div className="promise-grid">
          <article><span className="promise-icon promise-peach">♡</span><h3>Picked with care</h3><p>Thoughtful finds from people who know and love what they sell.</p></article>
          <article><span className="promise-icon promise-blue">⌂</span><h3>Rooted close to home</h3><p>Every discovery helps neighborhood shops and makers shine.</p></article>
          <article><span className="promise-icon promise-yellow">✦</span><h3>Made for real play</h3><p>Open-ended fun for curious minds, growing hands, and big ideas.</p></article>
        </div>
        <div className="community-cta">
          <div><span className="eyebrow">Your next favorite is waiting</span><h2>Come on in. There’s room to play.</h2></div>
          <button className="button button-primary" type="button" onClick={() => toast.info('Pick a favorite toy and explore its story!')}>Let’s find it <span>→</span></button>
        </div>
      </section>
    </>
  )
}

export default Home
