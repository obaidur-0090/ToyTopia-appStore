function LegalPage({ kind }) {
  const isPrivacy = kind === 'privacy'
  return (
    <section className="simple-page legal-page">
      <span className="eyebrow">The important bits</span>
      <h1>{isPrivacy ? 'Privacy policy' : 'Terms & conditions'}</h1>
      <p className="legal-updated">Last updated: October 2026</p>
      <h2>{isPrivacy ? 'Your information belongs to you.' : 'A few friendly ground rules.'}</h2>
      <p>{isPrivacy
        ? 'ToyTopia uses Firebase Authentication to securely manage account sign-in and profile details. Toy request and community review forms in this demonstration are not stored on a server. We do not sell personal information.'
        : 'ToyTopia is a community storefront demonstration connecting families with local toy sellers. Product details, availability, ratings, and prices are sample information and should be confirmed with sellers before purchase.'}</p>
      <h2>{isPrivacy ? 'Questions or requests?' : 'Using this website'}</h2>
      <p>{isPrivacy
        ? 'You can update your display name and profile photo from My Profile. For account support, contact hello@toytopia.local.'
        : 'Please use the platform respectfully and provide accurate information when using forms. Product images and seller details are examples for this project.'}</p>
    </section>
  )
}

export default LegalPage
