export interface TileProduct {
  id: string;
  name: string;
  category: string;
  typeCategory: 'marble' | 'wood' | 'concrete' | 'terrazzo' | 'highlight' | 'mosaic' | 'floor' | 'wall';
  image: string;
  description: string;
  size: string;
  finish: string;
  ideal: string;
  material: string;
}

export interface Showroom {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  phoneDisplay: string;
  image: string;
  mapQuery: string;
  isMain?: boolean;
}

export interface BrandPartner {
  name: string;
  logo: string;
  badge?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  badge: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface ShowcaseProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  spaceType: string;
}

// 1. VERIFIED SHOWROOMS
export const SHOWROOMS: Showroom[] = [
  {
    id: 'governorpet',
    name: 'Tile World — Governorpet',
    area: 'Vijayawada Central',
    address: 'D.No 27-6-5, Prakasam Road, Governorpet',
    city: 'Vijayawada, Andhra Pradesh',
    pincode: '520002',
    phone: '+919908686789',
    phoneDisplay: '+91 99086 86789',
    image: '/images/showroom-governorpet.png',
    mapQuery: 'Tile World, D.No 27-6-5, Prakasam Road, Governorpet, Vijayawada, Andhra Pradesh 520002',
    isMain: true
  },
  {
    id: 'chilakaluripeta',
    name: 'Tile World — Chilakaluripeta',
    area: 'Guntur District',
    address: 'Guntur Road, Pandaripuram',
    city: 'Chilakaluripeta, Andhra Pradesh',
    pincode: '522616',
    phone: '+919908686789',
    phoneDisplay: '+91 99086 86789',
    image: '/images/showroom-bhavanipuram.png',
    mapQuery: 'Tile World, Guntur Road, Pandaripuram, Chilakaluripeta, Andhra Pradesh 522616',
    isMain: false
  },
  {
    id: 'sri-vasavi',
    name: 'Sri Vasavi Tiles & Sanitary',
    area: 'Governorpet, Vijayawada',
    address: 'D.No 27-6-182, Prakasam Road, Governorpet',
    city: 'Vijayawada, Andhra Pradesh',
    pincode: '520002',
    phone: '+918666649795',
    phoneDisplay: '+91 (0866) 6649795',
    image: '/images/showroom-patamata.png',
    mapQuery: 'Sri Vasavi Tiles & Sanitary, D.No 27-6-182, Prakasam Road, Governorpet, Vijayawada 520002',
    isMain: false
  }
];

// 2. VERIFIED BRAND PARTNERS (With downloaded vector SVGs)
export const BRAND_PARTNERS: BrandPartner[] = [
  { name: 'Kajaria', logo: '/images/brand_kajaria.svg', badge: 'India’s No. 1 Tile Co.' },
  { name: 'Simpolo Ceramics', logo: '/images/brand_simpolo.svg', badge: 'Innovative Vitrified' },
  { name: 'Parryware', logo: '/images/brand_parryware.svg', badge: 'Complete Bathrooms' },
  { name: 'MYK LATICRETE', logo: '/images/brand_myklaticrete.svg', badge: 'Tile Adhesives & Grouts' },
  { name: 'Monolith by Kajaria', logo: '/images/brand_monolith.svg', badge: 'Slab Collections' },
  { name: 'SAANS International', logo: '/images/brand_saans.svg', badge: 'Designer Sanitaryware' },
  { name: 'Lizzart Bathware', logo: '/images/brand_lizzart.svg', badge: 'Artisanal Fittings' },
  { name: 'DONATO', logo: '/images/brand_donato.svg', badge: 'Architectural Faucets' },
  { name: 'Santosa Tiles Gallery', logo: '/images/brand_santosa.svg', badge: 'Luxury Surfaces' },
  { name: 'Murano', logo: '/images/brand_murano.svg', badge: 'Designer Glazes' }
];

// 3. VERIFIED TILE PRODUCTS & DETAILED SPECIFICATIONS
export const VERIFIED_PRODUCTS: TileProduct[] = [
  {
    id: 'statuario-gold',
    name: 'Statuario Gold',
    category: 'Marble Look · Floor',
    typeCategory: 'marble',
    image: '/images/collection/statuario.jpg',
    description: 'Bold gold and smoky grey veining on a pristine white base. Replicates rare Italian Statuario marble with high-gloss polished vitrified durability.',
    size: '600 x 1200 mm',
    finish: 'Polished Vitrified (Mirror Gloss)',
    ideal: 'Living Rooms, Master Bedrooms, Grand Foyers',
    material: 'Polished Vitrified'
  },
  {
    id: 'carrara-white',
    name: 'Carrara White',
    category: 'Marble Look · Floor',
    typeCategory: 'marble',
    image: '/images/collection/carrara.jpg',
    description: 'Timeless Italian marble aesthetic featuring delicate, smoky wisps on a cool white base. Perfect for clean, modern architectural styling.',
    size: '600 x 1200 mm',
    finish: 'High Gloss / Polished',
    ideal: 'Living Rooms, Dining Areas, Executive Offices',
    material: 'Vitrified Floor Tile'
  },
  {
    id: 'agatha-marfil',
    name: 'Agatha Marfil',
    category: 'Marble Look · Wall',
    typeCategory: 'marble',
    image: '/images/collection/agatha-marfil.jpg',
    description: 'Warm ivory tones and delicate veining create a classic, soft marble look that reflects light beautifully, adding warmth to any indoor wall.',
    size: '300 x 600 mm',
    finish: 'Glossy Glaze',
    ideal: 'Bathroom Walls, Kitchen Backsplashes',
    material: 'Premium Ceramic'
  },
  {
    id: 'agatha-decor',
    name: 'Agatha Décor',
    category: 'Highlighter · Wall',
    typeCategory: 'highlight',
    image: '/images/collection/agatha-decor.jpg',
    description: 'Ornate geometric highlighter tile designed to complement the Agatha Marfil base. Features subtle textured patterns that capture light gracefully.',
    size: '300 x 600 mm',
    finish: 'Glossy / Textured',
    ideal: 'Shower Feature Walls, Kitchen Backsplashes',
    material: 'Glazed Ceramic'
  },
  {
    id: 'emerald-gloss',
    name: 'Emerald Gloss',
    category: 'Glazed · Wall',
    typeCategory: 'highlight',
    image: '/images/collection/emerald.jpg',
    description: 'Deep, rich forest green glaze with handcrafted-style wavy textures. Creates a striking, high-impact feature wall that looks wet and reflective.',
    size: '75 x 300 mm',
    finish: 'Ultra-Glossy / Wavy Glaze',
    ideal: 'Kitchen Backsplashes, Cafe Counterfronts, Vanity Walls',
    material: 'Premium Ceramic Wall Tile'
  },
  {
    id: 'kitkat-mosaic',
    name: 'Kitkat Sage & Cream',
    category: 'Finger Mosaic · Wall',
    typeCategory: 'mosaic',
    image: '/images/collection/kitkat.jpg',
    description: 'Elegant finger-mosaic style strip tiles in a sage and cream palette. Offers a highly tactile, structured grid look popular in high-end modern baths.',
    size: '300 x 300 mm Sheet',
    finish: 'Satin Gloss',
    ideal: 'Bathroom Feature Walls, Niche Details, Powder Rooms',
    material: 'Ceramic Mosaic'
  },
  {
    id: 'natural-oak',
    name: 'Natural Oak Plank',
    category: 'Wood Look · Floor',
    typeCategory: 'wood',
    image: '/images/collection/oak.jpg',
    description: 'Realistic wood-plank texture replicating natural European Oak. Enjoy the organic warmth of hardwood with the water-resistant durability of vitrified tiles.',
    size: '200 x 1200 mm',
    finish: 'Matte Wood-Grain',
    ideal: 'Bedroom Floors, Accent Walls, Covered Balconies',
    material: 'Glazed Vitrified Plank'
  },
  {
    id: 'terrazzo-cream',
    name: 'Terrazzo Cream',
    category: 'Terrazzo · Floor',
    typeCategory: 'terrazzo',
    image: '/images/collection/terrazzo.jpg',
    description: 'Playful yet sophisticated cream base peppered with multi-colored stone chips. Brings retro terrazzo elegance to modern minimal layouts.',
    size: '600 x 600 mm',
    finish: 'Satin Matt',
    ideal: 'Kitchen Floors, Breakfast Nooks, Modern Bathrooms',
    material: 'Glazed Vitrified'
  },
  {
    id: 'borghetto-dark',
    name: 'Borghetto Dark',
    category: 'Stone Look · Floor',
    typeCategory: 'concrete',
    image: '/images/collection/borghetto-dark.jpg',
    description: 'Deep slate grey with organic stone texturing. Rugged, durable, and slip-resistant surface designed to handle high-traffic areas.',
    size: '400 x 400 mm',
    finish: 'Matt Textured',
    ideal: 'Balconies, Verandahs, Outdoor Walkways',
    material: 'Gres Floor Tile'
  },
  {
    id: 'urban-grey',
    name: 'Urban Grey Concrete',
    category: 'Concrete Look · Floor',
    typeCategory: 'concrete',
    image: '/images/collection/concrete.jpg',
    description: 'Minimalist raw concrete finish in cool industrial grey. Perfect for seamless open-plan designs seeking an industrial or Scandinavian look.',
    size: '600 x 600 mm',
    finish: 'Smooth Matt',
    ideal: 'Living Areas, Commercial Spaces, Modern Bathrooms',
    material: 'Double Charge Vitrified'
  }
];

// 4. VERIFIED PRODUCT CATEGORIES (With verified imagery)
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'vitrified-flooring',
    name: 'Polished Vitrified Flooring',
    badge: 'Flooring',
    image: '/images/polished-vitrified-tiles.jpg',
    description: 'Ultra-durable, mirror-finish and double-charge tiles engineered for seamless living rooms and commercial spaces.',
    highlights: ['600x1200mm & 800x1600mm Slabs', 'Scratch & Stain Resistant', 'High-Traffic Certified']
  },
  {
    id: 'bathroom-tiles',
    name: 'Designer Bathroom Tiles',
    badge: 'Bathrooms',
    image: '/images/bathroom_tiles.jpeg',
    description: 'Anti-skid floor tiles matched with glazed and highlighter wall tiles for cohesive, spa-inspired bathrooms.',
    highlights: ['Anti-Skid Safety Rating', 'Water-Repellent Glaze', 'Seamless Grout Finishes']
  },
  {
    id: 'kitchen-wall-tiles',
    name: 'Kitchen & Backsplash Tiles',
    badge: 'Kitchen',
    image: '/images/kitchen_tiles_new.jpg',
    description: 'Heat-resistant, easy-to-clean ceramic surfaces that protect walls while creating a stunning visual centerpiece.',
    highlights: ['Grease & Stain Proof', 'Subway & Subway Highlighters', 'Vibrant Glazes']
  },
  {
    id: 'wallpaper-highlighters',
    name: 'Wallpaper & Decor Highlighters',
    badge: 'Feature Walls',
    image: '/images/wallpaper_title.jpeg',
    description: 'Artisanal tiles with embossed textures, botanical motifs, and metallic highlights that replace conventional wallpaper.',
    highlights: ['Zero Peeling or Fading', 'Tactile Textured Relief', 'Floor-to-Ceiling Elegance']
  },
  {
    id: 'parking-outdoor',
    name: 'Heavy Duty Parking & Outdoor',
    badge: 'Outdoor',
    image: '/images/parking_tiles.jpeg',
    description: 'Thick, weather-resistant gres tiles engineered to bear vehicle loads and withstand torrential monsoon rains.',
    highlights: ['Anti-Skid Wet Grip', 'High Breaking Strength', 'UV & Weather Proof']
  },
  {
    id: 'luxury-bathware',
    name: 'Complete Bathware & Fittings',
    badge: 'Sanitaryware',
    image: '/images/hero-bathroom.jpg',
    description: 'Coordinated faucets, rain showers, wall-hung basins, and smart sanitaryware from Parryware, Lizzart, and DONATO.',
    highlights: ['Brushed Brass & Matt Black Finishes', 'Water-Saving Aerators', 'Ceramic Cartridge Warranties']
  }
];

// 5. VERIFIED INTERIOR SHOWCASE INSTALLATIONS
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'feature-walls',
    title: 'Feature walls that carry the room',
    tagline: 'Living Rooms & Commercial Spaces',
    description: 'Marble-look highlighters, glossy waves, and textured panels fitted floor-to-ceiling to turn a plain wall into the dramatic focal point of your home or retail front.',
    image: '/images/showcase-feature-wall.jpg',
    spaceType: 'Feature Wall'
  },
  {
    id: 'full-bathrooms',
    title: 'A full bathroom, sorted in one place',
    tagline: 'Cohesive Bathware & Tiles',
    description: 'Wall and floor tiles selected to sit in harmony with brushed brass taps, rain showers, and sanitaryware. Curated by experienced consultants who understand how finishes age together.',
    image: '/images/showcase-bathroom.jpg',
    spaceType: 'Luxury Bathroom'
  },
  {
    id: 'outdoor-parking',
    title: 'Outdoor and parking that lasts',
    tagline: 'Driveways, Balconies & Verandahs',
    description: 'Anti-skid parking and pathway tiles laid to take the weight of heavy vehicles and the beating of rain and tropical sun. Surfaces that stay sharp and safe year after year.',
    image: '/images/showcase-parking.jpg',
    spaceType: 'Exterior & Parking'
  }
];

// 6. SANITARYWARE SPECIFIC FITTINGS (Direct from verified bundle)
export const SANITARY_FITTINGS = [
  { name: 'Architectural Faucets', image: '/images/luxury_faucet.png', category: 'Taps & Mixers', finish: 'Brushed Gold & Matte Black' },
  { name: 'Artisanal Wash Basins', image: '/images/luxury_sink.png', category: 'Table-Top Basins', finish: 'Vitreous China Glaze' },
  { name: 'Overhead Rain Showers', image: '/images/luxury_shower.png', category: 'Shower Systems', finish: 'Thermostatic Controls' },
  { name: 'Wall-Hung Closets', image: '/images/luxury_urinal.png', category: 'Sanitaryware', finish: 'Rimless Hygiene Flushes' }
];

// 7. VERIFIED BUSINESS METADATA
export const BUSINESS_INFO = {
  name: 'Tile World',
  fullName: 'Tile World Vijayawada',
  tagline: 'Transform Spaces. Elevate Living.',
  subTagline: 'Curated architectural tiles, vitrified flooring, and complete bathware under one roof.',
  heritageYear: 2004,
  yearsOfTrust: 20,
  primaryPhone: '+919908686789',
  primaryPhoneDisplay: '+91 99086 86789',
  secondaryPhone: '+919848113110',
  secondaryPhoneDisplay: '+91 98481 13110',
  landlineDisplay: '+91 (0866) 6649795',
  whatsappUrl: 'https://wa.me/919908686789',
  instagramHandle: '@tile.world2004',
  instagramUrl: 'https://www.instagram.com/tile.world2004/',
  hoursWeekday: 'Monday – Saturday: 9:00 AM – 9:00 PM',
  hoursSunday: 'Sunday: Closed',
  mainAddress: 'D.No 27-6-5, Prakasam Road, Governorpet, Vijayawada, Andhra Pradesh 520002',
  mainMapsUrl: 'https://www.google.com/maps?q=Tile%20World%2C%20D.No%2027-6-5%2C%20Prakasam%20Road%2C%20Governorpet%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520002'
};
