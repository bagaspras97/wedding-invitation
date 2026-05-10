// Konten terpusat — edit di sini untuk customize konten website undangan.

export const couple = {
  groom: { name: "Pras", full: "Prasetyo" },
  bride: { name: "Yolla", full: "Yolla" },
  initials: "Y & P",
  heroNames: "Yolla & Pras",
  hashtag: "#PrasetyoYolla2026",
};

// Tanggal acara — 6 Juni 2026
export const weddingDate = new Date(2026, 5, 6, 10, 0, 0, 0);

export const events = [
  {
    title: "Akad Nikah",
    date: weddingDate,
    time: "10:00 WIB",
    venue: "Villa Edwin, Sirnagalih Bogor",
    address:
      "Jl. Kabandungan II, Sirnagalih, Kec. Tamansari, Kabupaten Bogor, Jawa Barat 16610",
    mapUrl: "https://maps.app.goo.gl/srJPKoTqEbASQnCn7",
  },
  {
    title: "Resepsi",
    date: weddingDate,
    time: "18:00 WIB",
    venue: "Villa Edwin, Sirnagalih Bogor",
    address:
      "Jl. Kabandungan II, Sirnagalih, Kec. Tamansari, Kabupaten Bogor, Jawa Barat 16610",
    mapUrl: "https://maps.app.goo.gl/srJPKoTqEbASQnCn7",
  },
];

export const story = [
  {
    chapter: "A Story Written in Lemon Trees",
    chapterLabel: "chapter one: a story written in lemon trees",
    title: "A Story Written in Lemon Trees",
    body:
      "It all began with playful midnight quizzes that led us to a now-vanished cafe called \"Mantra.\" There, over our first gift, the book As Long as the Lemon Trees Grow, we turned curious questions into a lifelong connection, beginning a journey that has led us to forever.",
    caption: "The First Gift",
    image: "/images/chapter1-story1.jpeg",
    moments: [
      {
        body:
          "It all began with playful midnight quizzes that led us to a now-vanished cafe called \"Mantra.\" There, over our first gift, the book As Long as the Lemon Trees Grow, we turned curious questions into a lifelong connection, beginning a journey that has led us to forever.",
        caption: "The First Gift",
        image: "/images/chapter1-story1.jpeg",
      },
      {
        body:
          "Under the soft glow of twilight, we shared our first deep talk. In the stillness by the water, everything just seemed to click.",
        caption:
          "Under the soft glow of twilight, we shared our first deep talk. In the stillness by the water, everything just seemed to click.",
        image: "/images/chapter1-story2.jpeg",
      },
      {
        body:
          "From one cafe to the next, every little stop became another page in the story we were slowly writing together.",
        caption: "Cafe Hoping",
        image: "/images/chapter1-story-3.jpeg",
      },
    ],
  },
  {
    chapter: "Our First Silver Screen Date",
    chapterLabel: "chapter two: our first silver screen date",
    title: "Our First Silver Screen Date",
    body:
      "Just like Roz and Brightbill's unlikely friendship, our first movie date with The Wild Robot sparked an enchanting adventure of our very own.",
    caption: "",
    image: "/images/chapter2-story1.webp",
    moments: [
      {
        body:
          "Just like Roz and Brightbill's unlikely friendship, our first movie date with The Wild Robot sparked an enchanting adventure of our very own.",
        caption: "",
        image: "/images/chapter2-story1.webp",
      },
      // {
      //   body:
      //     "Family, nature, and a perfect toast at 846 MDPL. Simply unforgettable.",
      //   caption: "Family, nature, and a perfect toast at 846 MDPL. Simply unforgettable.",
      //   image: "/images/chapter2-story2.jpeg",
      // },
      // {
      //   body:
      //     "Two canvases, one shared memory. Just like these colors blending together, our stories have woven into a beautiful masterpiece of our own.",
      //   caption:
      //     "Two canvases, one shared memory. Just like these colors blending together, our stories have woven into a beautiful masterpiece of our own.",
      //   image: "/images/chapter2-story3.jpeg",
      // },
    ],
  },
  {
    chapter: "The Next Step",
    chapterLabel: "chapter three: the next step",
    title: "The Next Step",
    body:
      "A trip, a question, a very easy yes, and suddenly the future we had been imagining became something we could invite everyone into.",
    caption:
      "Just us, the open sky, and a whole lot of reasons to smile. Today is a good day.",
    image: "/images/chapter3-story1.jpeg",
    moments: [
      // {
      //   body:
      //     "A trip, a question, a very easy yes, and suddenly the future we had been imagining became something we could invite everyone into.",
      //   caption:
      //     "Just us, the open sky, and a whole lot of reasons to smile. Today is a good day.",
      //   image: "/images/chapter3-story1.jpeg",
      // },
      {
        body:
          "Wrapped in shadows, anchored by love. Under this golden light, we begin our forever.",
        caption:
          "Wrapped in shadows, anchored by love. Under this golden light, we begin our forever.",
        image: "/images/chapter3-story2.jpg",
      },
      {
        body:
          "Together with the people we love, this joy became something brighter, warmer, and worth celebrating.",
        caption: "Celebrating together",
        image: "/images/chapter3-story3.jpg",
      },
    ],
  },
];
export const heroImage = "/images/hero.jpg";

// Collage foto yang slide in dari luar layar saat scroll hero.
// Semua nilai dalam fraction (bukan string CSS) — dikalikan pixel di komponen.
// finalXf = posisi X akhir relatif center, sebagai fraksi dari viewport width
// yf      = posisi Y relatif center, fraksi viewport height
// wf      = lebar foto, fraksi viewport width
// fromXf  = titik asal X, fraksi vw (di luar layar, ±1.4+)
// Card final: 38vw lebar → tepi card di ±19vw dari center.
// Foto final: inner-edge di ±20vw (1vw gap dari card), lebar 26-28vw.
// fromXf = ±(0.5 + wf/2) → tepat di tepi viewport, langsung terlihat masuk.
export const heroCollage = [
  {
    // Kiri atas — wf 0.27 → fromXf = -(0.5+0.135) = -0.635
    src: "/images/yp1.jpeg",
    finalXf: -0.345,   // inner-edge: -0.345 + 0.0925 = -0.2525
    yf: -0.22,
    wf: 0.185,
    aspect: "3/4",
    fromXf: -0.62,
    rotate: -3,
    delay: 0,
  },
  {
    // Kiri bawah — wf 0.25 → fromXf = -(0.5+0.125) = -0.625
    src: "/images/yp2.jpeg",
    finalXf: -0.34,   // inner-edge: -0.34 + 0.0925 = -0.2475
    yf: 0.255,
    wf: 0.185,
    aspect: "3/4",
    fromXf: -0.62,
    rotate: 2,
    delay: 0.06,
  },
  {
    // Kanan atas — wf 0.24 → fromXf = +(0.5+0.12) = +0.62
    src: "/images/yp3.jpeg",
    finalXf: 0.34,     // inner-edge: 0.34 - 0.09 = +0.25
    yf: -0.2,
    wf: 0.18,
    aspect: "3/4",
    fromXf: 0.61,
    rotate: 3,
    delay: 0.04,
  },
  {
    // Kanan bawah — wf 0.26 → fromXf = +(0.5+0.13) = +0.63
    src: "/images/yp4.jpeg",
    finalXf: 0.345,    // inner-edge: 0.345 - 0.0925 = +0.2525
    yf: 0.265,
    wf: 0.185,
    aspect: "3/4",
    fromXf: 0.62,
    rotate: -2,
    delay: 0.09,
  },
];

export const venueImage = "/images/location.png";

export const gallery = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
];

export const closingQuote = {
  text:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
  source: "QS. Ar-Rum: 21",
};

export const wishes = [
  {
    name: "Nadia & Raka",
    relation: "Sahabat",
    message:
      "Semoga setiap langkah kalian selalu dipenuhi kasih, sabar, dan tawa yang membuat rumah terasa hangat.",
  },
  {
    name: "Keluarga Besar Putri",
    relation: "Keluarga",
    message:
      "Selamat menempuh hidup baru. Semoga Allah menjaga cinta kalian dan menjadikannya sumber kebaikan.",
  },
  {
    name: "Dimas",
    relation: "Teman Kerja",
    message:
      "Bahagia selalu untuk Yolla dan Pras. Semoga perjalanan baru ini membawa banyak cerita indah.",
  },
  {
    name: "Maya",
    relation: "Teman Kuliah",
    message:
      "Doa terbaik untuk kalian berdua. Semoga rumah tangga kalian tumbuh dengan kelembutan dan keberkahan.",
  },
];

export const giftIntro = {
  title: "Love & Gift",
  body:
    "Your presence is our greatest gift. Should you wish to send a token of appreciation, you may do so via the virtual account or e-wallet below. Thank you for your love and generosity.",
};

export const giftAccounts = [
  {
    type: "Bank",
    provider: "BCA",
    number: "7380638945",
    name: "Yolla Lisandra",
  },
  {
    type: "E-Wallet",
    provider: "GoPay",
    number: "082249829966",
    displayNumber: "082249829966",
    name: "Prasetyo Laksono",
  },
];

export const navLinks = [
  { href: "#google-maps", label: "Google Maps" },
  { href: "#cerita", label: "Love" },
  { href: "#gift", label: "Gift for Us" },
];

export const mobileMenuLinks = [
  { href: "#google-maps", label: "Google Maps" },
  { href: "#cerita", label: "Love" },
  { href: "#gift", label: "Gift for Us" },
];
