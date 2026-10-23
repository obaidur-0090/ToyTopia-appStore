import { useEffect } from 'react'
import Navber from '../Navber/Navber'
import { Outlet, useLocation } from 'react-router'
import Footer from '../Footer/Footer'

function Root() {
  const { pathname } = useLocation()

  useEffect(() => {
    const title = pathname.startsWith('/toys/')
      ? 'Toy details'
      : pathname.slice(1).replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Home'
    document.title = `${title} | ToyTopia`
  }, [pathname])

  return (
    <div className="app-shell">
      <Navber />
      <main className="page-main"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default Root
