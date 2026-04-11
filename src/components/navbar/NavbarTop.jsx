import { FiArrowUpRight } from 'react-icons/fi'

function NavbarTop({ actions }) {
  return (
    <div className="navbar-top">
      <div className="navbar-top-actions">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <a
              className="navbar-top-button"
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="navbar-top-button-icon" />
              <span>{action.label}</span>
              <FiArrowUpRight className="navbar-top-button-arrow" />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default NavbarTop
