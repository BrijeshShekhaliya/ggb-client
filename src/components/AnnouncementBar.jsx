import { FiBell } from 'react-icons/fi'

function AnnouncementBar({ items }) {
  const marqueeItems = [...items, ...items]

  return (
    <section className="announcement-bar" aria-label="Announcements">
      <div className="container announcement-inner">
        <div className="announcement-label">
          <FiBell />
          <span>Announcements</span>
        </div>

        <div className="announcement-window">
          <div className="announcement-track">
            {marqueeItems.map((item, index) => (
              <div className="announcement-item" key={`${item.text}-${index}`}>
                <span className="announcement-dot" aria-hidden="true"></span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnnouncementBar
