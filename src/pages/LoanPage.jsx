import { FiArrowDownRight, FiCheckCircle } from 'react-icons/fi'
import LoanCards from '../components/LoanCards'
import { loanItems } from '../data/siteContent'
import './loan.css'

function LoanPage() {
  const spotlightLoans = loanItems.slice(0, 4)

  return (
    <div className="loan-page" id="loan-page-top">
      <section className="loan-hero" data-aos="fade-up">
        <div className="container">
          <div className="loan-hero-shell">
            <div className="loan-hero-copy">
              <span className="loan-chip">Loan Schemes</span>
              <h1 className="loan-title">Loan Schemes</h1>
              <p className="loan-description">
                GGB Loans - A wide range of solution for all of your financial
                needs. GGB offers a wide range of retail loans to meet your
                diverse needs. Whether the need is for a new house, child&apos;s
                education, purchase of a new car or home appliances, our unique
                and need specific loans will enable you to convert your dreams to
                realities.
              </p>

              <div className="loan-hero-points">
                <div className="loan-hero-point">
                  <FiCheckCircle />
                  <span>Retail and personal borrowing solutions</span>
                </div>
                <div className="loan-hero-point">
                  <FiCheckCircle />
                  <span>Support for agriculture, MSME and education needs</span>
                </div>
              </div>

              <a className="loan-hero-link" href="#loan-schemes-grid">
                View Schemes
                <FiArrowDownRight />
              </a>
            </div>

            <div className="loan-hero-media" aria-hidden="true">
              <div className="loan-hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
                  alt=""
                />
                <div className="loan-hero-image-overlay">
                  <span className="loan-hero-image-tag">Retail Lending</span>
                  <p>Designed for housing, vehicle, education and enterprise goals.</p>
                </div>
              </div>

              <div className="loan-hero-shortcuts">
                {spotlightLoans.map((loan) => {
                  const Icon = loan.icon

                  return (
                    <div
                      className={`loan-hero-shortcut ${
                        loan.title === 'Housing Loan'
                          ? 'loan-accent-housing'
                          : loan.title === 'Vehicle Loan'
                            ? 'loan-accent-vehicle'
                            : loan.title === 'Agri Loan'
                              ? 'loan-accent-agri'
                              : 'loan-accent-education'
                      }`}
                      key={loan.title}
                    >
                      <span className="loan-hero-shortcut-icon">
                        <Icon />
                      </span>
                      <span>{loan.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoanCards
        id="loan-schemes-grid"
        title="Loan Schemes"
        description="GGB Loans - A wide range of solution for all of your financial needs"
        loans={loanItems}
      />
    </div>
  )
}

export default LoanPage
