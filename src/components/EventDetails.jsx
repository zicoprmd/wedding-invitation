import { useEffect, useRef, useState } from "react";
import { useWedding } from "../context/WeddingContext";
import InteractiveMap from "./InteractiveMap";
import SocialShare from "./SocialShare";
import "./EventDetails.scss";

const EventDetails = () => {
  const { config } = useWedding();
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <section className="event-details section" id="event" ref={sectionRef}>
        <div className="container">
          <div className="event-details__header reveal">
            <p className="event-details__subtitle">Save the Date</p>
            <h2 className="event-details__title">Wedding Events</h2>
            <div className="event-details__divider"></div>
          </div>

          <div className="event-details__grid">
            {config.events.map((event) => (
              <div key={event.id} className="event-details__card reveal delay-1">
                <div className="event-details__icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {event.id === 'akad' ? (
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
                    ) : (
                      <>
                        <path d="M12 3v18m6-6h-6M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="event-details__card-title">{event.name}</h3>
                <div className="event-details__info">
                  <p className="event-details__date">{formatDate(event.date)}</p>
                  <p className="event-details__time">{formatTime(event.time)} - {formatTime(event.endTime)}</p>
                  <p className="event-details__address">
                    {event.venue}
                    <br />
                    {event.address}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <InteractiveMap />
        </div>
      </section>

      <section className="social-share-section section" id="share">
        <div className="container">
          <div className="social-share-section__header reveal">
            <p className="social-share-section__subtitle">Bagikan</p>
            <h2 className="social-share-section__title">Share Invitation</h2>
            <div className="social-share-section__divider"></div>
          </div>
          <SocialShare />
        </div>
      </section>
    </>
  );
};

export default EventDetails;
