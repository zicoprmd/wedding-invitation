import { useState, useEffect } from 'react';
import { loadConfig, saveConfig, resetConfig, defaultConfig } from '../config/weddingConfig';
import { useWedding } from '../context/WeddingContext';
import './AdminPanel.scss';

const AdminPanel = () => {
  const { isAdminOpen, setIsAdminOpen, refreshConfig } = useWedding();
  const [config, setConfig] = useState(loadConfig());
  const [activeTab, setActiveTab] = useState('couple');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setConfig(loadConfig());
  }, [isAdminOpen]);

  const onClose = () => setIsAdminOpen(false);

  useEffect(() => {
    if (isAdminOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdminOpen]);

  const handleChange = (path, value) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      if (Array.isArray(current[keys[i]])) {
        current[keys[i]] = [...current[keys[i]]];
      } else {
        current[keys[i]] = { ...current[keys[i]] };
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    clearError(path);
  };

  const handleArrayChange = (path, index, field, value) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]][index] = {
      ...current[keys[keys.length - 1]][index],
      [field]: value,
    };

    setConfig(newConfig);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!config.couple.groomName) newErrors['couple.groomName'] = 'Nama pengantin pria required';
    if (!config.couple.brideName) newErrors['couple.brideName'] = 'Nama pengantin wanita required';
    if (!config.couple.weddingDate) newErrors['couple.weddingDate'] = 'Tanggal pernikahan required';

    config.events.forEach((event, index) => {
      if (!event.name) newErrors[`events.${index}.name`] = 'Nama acara required';
      if (!event.venue) newErrors[`events.${index}.venue`] = 'Venue required';
      if (!event.address) newErrors[`events.${index}.address`] = 'Alamat required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setIsSaving(true);
    const success = saveConfig(config);

    setTimeout(() => {
      setIsSaving(false);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 1500);
      }
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm('Reset semua ke default? Data yang sudah diedit akan hilang.')) {
      resetConfig();
      setConfig(defaultConfig);
      window.location.reload();
    }
  };

  const clearError = (path) => {
    if (errors[path]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[path];
        return newErrors;
      });
    }
  };

  if (!isAdminOpen) return null;

  const tabs = [
    { id: 'couple', label: 'Couple', icon: '♥' },
    { id: 'parents', label: 'Parents', icon: '👨‍👩‍👧' },
    { id: 'timeline', label: 'Timeline', icon: '💕' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'rsvp', label: 'RSVP', icon: '📱' },
    { id: 'gallery', label: 'Gallery', icon: '📷' },
    { id: 'gift', label: 'Gift', icon: '🎁' },
  ];

  return (
    <div className="admin-panel-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-panel__header">
          <h2 className="admin-panel__title">
            <span className="admin-panel__title-icon">⚙️</span>
            Wedding Admin Panel
          </h2>
          <button className="admin-panel__close" onClick={onClose}>×</button>
        </div>

        <div className="admin-panel__body">
          <div className="admin-panel__sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`admin-panel__tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="admin-panel__tab-icon">{tab.icon}</span>
                <span className="admin-panel__tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="admin-panel__content">
            {showSuccess && (
              <div className="admin-panel__success">
                <span>✓</span> Data saved! Reloading...
              </div>
            )}

            {activeTab === 'couple' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Couple Information</h3>

                <div className="admin-panel__field">
                  <label>Nama Pengantin Pria (Short)</label>
                  <input
                    type="text"
                    value={config.couple.groomName}
                    onChange={(e) => handleChange('couple.groomName', e.target.value)}
                    placeholder="Andrew"
                  />
                  {errors['couple.groomName'] && <span className="admin-panel__error">{errors['couple.groomName']}</span>}
                </div>

                <div className="admin-panel__field">
                  <label>Nama Lengkap Pengantin Pria</label>
                  <input
                    type="text"
                    value={config.couple.groomFullName}
                    onChange={(e) => handleChange('couple.groomFullName', e.target.value)}
                    placeholder="Andrew Wijaya"
                  />
                </div>

                <div className="admin-panel__field">
                  <label>Nama Pengantin Wanita (Short)</label>
                  <input
                    type="text"
                    value={config.couple.brideName}
                    onChange={(e) => handleChange('couple.brideName', e.target.value)}
                    placeholder="Sarah"
                  />
                  {errors['couple.brideName'] && <span className="admin-panel__error">{errors['couple.brideName']}</span>}
                </div>

                <div className="admin-panel__field">
                  <label>Nama Lengkap Pengantin Wanita</label>
                  <input
                    type="text"
                    value={config.couple.brideFullName}
                    onChange={(e) => handleChange('couple.brideFullName', e.target.value)}
                    placeholder="Sarah Putri"
                  />
                </div>

                <div className="admin-panel__field">
                  <label>Tanggal Pernikahan</label>
                  <input
                    type="date"
                    value={config.couple.weddingDate}
                    onChange={(e) => handleChange('couple.weddingDate', e.target.value)}
                  />
                  {errors['couple.weddingDate'] && <span className="admin-panel__error">{errors['couple.weddingDate']}</span>}
                </div>

                <div className="admin-panel__field">
                  <label>Save The Date Text</label>
                  <input
                    type="text"
                    value={config.couple.saveTheDate}
                    onChange={(e) => handleChange('couple.saveTheDate', e.target.value)}
                    placeholder="Sabtu, 25 Desember 2026"
                  />
                </div>

                <div className="admin-panel__field">
                  <label>Foto Pria (URL)</label>
                  <input
                    type="text"
                    value={config.couple.groomPhoto}
                    onChange={(e) => handleChange('couple.groomPhoto', e.target.value)}
                    placeholder="https://example.com/foto-pria.jpg"
                  />
                  {config.couple.groomPhoto && (
                    <div className="admin-panel__preview">
                      <img src={config.couple.groomPhoto} alt="Groom" />
                    </div>
                  )}
                </div>

                <div className="admin-panel__field">
                  <label>Foto Wanita (URL)</label>
                  <input
                    type="text"
                    value={config.couple.bridePhoto}
                    onChange={(e) => handleChange('couple.bridePhoto', e.target.value)}
                    placeholder="https://example.com/foto-wanita.jpg"
                  />
                  {config.couple.bridePhoto && (
                    <div className="admin-panel__preview">
                      <img src={config.couple.bridePhoto} alt="Bride" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'parents' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Parents Information</h3>
                <p className="admin-panel__hint">Edit nama orang tua kedua pengantin</p>

                <div className="admin-panel__card">
                  <h4 className="admin-panel__card-title">Orang Tua Pria</h4>

                  <div className="admin-panel__field">
                    <label>Nama Ayah</label>
                    <input
                      type="text"
                      value={config.parents.groom.father}
                      onChange={(e) => handleChange('parents.groom.father', e.target.value)}
                      placeholder="Mr. Robert"
                    />
                  </div>

                  <div className="admin-panel__field">
                    <label>Nama Ibu</label>
                    <input
                      type="text"
                      value={config.parents.groom.mother}
                      onChange={(e) => handleChange('parents.groom.mother', e.target.value)}
                      placeholder="Mrs. Emily"
                    />
                  </div>
                </div>

                <div className="admin-panel__card">
                  <h4 className="admin-panel__card-title">Orang Tua Wanita</h4>

                  <div className="admin-panel__field">
                    <label>Nama Ayah</label>
                    <input
                      type="text"
                      value={config.parents.bride.father}
                      onChange={(e) => handleChange('parents.bride.father', e.target.value)}
                      placeholder="Mr. James"
                    />
                  </div>

                  <div className="admin-panel__field">
                    <label>Nama Ibu</label>
                    <input
                      type="text"
                      value={config.parents.bride.mother}
                      onChange={(e) => handleChange('parents.bride.mother', e.target.value)}
                      placeholder="Mrs. Linda"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Events</h3>
                <p className="admin-panel__hint">Edit detail acara pernikahan</p>

                {config.events.map((event, index) => (
                  <div key={event.id} className="admin-panel__card">
                    <h4 className="admin-panel__card-title">{event.name || `Event ${index + 1}`}</h4>

                    <div className="admin-panel__field">
                      <label>Nama Acara</label>
                      <input
                        type="text"
                        value={event.name}
                        onChange={(e) => handleArrayChange('events', index, 'name', e.target.value)}
                        placeholder="Akad Nikah / Resepsi"
                      />
                    </div>

                    <div className="admin-panel__row">
                      <div className="admin-panel__field">
                        <label>Tanggal</label>
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleArrayChange('events', index, 'date', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-panel__row">
                      <div className="admin-panel__field">
                        <label>Jam Mulai</label>
                        <input
                          type="time"
                          value={event.time}
                          onChange={(e) => handleArrayChange('events', index, 'time', e.target.value)}
                        />
                      </div>
                      <div className="admin-panel__field">
                        <label>Jam Selesai</label>
                        <input
                          type="time"
                          value={event.endTime}
                          onChange={(e) => handleArrayChange('events', index, 'endTime', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="admin-panel__field">
                      <label>Venue</label>
                      <input
                        type="text"
                        value={event.venue}
                        onChange={(e) => handleArrayChange('events', index, 'venue', e.target.value)}
                        placeholder="Nama venue"
                      />
                    </div>

                    <div className="admin-panel__field">
                      <label>Alamat</label>
                      <textarea
                        value={event.address}
                        onChange={(e) => handleArrayChange('events', index, 'address', e.target.value)}
                        placeholder="Alamat lengkap venue"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Location / Map</h3>
                <p className="admin-panel__hint">Edit lokasi untuk Google Maps embed</p>

                <div className="admin-panel__field">
                  <label>Nama Venue</label>
                  <input
                    type="text"
                    value={config.venue.name}
                    onChange={(e) => handleChange('venue.name', e.target.value)}
                    placeholder="The Grand Ballroom"
                  />
                </div>

                <div className="admin-panel__field">
                  <label>Alamat</label>
                  <textarea
                    value={config.venue.address}
                    onChange={(e) => handleChange('venue.address', e.target.value)}
                    placeholder="Alamat lengkap"
                    rows={2}
                  />
                </div>

                <div className="admin-panel__row">
                  <div className="admin-panel__field">
                    <label>Latitude</label>
                    <input
                      type="text"
                      value={config.venue.lat}
                      onChange={(e) => handleChange('venue.lat', parseFloat(e.target.value) || 0)}
                      placeholder="40.7579"
                    />
                  </div>
                  <div className="admin-panel__field">
                    <label>Longitude</label>
                    <input
                      type="text"
                      value={config.venue.lng}
                      onChange={(e) => handleChange('venue.lng', parseFloat(e.target.value) || 0)}
                      placeholder="-73.9878"
                    />
                  </div>
                </div>

                <div className="admin-panel__field">
                  <label>Google Place ID</label>
                  <input
                    type="text"
                    value={config.venue.placeId}
                    onChange={(e) => handleChange('venue.placeId', e.target.value)}
                    placeholder="ChIJD7fiBh9u5kcRYJSMaMOCCwQ"
                  />
                  <span className="admin-panel__hint">Place ID dari Google Maps</span>
                </div>

                <div className="admin-panel__info">
                  <strong>Cara mendapatkan Place ID:</strong>
                  <ol>
                    <li>Buka Google Maps</li>
                    <li>Cari lokasi yang diinginkan</li>
                    <li>Klik "Share" → "Embed a map"</li>
                    <li>Copy Place ID dari URL</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'rsvp' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">RSVP Settings</h3>

                <div className="admin-panel__field">
                  <label>Nomor WhatsApp (format: 628xxxx)</label>
                  <input
                    type="text"
                    value={config.rsvp.whatsappNumber}
                    onChange={(e) => handleChange('rsvp.whatsappNumber', e.target.value)}
                    placeholder="6281234567890"
                  />
                  <span className="admin-panel__hint">Tanpa + atau spasi</span>
                </div>

                <div className="admin-panel__field admin-panel__field--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.rsvp.enableWhatsApp}
                      onChange={(e) => handleChange('rsvp.enableWhatsApp', e.target.checked)}
                    />
                    Enable WhatsApp RSVP
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Gallery</h3>
                <p className="admin-panel__hint">Edit gambar gallery (placeholder URLs)</p>

                {config.gallery.map((image, index) => (
                  <div key={image.id} className="admin-panel__card">
                    <h4 className="admin-panel__card-title">Image {index + 1}</h4>

                    <div className="admin-panel__field">
                      <label>Image URL</label>
                      <input
                        type="text"
                        value={image.src}
                        onChange={(e) => handleArrayChange('gallery', index, 'src', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="admin-panel__field">
                      <label>Alt Text</label>
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => handleArrayChange('gallery', index, 'alt', e.target.value)}
                        placeholder="Wedding moment"
                      />
                    </div>

                    {image.src && (
                      <div className="admin-panel__preview">
                        <img src={image.src} alt={image.alt} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gift' && (
              <div className="admin-panel__section">
                <h3 className="admin-panel__section-title">Gift / Token of Love</h3>

                <div className="admin-panel__field admin-panel__field--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={config.gift.enableGift}
                      onChange={(e) => handleChange('gift.enableGift', e.target.checked)}
                    />
                    Enable Gift Section
                  </label>
                </div>

                <h4 className="admin-panel__subsection-title">Bank Accounts</h4>

                {config.gift.bankAccounts.map((account, index) => (
                  <div key={index} className="admin-panel__card">
                    <div className="admin-panel__row">
                      <div className="admin-panel__field">
                        <label>Bank</label>
                        <input
                          type="text"
                          value={account.bank}
                          onChange={(e) => {
                            const newAccounts = [...config.gift.bankAccounts];
                            newAccounts[index] = { ...account, bank: e.target.value };
                            handleChange('gift.bankAccounts', newAccounts);
                          }}
                          placeholder="BCA"
                        />
                      </div>
                      <div className="admin-panel__field">
                        <label>Account Number</label>
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) => {
                            const newAccounts = [...config.gift.bankAccounts];
                            newAccounts[index] = { ...account, accountNumber: e.target.value };
                            handleChange('gift.bankAccounts', newAccounts);
                          }}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    <div className="admin-panel__field">
                      <label>Account Name</label>
                      <input
                        type="text"
                        value={account.accountName}
                        onChange={(e) => {
                          const newAccounts = [...config.gift.bankAccounts];
                          newAccounts[index] = { ...account, accountName: e.target.value };
                          handleChange('gift.bankAccounts', newAccounts);
                        }}
                        placeholder="Andrew Wijaya"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="admin-panel__footer">
          <button className="admin-panel__btn admin-panel__btn--danger" onClick={handleReset}>
            Reset to Default
          </button>
          <button className="admin-panel__btn admin-panel__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="admin-panel__btn admin-panel__btn--primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
