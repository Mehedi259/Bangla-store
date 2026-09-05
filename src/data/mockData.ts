import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Fresh Market', icon: 'Leaf' },
  { id: '2', name: 'Frozen Fish', icon: 'Fish' },
  { id: '3', name: 'Meat & Poultry', icon: 'Drumstick' },
  { id: '4', name: 'Rice & Grains', icon: 'Wheat' },
  { id: '5', name: 'Spices & Masala', icon: 'Flame' },
  { id: '6', name: 'Snacks & Biscuits', icon: 'Cookie' },
  { id: '7', name: 'Beverages', icon: 'CupSoda' },
  { id: '8', name: 'Household', icon: 'Home' },
  { id: '9', name: 'Personal Care', icon: 'Smile' },
  { id: '10', name: 'Sweets & Desserts', icon: 'Cake' },
  { id: '11', name: 'Other', icon: 'MoreHorizontal' },
];

export const featuredProducts: Product[] = [
  // Existing Products
  {
    id: 'p1',
    name: 'Hilsa Fish (Frozen)',
    price: 12.99,
    weight: '(€/kg)',
    image: '/images/product_hilsa.jpg',
    category: 'Frozen Fish',
    isBestSeller: true,
  },
  {
    id: 'p2',
    name: 'Teer Aatar Rice',
    price: 14.99,
    weight: '(5kg)',
    image: '/images/product_rice.jpg',
    category: 'Rice & Grains',
  },
  {
    id: 'p3',
    name: 'Fortune Soybean Oil',
    price: 3.99,
    weight: '(1L)',
    image: '/images/product_oil.jpg',
    category: 'Household',
  },
  {
    id: 'p4',
    name: 'Teer Tea',
    price: 2.99,
    weight: '(200g)',
    image: '/images/product_tea.jpg',
    category: 'Beverages',
  },
  {
    id: 'p5',
    name: 'Britannia Marie Gold',
    price: 1.99,
    weight: '(250g)',
    image: '/images/product_biscuits.jpg',
    category: 'Snacks & Biscuits',
  },
  {
    id: 'p6',
    name: 'PRAN Garam Masala',
    price: 2.49,
    weight: '(100g)',
    image: '/images/product_masala.jpg',
    category: 'Spices & Masala',
  },
  
  // New Snacks
  { id: 'p7', name: 'PRAN Potato Crackers', price: 1.20, weight: '(50g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=PRAN+Crackers', category: 'Snacks & Biscuits' },
  { id: 'p8', name: 'PRAN Chanachur', price: 1.50, weight: '(150g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=PRAN+Chanachur', category: 'Snacks & Biscuits' },
  { id: 'p9', name: 'Square Potato Chips', price: 1.10, weight: '(45g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Square+Chips', category: 'Snacks & Biscuits' },
  { id: 'p10', name: 'Square Ruchi Chanachur', price: 1.80, weight: '(200g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Ruchi+Chanachur', category: 'Snacks & Biscuits' },
  { id: 'p11', name: 'Puffed Rice (Muri)', price: 2.50, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Muri', category: 'Snacks & Biscuits' },
  { id: 'p12', name: 'Mango Achar', price: 3.50, weight: '(400g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Achar', category: 'Spices & Masala' },
  { id: 'p13', name: 'Dried Fish (Shutki)', price: 5.99, weight: '(100g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Shutki', category: 'Frozen Fish' },

  // Sweets
  { id: 'p14', name: 'Kalo Jam', price: 6.50, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Kalo+Jam', category: 'Sweets & Desserts' },
  { id: 'p15', name: 'Golap Jamun', price: 6.50, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Golap+Jamun', category: 'Sweets & Desserts' },
  { id: 'p16', name: 'Chomchom', price: 7.00, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Chomchom', category: 'Sweets & Desserts' },
  { id: 'p17', name: 'Roshmalai', price: 8.50, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Roshmalai', category: 'Sweets & Desserts' },
  { id: 'p18', name: 'Sweet Yogurt (Mishti Doi)', price: 4.50, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Mishti+Doi', category: 'Sweets & Desserts' },

  // Vegetables
  { id: 'p19', name: 'Pui Shak', price: 1.50, weight: '(1 Bunch)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Pui+Shak', category: 'Fresh Market' },
  { id: 'p20', name: 'Lal Shak', price: 1.50, weight: '(1 Bunch)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Lal+Shak', category: 'Fresh Market' },
  { id: 'p21', name: 'Bottle Gourd (Lau)', price: 3.50, weight: '(1 pc)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Lau', category: 'Fresh Market' },
  { id: 'p22', name: 'Kancha Morich', price: 2.00, weight: '(250g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Kancha+Morich', category: 'Fresh Market' },
  { id: 'p23', name: 'Kancha Kola', price: 1.20, weight: '(2 pcs)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Kancha+Kola', category: 'Fresh Market' },
  { id: 'p24', name: 'Kochur Loti', price: 3.00, weight: '(500g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Loti', category: 'Fresh Market' },
  { id: 'p25', name: 'Bombai Morich (Naga)', price: 2.50, weight: '(100g)', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Bombai+Morich', category: 'Fresh Market' },
];

export const exploreCategories = [
  { name: 'Fresh Vegetables', image: '/images/explore_vegetables.jpg' },
  { name: 'Fresh Fruits', image: '/images/explore_fruits.jpg' },
  { name: 'Frozen Items', image: '/images/explore_frozen.jpg' },
  { name: 'Rice & Grains', image: '/images/explore_rice.jpg' },
  { name: 'Snacks', image: '/images/explore_snacks.jpg' },
  { name: 'Household', image: '/images/explore_household.jpg' },
];
