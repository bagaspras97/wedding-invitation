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
    venue: "Masjid Al-Hikmah",
    address: "Jl. Kenanga No. 12, Jakarta Selatan",
    mapUrl: "https://maps.google.com/?q=-6.2615,106.8106",
  },
  {
    title: "Resepsi",
    date: weddingDate,
    time: "18:00 WIB",
    venue: "The Hermitage Ballroom",
    address: "Jl. Cilacap No. 1, Menteng, Jakarta Pusat",
    mapUrl: "https://maps.google.com/?q=-6.1944,106.8294",
  },
];

export const story = [
  {
    chapter: "Pertemuan",
    chapterLabel: "chapter one: how we met",
    title: "Awal Mula Cerita",
    body:
      "Pertemuan pertama kami terjadi di sebuah kafe kecil di sudut kota. Hujan rintik membuat kami sama-sama berteduh, dan dari obrolan singkat itu, takdir mulai menulis bab pertamanya.",
    caption: "Hari pertama cerita ini dimulai",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    moments: [
      {
        body:
          "Pertemuan pertama kami terjadi di sebuah kafe kecil di sudut kota. Hujan rintik membuat kami sama-sama berteduh, dan dari obrolan singkat itu, takdir mulai menulis bab pertamanya.",
        caption: "Hari pertama cerita ini dimulai",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
      },
      {
        body:
          "Dari percakapan sederhana, kami menemukan banyak hal yang terasa akrab. Sejak hari itu, pertemuan kecil berubah menjadi alasan untuk saling menunggu.",
        caption: "Obrolan pertama yang terasa pulang",
        image:
          "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80",
      },
    ],
  },
  {
    chapter: "Jatuh Cinta",
    chapterLabel: "chapter two: falling in love",
    title: "Tumbuh Bersama",
    body:
      "Hari demi hari kami habiskan dengan tertawa, berbagi mimpi, dan saling memahami. Cinta tumbuh perlahan — tidak terburu-buru, namun pasti.",
    caption: "Obrolan kecil yang menjadi rumah",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80",
    moments: [
      {
        body:
          "Hari demi hari kami habiskan dengan tertawa, berbagi mimpi, dan saling memahami. Cinta tumbuh perlahan — tidak terburu-buru, namun pasti.",
        caption: "Obrolan kecil yang menjadi rumah",
        image:
          "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=80",
      },
      {
        body:
          "Kami belajar bahwa cinta sering hadir dalam hal-hal sederhana: perjalanan singkat, rencana kecil, dan kebiasaan saling mengabari.",
        caption: "Hari-hari yang membuat kami yakin",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
      },
    ],
  },
  {
    chapter: "Lamaran",
    chapterLabel: "chapter three: the next step",
    title: "Janji Selamanya",
    body:
      "Di bawah langit senja, dengan keluarga sebagai saksi, sebuah cincin diberikan dan jawaban 'iya' menjadi awal dari komitmen kami untuk hidup bersama selamanya.",
    caption: "Satu jawaban untuk selamanya",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
    moments: [
      {
        body:
          "Di bawah langit senja, dengan keluarga sebagai saksi, sebuah cincin diberikan dan jawaban 'iya' menjadi awal dari komitmen kami untuk hidup bersama selamanya.",
        caption: "Satu jawaban untuk selamanya",
        image:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
      },
      {
        body:
          "Sejak hari itu, kami tidak hanya merayakan cinta, tetapi juga memulai perjalanan baru: membangun rumah, doa, dan masa depan bersama.",
        caption: "Merayakan langkah baru",
        image:
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=80",
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
    src: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=900&q=80",
    finalXf: -0.325,   // inner-edge: -0.325 + 0.135 = -0.19 ✓
    yf: -0.13,
    wf: 0.27,
    aspect: "4/3",
    fromXf: -0.64,
    rotate: -3,
    delay: 0,
  },
  {
    // Kiri bawah — wf 0.25 → fromXf = -(0.5+0.125) = -0.625
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80",
    finalXf: -0.315,   // inner-edge: -0.315 + 0.125 = -0.19 ✓
    yf: 0.23,
    wf: 0.25,
    aspect: "4/3",
    fromXf: -0.63,
    rotate: 2,
    delay: 0.06,
  },
  {
    // Kanan atas — wf 0.24 → fromXf = +(0.5+0.12) = +0.62
    src: "https://images.unsplash.com/photo-1519160558534-579f5106e43f?auto=format&fit=crop&w=900&q=80",
    finalXf: 0.31,     // inner-edge: 0.31 - 0.12 = +0.19 ✓
    yf: -0.11,
    wf: 0.24,
    aspect: "3/4",
    fromXf: 0.63,
    rotate: 3,
    delay: 0.04,
  },
  {
    // Kanan bawah — wf 0.26 → fromXf = +(0.5+0.13) = +0.63
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
    finalXf: 0.325,    // inner-edge: 0.325 - 0.13 = +0.195 ✓
    yf: 0.25,
    wf: 0.26,
    aspect: "4/3",
    fromXf: 0.64,
    rotate: -2,
    delay: 0.09,
  },
];

export const venueImage =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80";

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

export const navLinks = [
  { href: "#acara", label: "Google Maps" },
  { href: "#cerita", label: "Love" },
  { href: "#gift", label: "Gift for Us" },
];

export const mobileMenuLinks = [
  { href: "#acara", label: "Google Maps" },
  { href: "#cerita", label: "Love" },
  { href: "#gift", label: "Gift for Us" },
];
