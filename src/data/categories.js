// Real Photography Categories for Rudra Studiio (Auto-generated from public/Images)
export const categories = [
  {
    "id": "wedding",
    "slug": "wedding",
    "name": "Wedding Photography",
    "tagline": "Eternal Vows & Sacred Traditions",
    "description": "Every emotion, every sacred ritual, and every unforgettable gaze. We document royal ceremonies and intimate vows with cinematic grace.",
    "shortDesc": "Every emotion. Every ritual. Every unforgettable moment.",
    "coverImage": "/Images/wedding/RUDRA0337.JPG",
    "photoCount": 8,
    "featured": true,
    "accent": "Traditional & Royal Heritage"
  },
  {
    "id": "pre-wedding",
    "slug": "pre-wedding",
    "name": "Pre-Wedding Photography",
    "tagline": "Your Romance, Unscripted",
    "description": "Whimsical, intimate, and scenic couple shoots in breathtaking destinations that celebrate the quiet anticipation before the big day.",
    "shortDesc": "Cinematic love stories against stunning backdrops.",
    "coverImage": "/Images/Prewdding/231A0202 copy.jpg",
    "photoCount": 24,
    "featured": true,
    "accent": "Destination & Golden Hour"
  },
  {
    "id": "baby",
    "slug": "baby",
    "name": "Baby & Milestone",
    "tagline": "Pure Innocence & Tender Wonders",
    "description": "Gentle, safe, and heartwarming newborn and baby sessions capturing tiny fingers, sleepy smiles, and the sweet wonder of new beginnings.",
    "shortDesc": "Tender beginnings and the innocent wonders of childhood.",
    "coverImage": "/Images/baby/14.jpg",
    "photoCount": 24,
    "featured": true,
    "accent": "Newborn & Milestone"
  },
  {
    "id": "maternity",
    "slug": "maternity",
    "name": "Maternity Photography",
    "tagline": "The Poetry of Motherhood",
    "description": "Graceful and empowering portraits honoring the sacred bond of life, glowing maternal beauty, and the profound journey of welcoming a child.",
    "shortDesc": "Honoring the beauty, strength, and joy of expecting mothers.",
    "coverImage": "/Images/Maternity/231A6704 copy.JPG",
    "photoCount": 24,
    "featured": true,
    "accent": "Fine Art & Studio Glow"
  },
  {
    "id": "product",
    "slug": "product",
    "name": "Product Photography",
    "tagline": "Precision, Texture & Luxury Appeal",
    "description": "Crisp commercial imagery, packshots, and creative still-life styling engineered for maximum visual desire and brand conversion.",
    "shortDesc": "Flawless commercial and luxury product imagery.",
    "coverImage": "/Images/product/231A9126 copy.jpg",
    "photoCount": 24,
    "featured": true,
    "accent": "Commercial & Studio Still Life"
  },
  {
    "id": "jwellery",
    "slug": "jwellery",
    "name": "Jewellery Photography",
    "tagline": "Heritage Gold, Diamonds & Sparkle",
    "description": "Macro-focus precision capturing the dazzling brilliance, faceted gemstone fire, and opulent craftsmanship of bridal and fine jewellery.",
    "shortDesc": "Macro precision highlighting fine gold, diamonds, and gems.",
    "coverImage": "/Images/jwellery/231A1942 (1).JPG",
    "photoCount": 24,
    "featured": true,
    "accent": "Diamonds, Gold & Polki"
  },
  {
    "id": "food",
    "slug": "food",
    "name": "Food & Culinary Styling",
    "tagline": "Gourmet Flavors & Artistic Compositions",
    "description": "Mouthwatering culinary spreads, artisanal beverages, and restaurant menus shot with natural highlights and vibrant appetite appeal.",
    "shortDesc": "Sensory culinary storytelling for menus, chefs, and cafes.",
    "coverImage": "/Images/food/231A7597 copy.JPG",
    "photoCount": 24,
    "featured": false,
    "accent": "Culinary & Restaurant Menus"
  },
  {
    "id": "interior",
    "slug": "interior",
    "name": "Interior & Architecture",
    "tagline": "Spatial Elegance & Ambient Light",
    "description": "Architectural perspectives, luxury residential estates, boutique hotels, and design installations captured with spatial depth and balance.",
    "shortDesc": "Architectural and spatial elegance for designers and resorts.",
    "coverImage": "/Images/Interior/231A6987 copy.jpg",
    "photoCount": 24,
    "featured": false,
    "accent": "Architectural & Hospitality"
  },
  {
    "id": "sports",
    "slug": "sports",
    "name": "Sports & Action Photography",
    "tagline": "Speed, Power & Decisive Moments",
    "description": "High-speed shutter captures of athletic intensity, championship matches, fitness campaigns, and kinetic human motion frozen in time.",
    "shortDesc": "Kinetic motion, athletic championships, and decisive moments.",
    "coverImage": "/Images/sports/231A1092 copy.jpg",
    "photoCount": 24,
    "featured": false,
    "accent": "High-Speed Action & Athletics"
  },
  {
    "id": "events",
    "slug": "events",
    "name": "Events & Celebrations",
    "tagline": "Atmosphere, Energy & Grandeur",
    "description": "Comprehensive visual documentation of vibrant birthday milestones, cultural soirees, family jubilees, and festive celebrations.",
    "shortDesc": "Candid emotional storytelling across family and festive galas.",
    "coverImage": "/Images/done/DSC_9541 copy.jpg",
    "photoCount": 24,
    "featured": false,
    "accent": "Milestones & Cultural Galas"
  }
];

export const getCategoryById = (id) => {
  if (!id) return null;
  const normalized = id.toLowerCase().trim();
  return categories.find(
    (c) => c.id === normalized || c.slug === normalized
  );
};
