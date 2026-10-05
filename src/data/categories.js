// 10 Photography Categories for Rudra Studiio
export const categories = [
  {
    id: "wedding",
    slug: "wedding",
    name: "Wedding Photography",
    tagline: "Eternal Vows & Grand Celebrations",
    description: "Every emotion, every sacred ritual, and every unforgettable gaze. We document royal ceremonies and intimate vows with cinematic elegance.",
    shortDesc: "Every emotion. Every ritual. Every unforgettable moment.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    photoCount: 18,
    featured: true,
    accent: "Traditional & Contemporary"
  },
  {
    id: "pre-wedding",
    slug: "pre-wedding",
    name: "Pre-Wedding Photography",
    tagline: "Your Romance, Unscripted",
    description: "Whimsical, intimate, and scenic couple shoots in breathtaking destinations that celebrate the quiet anticipation before the big day.",
    shortDesc: "Cinematic love stories against stunning backdrops.",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    photoCount: 16,
    featured: true,
    accent: "Destination & Golden Hour"
  },
  {
    id: "baby",
    slug: "baby",
    name: "Baby Photography",
    tagline: "Pure Innocence & Tender Wonders",
    description: "Gentle, safe, and heartwarming newborn and baby sessions capturing tiny fingers, sleepy smiles, and the sweet wonder of new beginnings.",
    shortDesc: "Tender beginnings and the innocent wonders of childhood.",
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80",
    photoCount: 16,
    featured: true,
    accent: "Newborn & Milestone"
  },
  {
    id: "maternity",
    slug: "maternity",
    name: "Maternity Photography",
    tagline: "The Poetry of Motherhood",
    description: "Graceful and empowering portraits honoring the sacred bond of life, glowing maternal beauty, and the profound journey of welcoming a child.",
    shortDesc: "Honoring the beauty, strength, and joy of expecting mothers.",
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    photoCount: 15,
    featured: true,
    accent: "Fine Art & Studio Glow"
  },
  {
    id: "couple",
    slug: "couple",
    name: "Couple Photography",
    tagline: "Chemistry Caught in Frames",
    description: "Authentic, warm, and candid portraits celebrating everyday romance, anniversaries, and heartfelt connections without stiff posing.",
    shortDesc: "Natural, effortless romance captured with raw honesty.",
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    photoCount: 15,
    featured: false,
    accent: "Urban & Outdoor Lifestyle"
  },
  {
    id: "birthday",
    slug: "birthday",
    name: "Birthday Photography",
    tagline: "Laughter, Cake & Milestones",
    description: "Bursting with joy, spontaneous giggles, and vibrant celebration colors—from 1st birthday cake smashes to grand jubilee galas.",
    shortDesc: "Joyous birthday milestones filled with laughter and spark.",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    photoCount: 14,
    featured: false,
    accent: "Cake Smash & Jubilees"
  },
  {
    id: "portrait",
    slug: "portrait",
    name: "Portrait Photography",
    tagline: "Depth, Character & Identity",
    description: "Striking editorial portraits, executive headshots, and soulful close-ups using master chiaroscuro lighting that reveals true inner presence.",
    shortDesc: "Soulful, dramatic lighting that reveals true personal identity.",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    photoCount: 16,
    featured: true,
    accent: "Editorial & Executive Headshots"
  },
  {
    id: "fashion",
    slug: "fashion",
    name: "Fashion Photography",
    tagline: "Vogue Aesthetics & Haute Couture",
    description: "High-octane editorial spreads, designer lookbooks, and avant-garde styling with dynamic movement and runway-level perfection.",
    shortDesc: "Bold aesthetic styling, lookbooks, and high fashion editorials.",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    photoCount: 16,
    featured: true,
    accent: "Lookbooks & Haute Couture"
  },
  {
    id: "events",
    slug: "events",
    name: "Event Photography",
    tagline: "Atmosphere, Energy & High Stakes",
    description: "Comprehensive visual documentation of luxury corporate galas, music festivals, private soirees, and red-carpet unveilings.",
    shortDesc: "Capturing high-energy galas, conferences, and celebrations.",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    photoCount: 14,
    featured: false,
    accent: "Galas & Corporate Summits"
  },
  {
    id: "product",
    slug: "product",
    name: "Product Photography",
    tagline: "Precision, Texture & Luxury Appeal",
    description: "Crisp commercial imagery, luxury timepiece macros, cosmetics, and jewelry styling engineered for maximum visual desire and conversion.",
    shortDesc: "Flawless commercial and luxury product imagery.",
    coverImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    photoCount: 15,
    featured: false,
    accent: "Commercial & Luxury Still Life"
  }
];

export const getCategoryById = (id) => {
  if (!id) return null;
  const normalized = id.toLowerCase().trim();
  return categories.find(
    (c) => c.id === normalized || c.slug === normalized
  );
};
