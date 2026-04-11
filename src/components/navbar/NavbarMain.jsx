import { NavLink, useLocation } from 'react-router-dom'
import {
  FiAward,
  FiBell,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiGift,
  FiGlobe,
  FiHome,
  FiMapPin,
  FiMessageSquare,
  FiPhoneCall,
  FiPercent,
  FiShield,
  FiSmartphone,
  FiTarget,
  FiUser,
  FiUsers,
} from 'react-icons/fi'
import { BiQrScan } from 'react-icons/bi'
import { LuArrowRightLeft, LuCreditCard } from 'react-icons/lu'
import {
  MdFingerprint,
  MdOutlineCall,
  MdOutlineLaptopMac,
  MdOutlineSms,
} from 'react-icons/md'
import { RiAtLine, RiExchangeFundsLine } from 'react-icons/ri'
import { TbArrowsTransferUp, TbShieldCheck, TbShieldLock } from 'react-icons/tb'

const dropdownIconRules = [
  { keywords: ['history'], icon: FiClock },
  { keywords: ['mission', 'vision'], icon: FiTarget },
  { keywords: ['board'], icon: FiUsers },
  { keywords: ['chairman'], icon: FiUser },
  { keywords: ['management'], icon: FiUsers },
  { keywords: ['cvo', 'vigilance'], icon: FiShield },
  { keywords: ['office', 'branch', 'locate'], icon: FiMapPin },
  { keywords: ['award'], icon: FiAward },
  { keywords: ['loan'], icon: FiHome },
  { keywords: ['deposit'], icon: FiCreditCard },
  { keywords: ['interest', 'rate', 'charges'], icon: FiPercent },
  { keywords: ['scheme'], icon: FiFileText },
  { keywords: ['forms', 'form'], icon: FiDownload },
  { keywords: ['aadhaar'], icon: MdFingerprint },
  { keywords: ['positive pay'], icon: TbShieldCheck },
  { keywords: ['ggb connect'], icon: FiSmartphone },
  { keywords: ['imps'], icon: LuArrowRightLeft },
  { keywords: ['sms', 'alert'], icon: MdOutlineSms },
  { keywords: ['rupay', 'card'], icon: LuCreditCard },
  { keywords: ['offer'], icon: FiGift },
  { keywords: ['miss call'], icon: MdOutlineCall },
  { keywords: ['micro atm'], icon: RiAtLine },
  { keywords: ['atm'], icon: RiAtLine },
  { keywords: ['e-banking'], icon: MdOutlineLaptopMac },
  { keywords: ['nach'], icon: TbArrowsTransferUp },
  { keywords: ['neft', 'rtgs'], icon: RiExchangeFundsLine },
  { keywords: ['aeps'], icon: MdFingerprint },
  { keywords: ['upi', 'bhim'], icon: BiQrScan },
  { keywords: ['security', 'safety'], icon: TbShieldLock },
  { keywords: ['report', 'publication'], icon: FiFileText },
  { keywords: ['tender', 'notice', 'announcement', 'recruitment', 'auction'], icon: FiBell },
  { keywords: ['complaint', 'suggestion'], icon: FiMessageSquare },
  { keywords: ['privacy', 'policy'], icon: FiShield },
  { keywords: ['contact'], icon: FiMapPin },
  { keywords: ['government'], icon: FiGlobe },
]

function getDropdownIcon(label, fallbackIcon) {
  const normalisedLabel = label.toLowerCase()
  const matchedRule = dropdownIconRules.find((rule) =>
    rule.keywords.some((keyword) => normalisedLabel.includes(keyword)),
  )

  return matchedRule?.icon || fallbackIcon
}

function getDropdownTone(label) {
  const normalisedLabel = label.toLowerCase()

  if (normalisedLabel.includes('history') || normalisedLabel.includes('report')) {
    return 'tone-slate'
  }

  if (
    normalisedLabel.includes('loan') ||
    normalisedLabel.includes('deposit') ||
    normalisedLabel.includes('card')
  ) {
    return 'tone-blue'
  }

  if (
    normalisedLabel.includes('upi') ||
    normalisedLabel.includes('bhim') ||
    normalisedLabel.includes('sms') ||
    normalisedLabel.includes('imps') ||
    normalisedLabel.includes('ggb connect')
  ) {
    return 'tone-cyan'
  }

  if (
    normalisedLabel.includes('aadhaar') ||
    normalisedLabel.includes('security') ||
    normalisedLabel.includes('safety') ||
    normalisedLabel.includes('positive pay') ||
    normalisedLabel.includes('aeps')
  ) {
    return 'tone-teal'
  }

  if (
    normalisedLabel.includes('offer') ||
    normalisedLabel.includes('award') ||
    normalisedLabel.includes('publication') ||
    normalisedLabel.includes('form')
  ) {
    return 'tone-amber'
  }

  if (
    normalisedLabel.includes('board') ||
    normalisedLabel.includes('management') ||
    normalisedLabel.includes('chairman') ||
    normalisedLabel.includes('cvo')
  ) {
    return 'tone-violet'
  }

  return 'tone-green'
}

function NavbarMain({
  actions,
  items,
  ctaItem,
  mobileOpen,
  openGroup,
  desktopGroup,
  onToggleMobile,
  onToggleGroup,
  onOpenDesktopGroup,
  onCloseDesktopGroup,
  onCloseMenus,
}) {
  const location = useLocation()

  const handleGroupTrigger = (label) => {
    if (window.innerWidth <= 1220) {
      onToggleGroup(label)
    }
  }

  return (
    <div className="navbar-main">
      <button
        type="button"
        className={`navbar-mobile-overlay${mobileOpen ? ' is-open' : ''}`}
        aria-label="Close navigation"
        onClick={onCloseMenus}
      />

      <button
        type="button"
        className={`navbar-mobile-toggle${mobileOpen ? ' is-open' : ''}`}
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation"
        onClick={onToggleMobile}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        className={`navbar-main-nav${mobileOpen ? ' is-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="navbar-mobile-header">
          <span className="navbar-mobile-title">Menu</span>
        </div>

        <div className="navbar-mobile-actions">
          {actions.map((action) => {
            const ActionIcon = action.icon

            return (
              <a
                className="navbar-mobile-action"
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                onClick={onCloseMenus}
              >
                <span className="navbar-mobile-action-icon">
                  <ActionIcon />
                </span>
                <span>{action.label}</span>
                <FiChevronRight className="navbar-mobile-action-arrow" />
              </a>
            )
          })}
        </div>

        <div className="navbar-main-links">
          {items.map((item) => {
            const Icon = item.icon
            const hasItems = Boolean(item.items?.length)
            const childRouteMatch = item.items?.some(
              (subItem) => subItem.to && location.pathname === subItem.to,
            )
            const isActive = location.pathname === item.to || childRouteMatch
            const isGroupOpen =
              openGroup === item.label || desktopGroup === item.label
            const dropdownColumns =
              item.items && item.items.length > 10
                ? 'columns-3'
                : item.items && item.items.length > 6
                  ? 'columns-2'
                  : 'columns-1'

            return (
              <div
                className={`navbar-main-item${isGroupOpen ? ' is-open' : ''}`}
                key={item.label}
                onMouseEnter={hasItems ? () => onOpenDesktopGroup(item.label) : undefined}
                onMouseLeave={hasItems ? onCloseDesktopGroup : undefined}
              >
                <div className="navbar-main-row">
                  {hasItems ? (
                    <button
                      type="button"
                      className={`navbar-main-link${isActive ? ' active' : ''}`}
                      aria-expanded={isGroupOpen}
                      onClick={() => handleGroupTrigger(item.label)}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown className="navbar-main-chevron" />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive: routeActive }) =>
                        `navbar-main-link${routeActive ? ' active' : ''}`
                      }
                      onClick={onCloseMenus}
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  )}

                  {hasItems ? (
                    <button
                      type="button"
                      className="navbar-main-expander"
                      aria-expanded={isGroupOpen}
                      aria-label={`Toggle ${item.label}`}
                      onClick={() => handleGroupTrigger(item.label)}
                    >
                      <FiChevronDown />
                    </button>
                  ) : null}
                </div>

                {hasItems ? (
                  <div className={`navbar-dropdown ${dropdownColumns}`}>
                    {item.items.map((subItem) => {
                      const SubIcon = getDropdownIcon(subItem.label, Icon)

                      return subItem.to ? (
                        <NavLink
                          className="navbar-dropdown-link"
                          key={subItem.label}
                          to={subItem.to}
                          onClick={onCloseMenus}
                        >
                          <span className="navbar-dropdown-label">
                            {subItem.label}
                          </span>
                          <span
                            className={`navbar-dropdown-icon ${getDropdownTone(
                              subItem.label,
                            )}`}
                          >
                            <SubIcon />
                          </span>
                          <FiChevronRight className="navbar-dropdown-arrow" />
                        </NavLink>
                      ) : (
                        <a
                          className="navbar-dropdown-link"
                          key={subItem.label}
                          href={subItem.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={onCloseMenus}
                        >
                          <span className="navbar-dropdown-label">
                            {subItem.label}
                          </span>
                          <span
                            className={`navbar-dropdown-icon ${getDropdownTone(
                              subItem.label,
                            )}`}
                          >
                            <SubIcon />
                          </span>
                          <FiChevronRight className="navbar-dropdown-arrow" />
                        </a>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {ctaItem ? (
          <NavLink
            to={ctaItem.to}
            className={({ isActive }) =>
              `navbar-main-cta${isActive ? ' active' : ''}`
            }
            onClick={onCloseMenus}
          >
            {ctaItem.label}
          </NavLink>
        ) : null}
      </nav>
    </div>
  )
}

export default NavbarMain
