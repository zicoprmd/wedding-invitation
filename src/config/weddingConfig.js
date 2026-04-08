// Default Wedding Configuration
// This file contains all editable wedding data

export const defaultConfig = {
  // Couple Information
  couple: {
    groomName: "Zico",
    groomFullName: "Zico Permadi",
    brideName: "Novia",
    brideFullName: "Novia Indah Lestari",
    weddingDate: "2026-12-25",
    saveTheDate: "Sabtu, 25 Desember 2026",
    groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },

  // Parents Information
  parents: {
    groom: {
      father: "Mr. Bambang",
      mother: "Mrs. Tri Widyastuti",
    },
    bride: {
      father: "Mr. Sumarno",
      mother: "Mrs. Kokom",
    },
  },

  // Events
  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      date: "2026-12-25",
      time: "09:00",
      endTime: "11:00",
      venue: "Masjid Al-Hidayah",
      address: "123 Wedding Street, New York",
      lat: 40.758,
      lng: -73.9855,
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    },
    {
      id: "resepsi",
      name: "Resepsi",
      date: "2026-12-25",
      time: "18:00",
      endTime: "23:00",
      venue: "The Grand Ballroom",
      address: "123 Wedding Street, New York",
      lat: 40.7579,
      lng: -73.9878,
      placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    },
  ],

  // Venue (main location for map)
  venue: {
    name: "The Grand Ballroom",
    address: "123 Wedding Street, New York",
    lat: 40.7579,
    lng: -73.9878,
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  },

  // RSVP Configuration
  rsvp: {
    whatsappNumber: "6285770207572",
    enableWhatsApp: true,
  },

  // Social Share
  share: {
    siteUrl: "https://andrew-sarah-wedding.com",
    enableSocialShare: true,
  },

  // Gallery Images (placeholder URLs)
  gallery: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      alt: "Wedding moment 1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      alt: "Wedding moment 2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
      alt: "Wedding moment 3",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      alt: "Wedding moment 4",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800",
      alt: "Wedding moment 5",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      alt: "Wedding moment 6",
    },
  ],

  // Gift / Token of Love
  gift: {
    enableGift: true,
    homeAddress: "Jl. Mawar No. 123, RT 001/RW 005, Kelurahan Sukadamai, Kecamatan Sukasari, Kota Bandung, Jawa Barat 40162",
    bankAccounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "Zico Permadi",
      },
      {
        bank: "Mandiri",
        accountNumber: "0987654321",
        accountName: "Novia Indah Lestari",
      },
    ],
  },

  // Hello to I Do Timeline
  timeline: [
    {
      id: "meeting",
      title: "First Meeting",
      date: "February 14, 2022",
      description: "Where it all began",
    },
    {
      id: "date",
      title: "First Date",
      date: "March 20, 2022",
      description: "Coffee and conversations",
    },
    {
      id: "engagement",
      title: "Engagement",
      date: "August 15, 2025",
      description: "She said yes!",
    },
    {
      id: "wedding",
      title: "Hello to I Do",
      date: "December 25, 2026",
      description: "Our wedding day",
    },
  ],

  // Audio
  audio: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    enableAudio: true,
  },

  // Live Streaming Configuration
  liveStreaming: {
    enableLiveStreaming: false,
    platform: "youtube", // youtube, vimeo, twitch
    videoId: "", // Video ID for the streaming platform
    title: "Live Wedding Stream",
  },
};

// LocalStorage key
export const CONFIG_STORAGE_KEY = "wedding_config_v1";

// Load config from localStorage or return default
export const loadConfig = () => {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load config:", e);
  }
  return defaultConfig;
};

// Save config to localStorage
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error("Failed to save config:", e);
    return false;
  }
};

// Reset config to default
export const resetConfig = () => {
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
};
