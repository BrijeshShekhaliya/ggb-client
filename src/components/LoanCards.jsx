import { FiArrowUpRight } from 'react-icons/fi'

const loanAccentMap = {
  'Housing Loan': 'loan-accent-housing',
  'Vehicle Loan': 'loan-accent-vehicle',
  'Agri Loan': 'loan-accent-agri',
  'Education Loan': 'loan-accent-education',
  'Business Loan': 'loan-accent-business',
  'Personal Loan': 'loan-accent-personal',
  'Financial Inclusion Loan': 'loan-accent-inclusion',
  'Loans under Government Schemes': 'loan-accent-government',
  'MSME Loans': 'loan-accent-msme',
}

const loanImageMap = {
  'Housing Loan':
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'Vehicle Loan':
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  'Agri Loan':
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
  'Education Loan':
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Business Loan':
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  'Personal Loan':
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'Financial Inclusion Loan':
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  'Loans under Government Schemes':
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'MSME Loans':
    'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80',
}

function LoanCards({ id, title, description, loans }) {
  return (
    <section className="loan-schemes-section" data-aos="fade-up" id={id}>
      <div className="container">
        <div className="loan-section-heading">
          <div>
            <span className="loan-chip">Products</span>
            <h2 className="loan-section-title">{title}</h2>
          </div>
          <p className="loan-section-description">{description}</p>
        </div>

        <div className="loan-scheme-grid">
          {loans.map((loan, index) => {
            const AccentClass = loanAccentMap[loan.title] || ''
            const SchemeIcon = loan.icon
            const schemeImage = loanImageMap[loan.title]

            return (
              <article
                className={`loan-scheme-card ${AccentClass}`}
                key={loan.title}
                data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
              >
                <div className="loan-scheme-media">
                  <img src={schemeImage} alt={loan.title} />
                  <span className="loan-scheme-kicker">Loan Scheme</span>
                </div>

                <div className="loan-scheme-body">
                  <div className="loan-scheme-head">
                    <span className="loan-scheme-badge">
                      <SchemeIcon />
                    </span>
                    <span className="loan-scheme-meta">Available through Gujarat Gramin Bank</span>
                  </div>

                  <h3>{loan.title}</h3>
                  <p>{loan.text}</p>

                  <a className="loan-scheme-button" href="#loan-page-top">
                    Explore Scheme
                    <FiArrowUpRight />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LoanCards
