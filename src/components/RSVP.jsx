import { useEffect, useRef, useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import './RSVP.scss';

const RSVP = () => {
  const { config } = useWedding();
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendance: '',
    guests: '1',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppLink = () => {
    const waNumber = config.rsvp.whatsappNumber;
    const attendanceText = formData.attendance === 'yes' ? 'Ya, akan hadir' : 'Maaf, tidak bisa hadir';
    const guestText = formData.guests === '1' ? '1 orang' : `${formData.guests} orang`;

    let message = `*Konfirmasi Kehadiran - ${config.couple.groomName} & ${config.couple.brideName}*\n\n`;
    message += `*Nama:* ${formData.name || '-'}\n`;
    message += `*No. Telepon:* ${formData.phone || '-'}\n`;
    message += `*Kehadiran:* ${attendanceText}\n`;
    message += `*Jumlah Tamu:* ${guestText}\n`;
    if (formData.message) {
      message += `*Pesan:* ${formData.message}`;
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${waNumber}?text=${encodedMessage}`;
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.attendance) {
      alert('Mohon isi nama dan konfirmasi kehadiran');
      return;
    }
    window.open(getWhatsAppLink(), '_blank');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="rsvp section" id="rsvp" ref={sectionRef}>
        <div className="container">
          <div className="rsvp__form">
            <div className="rsvp__success">
              <div className="rsvp__success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="rsvp__success-title">Terima Kasih!</h3>
              <p className="rsvp__success-message">
                Konfirmasi Anda telah terkirim via WhatsApp.<br />
                Sampai jumpa di hari bahagia kami!
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rsvp__wa-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Buka WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp section" id="rsvp" ref={sectionRef}>
      <div className="container">
        <div className="rsvp__header reveal">
          <p className="rsvp__subtitle">Please Respond</p>
          <h2 className="rsvp__title">RSVP</h2>
          <div className="rsvp__divider"></div>
        </div>

        <div className="rsvp__form reveal">
          <div className="rsvp__row">
            <div className="rsvp__field">
              <label className="rsvp__label">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                className="rsvp__input"
                placeholder="Nama Anda"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="rsvp__field">
              <label className="rsvp__label">No. WhatsApp</label>
              <input
                type="tel"
                name="phone"
                className="rsvp__input"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rsvp__row">
            <div className="rsvp__field">
              <label className="rsvp__label">Jumlah Tamu</label>
              <select
                name="guests"
                className="rsvp__select"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
              </select>
            </div>
            <div className="rsvp__field">
              <label className="rsvp__label">Kehadiran</label>
              <select
                name="attendance"
                className="rsvp__select"
                value={formData.attendance}
                onChange={handleChange}
                required
              >
                <option value="">Pilih</option>
                <option value="yes">Ya, Saya Akan Hadir</option>
                <option value="no">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>
          </div>

          <div className="rsvp__field">
            <label className="rsvp__label">Pesan untuk Pengantin</label>
            <textarea
              name="message"
              className="rsvp__textarea"
              placeholder="Tulis ucapan atau doa untuk kami..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="rsvp__wa-submit"
            onClick={handleWhatsAppSubmit}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Kirim via WhatsApp
          </button>

          <p className="rsvp__note">
            Klik tombol di atas untuk mengirim konfirmasi langsung ke WhatsApp pengantin
          </p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
