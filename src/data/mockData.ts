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
  { id: '10', name: 'Other', icon: 'MoreHorizontal' },
];

export const featuredProducts: Product[] = [
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
];

export const exploreCategories = [
  { name: 'Fresh Vegetables', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Vegetables' },
  { name: 'Fresh Fruits', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Fruits' },
  { name: 'Frozen Items', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Frozen' },
  { name: 'Rice & Grains', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Rice' },
  { name: 'Snacks', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Snacks' },
  { name: 'Household', image: 'https://placehold.co/400x400/e2e8f0/475569?text=Household' },
];
