import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

function SectionPage(props) {
  const { title, items } = props
  const Icon = props.icon

  return (
    <section className="section-page">
      <div className="container">
        <div className="page-heading" data-aos="fade-up">
          <span className="page-heading-icon">
            <Icon />
          </span>
          <div>
            <h1 className="page-title">{title}</h1>
          </div>
        </div>

        <div className="section-resource-grid">
          {items.map((item, index) => (
            <article
              className="section-resource-item"
              key={item.label}
              data-aos={index % 2 === 0 ? 'fade-up' : 'zoom-in'}
            >
              {item.to ? (
                <Link className="section-resource-link" to={item.to}>
                  <span>{item.label}</span>
                  <FiArrowUpRight />
                </Link>
              ) : (
                <a
                  className="section-resource-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{item.label}</span>
                  <FiArrowUpRight />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionPage
