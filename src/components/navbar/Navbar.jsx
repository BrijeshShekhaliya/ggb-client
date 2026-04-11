import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarMain from './NavbarMain'
import NavbarTop from './NavbarTop'
import './navbar.css'
import { headerContent, navContent } from '../../data/siteContent'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState('')
  const [desktopGroup, setDesktopGroup] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  const { mainItems, ctaItem } = useMemo(() => {
    const highlightItem = navContent.find((item) => item.highlight)
    const regularItems = navContent.filter((item) => !item.highlight)

    return {
      mainItems: regularItems,
      ctaItem: highlightItem,
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const isCompactViewport = window.innerWidth <= 1220

      setIsScrolled(currentY > 16)

      if (isCompactViewport) {
        setIsHidden(false)
      } else if (currentY <= 8) {
        setIsHidden(false)
      } else if (currentY > lastScrollY.current + 8) {
        setIsHidden(true)
      } else if (currentY < lastScrollY.current - 8) {
        setIsHidden(false)
      }

      lastScrollY.current = currentY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const toggleMobile = () => {
    setMobileOpen((currentValue) => !currentValue)
  }

  const toggleGroup = (label) => {
    const isCompactViewport = window.innerWidth <= 1220

    if (isCompactViewport) {
      setOpenGroup((currentValue) => (currentValue === label ? '' : label))
    } else {
      setDesktopGroup((currentValue) => (currentValue === label ? '' : label))
    }
  }

  const closeMenus = () => {
    setMobileOpen(false)
    setOpenGroup('')
    setDesktopGroup('')
  }

  const openDesktopGroup = (label) => {
    if (window.innerWidth > 1220) {
      setDesktopGroup(label)
    }
  }

  const closeDesktopGroup = () => {
    if (window.innerWidth > 1220) {
      setDesktopGroup('')
    }
  }

  return (
    <header
      className={`navbar${isScrolled ? ' navbar-scrolled' : ''}${
        isHidden ? ' navbar-hidden' : ''
      }`}
    >
      <div className="container navbar-shell">
        <Link className="navbar-brand" to="/" onClick={closeMenus}>
          <img
            className="navbar-brand-logo"
            src={headerContent.logo}
            alt="Gujarat Gramin Bank"
          />

        </Link>

        <NavbarTop actions={headerContent.actions} />
        <NavbarMain
          actions={headerContent.actions}
          items={mainItems}
          ctaItem={ctaItem}
          mobileOpen={mobileOpen}
          openGroup={openGroup}
          desktopGroup={desktopGroup}
          onToggleMobile={toggleMobile}
          onToggleGroup={toggleGroup}
          onOpenDesktopGroup={openDesktopGroup}
          onCloseDesktopGroup={closeDesktopGroup}
          onCloseMenus={closeMenus}
        />
      </div>
    </header>
  )
}

export default Navbar
