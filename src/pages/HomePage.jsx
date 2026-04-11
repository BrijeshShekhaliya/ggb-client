import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiArrowUpRight,
  FiHome,
  FiMapPin,
  FiTruck,
  FiUsers,
} from 'react-icons/fi'
import { HiOutlineBuildingLibrary } from 'react-icons/hi2'
import { LuBadgeIndianRupee } from 'react-icons/lu'
import AnnouncementBar from '../components/AnnouncementBar'
import './home.css'
import {
  bankIntroduction,
  financialLiteracyItems,
  heroContent,
  homeAnnouncementItems,
  homeExploreLinks,
  homeQuickLinks,
  homeSlides,
} from '../data/siteContent'

const quickLinkMeta = {
  'List of Branches': {
    description: 'Find branch and office locations across Gujarat.',
    tag: 'Branch Network',
    action: 'View locations',
  },
  'Corporate Profile': {
    description: 'View the institutional profile of the bank.',
    tag: 'Institutional',
    action: 'Read profile',
  },
  'Annual Report': {
    description: 'Read the latest published annual report.',
    tag: 'Publication',
    action: 'Open report',
  },
}

const quickLinkAccent = {
  'List of Branches': 'accent-branch',
  'Corporate Profile': 'accent-profile',
  'Annual Report': 'accent-report',
}

const exploreVisuals = {
  Schemes: {
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    text: 'Products and schemes designed for diverse financial needs.',
    action: 'View schemes',
  },
  Events: {
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    text: 'See recent events and outreach activity from the bank.',
    action: 'See updates',
  },
  'Press Release': {
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    text: 'Access official communication and public announcements.',
    action: 'Open releases',
  },
  'Service Charges': {
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    text: 'Open published service charge documents and downloads.',
    action: 'Open document',
  },
}

const calculatorTabs = [
  {
    id: 'home',
    label: 'Home Loan',
    icon: FiHome,
    amountLabel: 'Loan Amount',
    amountMin: 100000,
    amountMax: 10000000,
    amountStep: 10000,
    tenureLabel: 'Tenure (Years)',
    tenureMin: 1,
    tenureMax: 30,
    tenureStep: 1,
    rateLabel: 'Interest Rate (% PA)',
    rateMin: 5,
    rateMax: 15,
    rateStep: 0.1,
    defaults: {
      amount: 2500000,
      tenure: 20,
      rate: 8.2,
    },
    accentClass: 'range-home',
  },
  {
    id: 'car',
    label: 'Car Loan',
    icon: FiTruck,
    amountLabel: 'Loan Amount',
    amountMin: 200000,
    amountMax: 3000000,
    amountStep: 10000,
    tenureLabel: 'Tenure (Years)',
    tenureMin: 1,
    tenureMax: 7,
    tenureStep: 1,
    rateLabel: 'Interest Rate (% PA)',
    rateMin: 5,
    rateMax: 18,
    rateStep: 0.1,
    defaults: {
      amount: 800000,
      tenure: 5,
      rate: 9.1,
    },
    accentClass: 'range-car',
  },
  {
    id: 'fd',
    label: 'FD',
    icon: LuBadgeIndianRupee,
    amountLabel: 'Investment Amount',
    amountMin: 10000,
    amountMax: 1000000,
    amountStep: 10000,
    tenureLabel: 'Tenure (Years)',
    tenureMin: 1,
    tenureMax: 10,
    tenureStep: 1,
    rateLabel: 'Interest Rate (% PA)',
    rateMin: 1,
    rateMax: 10,
    rateStep: 0.1,
    defaults: {
      amount: 300000,
      tenure: 5,
      rate: 6.8,
    },
    accentClass: 'range-fd',
  },
]

const literacyInsights = [
  {
    title: 'CKYC',
    icon: financialLiteracyItems[0].icon,
    accentClass: 'accent-ckyc',
    description:
      'Central KYC Registry helps streamline onboarding and reduce repeated paperwork.',
    points: [
      'Ask for your CKYC Identifier to open accounts faster.',
      'Your CKYC Identifier links to your KYC data.',
      'You may not need to submit KYC documents again at every institution.',
      'Learn more at ckycindia.in.',
    ],
  },
  {
    title: 'Economic awareness',
    icon: financialLiteracyItems[1].icon,
    accentClass: 'accent-economy',
    description:
      'Responsible borrowing starts with choosing the right and authorised lender.',
    points: [
      'Borrow only from banks and RBI-regulated finance companies.',
      'Authorised institutions follow proper lending practices.',
      'Regulated lenders provide grievance redressal mechanisms.',
      'Compare terms carefully before taking a loan.',
    ],
  },
  {
    title: 'Financial knowledge',
    icon: financialLiteracyItems[2].icon,
    accentClass: 'accent-knowledge',
    description:
      'Timely repayment habits help strengthen long-term financial credibility.',
    points: [
      'Repay EMIs and dues on time.',
      'Timely repayment builds a better credit history.',
      'Meeting commitments improves lender confidence.',
      'Good repayment discipline supports future borrowing needs.',
    ],
  },
  {
    title: 'Financial education',
    icon: financialLiteracyItems[3].icon,
    accentClass: 'accent-education',
    description:
      'TReDS helps MSMEs address delays in receivable payments.',
    points: [
      'MSME supplier payments should be made within 45 days after buyer acceptance.',
      'Invoices can be uploaded on an RBI-authorised TReDS platform.',
      'Both sellers and buyers benefit from a formal receivables process.',
      'TReDS registration is required to use the facility.',
    ],
  },
]

const serviceCounters = [
  {
    value: 745,
    label: 'Branches',
    detail: 'Customer service reach across the bank network.',
    icon: FiMapPin,
    accentClass: 'accent-branch',
  },
  {
    value: 34,
    label: 'Districts',
    detail: 'Presence across districts in the area of operation.',
    icon: HiOutlineBuildingLibrary,
    accentClass: 'accent-district',
  },
  {
    value: 1,
    label: 'Head Office',
    detail: 'Central head office location at Vadodara.',
    icon: FiHome,
    accentClass: 'accent-profile',
  },
  {
    value: 2025,
    label: 'Effective From',
    detail: 'Current bank structure effective from 1 May 2025.',
    icon: FiUsers,
    accentClass: 'accent-education',
  },
]

function CounterMetric({ value, label, detail, icon, accentClass }) {
  const metricRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)
  const Icon = icon

  useEffect(() => {
    if (!metricRef.current || hasStarted) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(metricRef.current)

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) {
      return undefined
    }

    let animationFrameId = 0
    let startTime = 0
    const duration = 1400

    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(value * easedProgress))

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(tick)
      }
    }

    animationFrameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [hasStarted, value])

  return (
    <article className="counter-card" ref={metricRef}>
      <span className={`counter-icon ${accentClass}`}>
        <Icon />
      </span>
      <div className="counter-copy">
        <strong>{displayValue.toLocaleString('en-IN')}</strong>
        <span>{label}</span>
        <p>{detail}</p>
      </div>
    </article>
  )
}

function HomePage() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [activeCalculator, setActiveCalculator] = useState('home')
  const [calculatorValues, setCalculatorValues] = useState(() =>
    calculatorTabs.reduce((accumulator, tab) => {
      accumulator[tab.id] = { ...tab.defaults }
      return accumulator
    }, {}),
  )

  const currentCalculator = useMemo(
    () => calculatorTabs.find((tab) => tab.id === activeCalculator),
    [activeCalculator],
  )

  const currentValues = calculatorValues[activeCalculator]

  const goToPreviousHeroSlide = () => {
    setActiveHeroSlide((currentIndex) =>
      currentIndex === 0 ? homeSlides.length - 1 : currentIndex - 1,
    )
  }

  const goToNextHeroSlide = () => {
    setActiveHeroSlide((currentIndex) => (currentIndex + 1) % homeSlides.length)
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((currentIndex) => (currentIndex + 1) % homeSlides.length)
    }, 5600)

    return () => window.clearInterval(intervalId)
  }, [])

  const calculatorResult = useMemo(() => {
    const principal = Number(currentValues.amount) || 0
    const years = Number(currentValues.tenure) || 0
    const annualRate = Number(currentValues.rate) || 0

    if (currentCalculator.id === 'fd') {
      const compoundsPerYear = 4
      const maturity =
        principal *
        (1 + annualRate / 100 / compoundsPerYear) **
          (compoundsPerYear * years)
      const interest = maturity - principal

      return {
        headlineLabel: 'Estimated Maturity Value',
        headlineValue: maturity,
        totalLabel: 'Maturity Amount',
        totalValue: maturity,
        interestLabel: 'Estimated Interest',
        interestValue: interest,
        principalLabel: 'Principal Amount',
        principalValue: principal,
      }
    }

    const months = years * 12
    const monthlyRate = annualRate / 12 / 100
    const emi =
      monthlyRate === 0
        ? principal / months
        : (principal *
            monthlyRate *
            (1 + monthlyRate) ** months) /
          ((1 + monthlyRate) ** months - 1)
    const total = emi * months
    const interest = total - principal

    return {
      headlineLabel: 'Estimated Monthly EMI',
      headlineValue: emi,
      totalLabel: 'Amount Payable',
      totalValue: total,
      interestLabel: 'Interest Amount',
      interestValue: interest,
      principalLabel: 'Principal Amount',
      principalValue: principal,
    }
  }, [currentCalculator.id, currentValues.amount, currentValues.rate, currentValues.tenure])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(value))

  const getRangeStyle = (currentValue, minimum, maximum, accentClass) => {
    const percentage = ((currentValue - minimum) / (maximum - minimum)) * 100
    const accentColorMap = {
      'range-home': '#1f5fbf',
      'range-car': '#2d8b57',
      'range-fd': '#0f766e',
    }

    const accentColor = accentColorMap[accentClass] || '#1a365d'

    return {
      background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor} ${percentage}%, #d7e0ea ${percentage}%, #d7e0ea 100%)`,
    }
  }

  const updateCalculatorValue = (field, nextValue) => {
    setCalculatorValues((currentState) => {
      const tabConfig = calculatorTabs.find((tab) => tab.id === activeCalculator)
      const numericValue = Number(nextValue)

      if (Number.isNaN(numericValue)) {
        return currentState
      }

      const bounds = {
        amount: [tabConfig.amountMin, tabConfig.amountMax],
        tenure: [tabConfig.tenureMin, tabConfig.tenureMax],
        rate: [tabConfig.rateMin, tabConfig.rateMax],
      }

      const [min, max] = bounds[field]
      const clampedValue = Math.min(Math.max(numericValue, min), max)

      return {
        ...currentState,
        [activeCalculator]: {
          ...currentState[activeCalculator],
          [field]: clampedValue,
        },
      }
    })
  }

  return (
    <div className="home-shell">
      <AnnouncementBar items={homeAnnouncementItems} />

      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <div
            className="hero-media-track"
            style={{
              width: `${homeSlides.length * 100}vw`,
              transform: `translateX(-${activeHeroSlide * 100}vw)`,
            }}
          >
            {homeSlides.map((slide, index) => (
              <div className="hero-slide" key={`${slide.alt}-${index}`}>
                <img className="hero-image" src={slide.image} alt="" />
              </div>
            ))}
          </div>
          <div className="hero-overlay" aria-hidden="true"></div>
        </div>

        <div className="home-container hero-layout">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">{heroContent.title}</h1>
            <p className="hero-description">{heroContent.description}</p>
            <div className="hero-actions">
              <Link className="hero-button" to={heroContent.ctaTo}>
                {heroContent.ctaLabel}
                <FiArrowRight />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <div className="home-container">
        <div className="hero-controls" aria-label="Hero slider controls">
          <div className="hero-indicators">
            {homeSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.alt}
                className={`hero-indicator${
                  activeHeroSlide === index ? ' active' : ''
                }`}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={activeHeroSlide === index}
                onClick={() => setActiveHeroSlide(index)}
              >
                <span className="hero-indicator-track">
                  <span
                    className={`hero-indicator-fill${
                      activeHeroSlide === index ? ' active' : ''
                    }`}
                    key={`${index}-${activeHeroSlide === index ? 'active' : 'idle'}`}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="hero-nav-buttons">
            <button
              type="button"
              className="hero-nav-button"
              aria-label="Previous slide"
              onClick={goToPreviousHeroSlide}
            >
              <FiArrowRight className="hero-nav-icon hero-nav-icon-prev" />
            </button>
            <button
              type="button"
              className="hero-nav-button"
              aria-label="Next slide"
              onClick={goToNextHeroSlide}
            >
              <FiArrowRight className="hero-nav-icon" />
            </button>
          </div>
        </div>
      </div>

      <section className="section-block fade-in-up delay-2">
        <div className="home-container">
          <div className="section-header">
            <div>
              <span className="section-label">Quick Access</span>
              <h2 className="section-title">Quick Links</h2>
            </div>
          </div>

          <div className="grid-container quick-links-grid">
            {homeQuickLinks.map((link, index) =>
              link.to ? (
                <Link
                  className="modern-card quick-link-card"
                  key={link.title}
                  to={link.to}
                  data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
                >
                  <div className="modern-card-head">
                    <span
                      className={`modern-card-icon ${quickLinkAccent[link.title]}`}
                    >
                      <link.icon />
                    </span>
                    <span className="modern-card-tag">
                      {quickLinkMeta[link.title].tag}
                    </span>
                    <FiArrowUpRight className="modern-card-arrow" />
                  </div>
                  <h3>{link.title}</h3>
                  <p>{quickLinkMeta[link.title].description}</p>
                  <div className="modern-card-footer">
                    <span className="modern-card-footer-text">
                      {quickLinkMeta[link.title].action}
                    </span>
                    <span className="modern-card-linkpill">
                      Open Link
                      <FiArrowUpRight />
                    </span>
                  </div>
                </Link>
              ) : (
                <a
                  className="modern-card quick-link-card"
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
                >
                  <div className="modern-card-head">
                    <span
                      className={`modern-card-icon ${quickLinkAccent[link.title]}`}
                    >
                      <link.icon />
                    </span>
                    <span className="modern-card-tag">
                      {quickLinkMeta[link.title].tag}
                    </span>
                    <FiArrowUpRight className="modern-card-arrow" />
                  </div>
                  <h3>{link.title}</h3>
                  <p>{quickLinkMeta[link.title].description}</p>
                  <div className="modern-card-footer">
                    <span className="modern-card-footer-text">
                      {quickLinkMeta[link.title].action}
                    </span>
                    <span className="modern-card-linkpill">
                      Open Link
                      <FiArrowUpRight />
                    </span>
                  </div>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section-block fade-in-up delay-3">
        <div className="home-container">
          <div className="section-header">
            <div>
              <span className="section-label">Discover</span>
              <h2 className="section-title">Explore More</h2>
            </div>
          </div>

          <div className="grid-container explore-grid">
            {homeExploreLinks.map((item, index) => {
              const visual = exploreVisuals[item.title]

              if (item.to) {
                return (
                  <Link
                    className="explore-card"
                    key={item.title}
                    to={item.to}
                    data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
                  >
                    <div className="explore-card-image-wrap">
                      <img src={visual.image} alt={item.title} />
                    </div>
                    <div className="explore-card-body">
                      <h3>{item.title}</h3>
                      <p>{visual.text}</p>
                      <span className="explore-card-cta">
                        {visual.action}
                        <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                )
              }

              return (
                <a
                  className="explore-card"
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
                >
                  <div className="explore-card-image-wrap">
                    <img src={visual.image} alt={item.title} />
                  </div>
                  <div className="explore-card-body">
                    <h3>{item.title}</h3>
                    <p>{visual.text}</p>
                    <span className="explore-card-cta">
                      {visual.action}
                      <FiArrowRight />
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-block fade-in-up delay-4">
        <div className="home-container info-layout">
          <article className="about-showcase" data-aos="fade-up">
            <div className="about-showcase-visual">
              <div className="about-showcase-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                  alt="Bank customers in a professional meeting"
                />
              </div>
              <div className="about-showcase-logo-badge">
                <img src="/LOGO_them.png" alt="Gujarat Gramin Bank logo" />
              </div>
            </div>

            <div className="about-showcase-content">
              <span className="section-label">About</span>
              <h2 className="section-title">Gujarat Gramin Bank</h2>
              <p className="info-feature-text">{bankIntroduction.text}</p>
              <Link className="text-link" to={bankIntroduction.readMore}>
                Read More
                <FiArrowRight />
              </Link>
            </div>
          </article>

          <section className="literacy-section" data-aos="fade-up">
            <div className="section-header literacy-section-header">
              <div>
                <span className="section-label">Awareness</span>
                <h2 className="section-title literacy-title">Financial Literacy</h2>
              </div>
              <p className="literacy-intro">
                Important financial guidance on KYC, responsible borrowing,
                repayment discipline and MSME receivables awareness.
              </p>
            </div>

            <div className="literacy-list">
              {literacyInsights.map((item, index) => (
                <article
                  className={`literacy-story${index % 2 === 1 ? ' reverse' : ''}`}
                  key={item.title}
                  data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
                >
                  <div className="literacy-card-media">
                    <img
                      src={financialLiteracyItems[index].image}
                      alt={item.title}
                    />
                  </div>

                  <div className="literacy-card-content">
                    <div className="literacy-card-head">
                      <span className={`literacy-card-icon ${item.accentClass}`}>
                        <item.icon />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>

                    <ul className="literacy-points">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="section-block fade-in-up delay-4">
        <div className="home-container calculator-section">
          <div className="section-header calculator-header">
            <div>
              <span className="section-label">Calculator</span>
              <h2 className="section-title">Financial Calculator</h2>
            </div>
            <p className="calculator-intro">
              Switch between products and estimate your EMI or maturity value in
              real time.
            </p>
          </div>

          <div className="calculator-widget" data-aos="fade-up">
            <div className="calculator-tabs" role="tablist" aria-label="Calculator tabs">
              {calculatorTabs.map((tab) => {
                const Icon = tab.icon

                return (
                  <button
                    type="button"
                    key={tab.id}
                    role="tab"
                    aria-selected={activeCalculator === tab.id}
                    className={`calculator-tab${
                      activeCalculator === tab.id ? ' active' : ''
                    }`}
                    onClick={() => setActiveCalculator(tab.id)}
                  >
                    <Icon />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="calculator-body">
              <div className="calculator-inputs">
                <div className="calculator-field">
                  <div className="calculator-field-header">
                    <label>{currentCalculator.amountLabel}</label>
                    <div
                      id={`${activeCalculator}-amount`}
                      className="calculator-value-display"
                      aria-live="polite"
                    >
                      {formatCurrency(currentValues.amount)}
                    </div>
                  </div>
                  <input
                    className={`calculator-range ${currentCalculator.accentClass}`}
                    type="range"
                    min={currentCalculator.amountMin}
                    max={currentCalculator.amountMax}
                    step={currentCalculator.amountStep}
                    value={currentValues.amount}
                    style={getRangeStyle(
                      currentValues.amount,
                      currentCalculator.amountMin,
                      currentCalculator.amountMax,
                      currentCalculator.accentClass,
                    )}
                    onChange={(event) =>
                      updateCalculatorValue('amount', event.target.value)
                    }
                  />
                  <div className="calculator-range-meta">
                    <span>{formatCurrency(currentCalculator.amountMin)}</span>
                    <span>{formatCurrency(currentCalculator.amountMax)}</span>
                  </div>
                </div>

                <div className="calculator-field">
                  <div className="calculator-field-header">
                    <label>{currentCalculator.tenureLabel}</label>
                    <div className="calculator-value-display" aria-live="polite">
                      {`${currentValues.tenure} ${
                        currentValues.tenure === 1 ? 'year' : 'years'
                      }`}
                    </div>
                  </div>
                  <input
                    className={`calculator-range ${currentCalculator.accentClass}`}
                    type="range"
                    min={currentCalculator.tenureMin}
                    max={currentCalculator.tenureMax}
                    step={currentCalculator.tenureStep}
                    value={currentValues.tenure}
                    style={getRangeStyle(
                      currentValues.tenure,
                      currentCalculator.tenureMin,
                      currentCalculator.tenureMax,
                      currentCalculator.accentClass,
                    )}
                    onChange={(event) =>
                      updateCalculatorValue('tenure', event.target.value)
                    }
                  />
                  <div className="calculator-range-meta">
                    <span>{currentCalculator.tenureMin} year</span>
                    <span>{currentCalculator.tenureMax} years</span>
                  </div>
                </div>

                <div className="calculator-field">
                  <div className="calculator-field-header">
                    <label>{currentCalculator.rateLabel}</label>
                    <div className="calculator-value-display" aria-live="polite">
                      {`${currentValues.rate}%`}
                    </div>
                  </div>
                  <input
                    className={`calculator-range ${currentCalculator.accentClass}`}
                    type="range"
                    min={currentCalculator.rateMin}
                    max={currentCalculator.rateMax}
                    step={currentCalculator.rateStep}
                    value={currentValues.rate}
                    style={getRangeStyle(
                      currentValues.rate,
                      currentCalculator.rateMin,
                      currentCalculator.rateMax,
                      currentCalculator.accentClass,
                    )}
                    onChange={(event) =>
                      updateCalculatorValue('rate', event.target.value)
                    }
                  />
                  <div className="calculator-range-meta">
                    <span>{currentCalculator.rateMin}%</span>
                    <span>{currentCalculator.rateMax}%</span>
                  </div>
                </div>
              </div>

              <aside className="calculator-output">
                <div className="calculator-highlight">
                  <span>{calculatorResult.headlineLabel}</span>
                  <strong>{formatCurrency(calculatorResult.headlineValue)}</strong>
                </div>

                <div className="calculator-summary">
                  <div className="calculator-summary-row">
                    <span>{calculatorResult.totalLabel}</span>
                    <strong>{formatCurrency(calculatorResult.totalValue)}</strong>
                  </div>
                  <div className="calculator-summary-row">
                    <span>{calculatorResult.interestLabel}</span>
                    <strong>{formatCurrency(calculatorResult.interestValue)}</strong>
                  </div>
                  <div className="calculator-summary-row">
                    <span>{calculatorResult.principalLabel}</span>
                    <strong>{formatCurrency(calculatorResult.principalValue)}</strong>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block fade-in-up delay-4">
        <div className="home-container counter-section">
          <div className="section-header counter-header">
            <div>
              <span className="section-label">At A Glance</span>
              <h2 className="section-title">Gujarat Gramin Bank Reach</h2>
            </div>
            <p className="counter-intro">
              A quick look at the bank’s operational presence and current
              institutional footprint.
            </p>
          </div>

          <div className="counter-grid">
            {serviceCounters.map((item, index) => (
              <div
                key={item.label}
                data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
              >
                <CounterMetric {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
