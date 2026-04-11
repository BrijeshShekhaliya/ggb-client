import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

function HeroSlider({ slides, content }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
  }

  return (
    <section className="hero-slider" data-aos="fade-up">
      <div className="hero-stage">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            className={`hero-banner-image${activeIndex === index ? ' active' : ''}`}
            src={slide.image}
            alt={slide.alt}
          />
        ))}

        <div className="hero-image-overlay" aria-hidden="true"></div>

        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="hero-kicker">{content.subtitle}</span>
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-description">{content.description}</p>
            <div className="hero-actions">
              <Link className="button-primary" to={content.ctaTo}>
                {content.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="slider-controls">
          <div className="slider-dots" aria-label="Slide navigation">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={`slider-dot${activeIndex === index ? ' active' : ''}`}
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="slider-arrows">
            <button
              type="button"
              className="slider-arrow"
              aria-label="Previous slide"
              onClick={showPrevious}
            >
              <FiArrowLeft />
            </button>
            <button
              type="button"
              className="slider-arrow"
              aria-label="Next slide"
              onClick={showNext}
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
