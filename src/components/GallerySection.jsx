function GallerySection({ title, items }) {
  return (
    <section className="section-shell" data-aos="fade-up">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <article
              className="gallery-card"
              key={item.title}
              data-aos={index % 2 === 0 ? 'zoom-in' : 'fade-up'}
            >
              <div className="gallery-image-wrap">
                <img className="gallery-image" src={item.image} alt={item.title} />
              </div>
              <div className="gallery-body">
                <span className="gallery-icon">
                  <item.icon />
                </span>
                <h3 className="gallery-title">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
