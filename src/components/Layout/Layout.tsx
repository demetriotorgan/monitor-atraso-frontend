
import { Outlet } from 'react-router'
import Banner from '../Dashboard/Banner/Banner'
import NavBar from '../NavBar/NavBar'

function Layout() {
  return (
    <>
      <Banner />
      <main className="app-main">
        <Outlet />
      </main>
      <NavBar />
    </>
  )
}

export default Layout
