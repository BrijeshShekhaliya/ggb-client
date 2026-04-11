import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { connectLinks, footerLinkGroups, headerContent } from '../data/siteContent'

const socialIconMap = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
}

const socialClassMap = {
  Facebook: 'is-facebook',
  Instagram: 'is-instagram',
  YouTube: 'is-youtube',
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link className="footer-brand" to="/">
          <div className="footer-brand-mark">
            <img
              className="footer-brand-logo"
              src={headerContent.logo}
              alt="Gujarat Gramin Bank"
            />
          </div>
        </Link>

        <div className="footer-social">
          <h3 className="footer-social-title">Connect with Us</h3>
          <div className="footer-social-links">
            {connectLinks.map((link) => {
              const Icon = socialIconMap[link.label]

              return (
                <a
                  className={`footer-social-link ${socialClassMap[link.label]}`}
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  <span className="footer-social-icon-wrap">
                    <Icon />
                  </span>
                  <span className="footer-social-text">{link.label}</span>
                  <FiArrowUpRight className="footer-social-arrow" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        {footerLinkGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link className="footer-link" to={item.to}>
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      className="footer-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <span>
          {`Copyright \u00A9 ${currentYear} Gujarat Gramin Bank. All rights reserved.`}{' '}
          <a
            className="footer-credit-link"
            href="https://core-solutions.in/"
            target="_blank"
            rel="noreferrer"
          >
            Website Designed & Developed by Core Innovative Solutions
          </a>
        </span>
        <span className="footer-bottom-note">
          Secure access to products, services, notices, and digital banking information.
        </span>
      </div>
    </footer>
  )
}

export default Footer
