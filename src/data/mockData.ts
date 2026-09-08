import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Fresh Market', icon: 'Leaf', image: '/images/icons/cat_fresh_1788834074873.jpg' },
  { id: '2', name: 'Frozen Fish', icon: 'Fish', image: '/images/icons/cat_fish_1788834089855.jpg' },
  { id: '3', name: 'Meat & Poultry', icon: 'Drumstick', image: '/images/icons/cat_meat_1788834105402.jpg' },
  { id: '4', name: 'Rice & Grains', icon: 'Wheat', image: '/images/icons/cat_rice_1788834117972.jpg' },
  { id: '5', name: 'Spices & Masala', icon: 'Flame', image: '/images/icons/cat_spices_1788834257393.jpg' },
  { id: '6', name: 'Snacks & Biscuits', icon: 'Cookie', image: '/images/icons/cat_snacks_1788834274526.jpg' },
  { id: '7', name: 'Beverages', icon: 'CupSoda', image: '/images/icons/cat_beverages_1788834286724.jpg' },
  { id: '8', name: 'Household', icon: 'Home', image: '/images/icons/cat_household_1788834321315.jpg' },
  { id: '9', name: 'Personal Care', icon: 'Smile', image: '/images/icons/cat_care_1788834344383.jpg' },
  { id: '10', name: 'Sweets & Desserts', icon: 'Cake', image: '/images/icons/cat_sweets_1788834333096.jpg' },
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
  { id: 'p7', name: 'PRAN Potato Crackers', price: 1.20, weight: '(50g)', image: '/images/pran_crackers.jpg', category: 'Snacks & Biscuits' },
  { id: 'p8', name: 'PRAN Chanachur', price: 1.50, weight: '(150g)', image: '/images/pran_chanachur.jpg', category: 'Snacks & Biscuits' },
  { id: 'p9', name: 'Square Potato Chips', price: 1.10, weight: '(45g)', image: '/images/square_chips.jpg', category: 'Snacks & Biscuits' },
  { id: 'p10', name: 'Square Ruchi Chanachur', price: 1.80, weight: '(200g)', image: '/images/ruchi_chanachur.jpg', category: 'Snacks & Biscuits' },
  { id: 'p11', name: 'Puffed Rice (Muri)', price: 2.50, weight: '(500g)', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/PuffedRice.jpg', category: 'Snacks & Biscuits' },
  { id: 'p12', name: 'Mango Achar', price: 3.50, weight: '(400g)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Chilli_pickle_in_a_plate_2.jpg/960px-Chilli_pickle_in_a_plate_2.jpg', category: 'Spices & Masala' },
  { id: 'p13', name: 'Dried Fish (Shutki)', price: 5.99, weight: '(100g)', image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Fish-Drying_Barn.jpg', category: 'Frozen Fish' },
  
  // Sweets
  { id: 'p14', name: 'Kalo Jam', price: 6.50, weight: '(500g)', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg', category: 'Sweets & Desserts' },
  { id: 'p15', name: 'Golap Jamun', price: 6.50, weight: '(500g)', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg', category: 'Sweets & Desserts' },
  { id: 'p16', name: 'Chomchom', price: 7.00, weight: '(500g)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/BD_Porabarir_Chamcham.JPG/960px-BD_Porabarir_Chamcham.JPG', category: 'Sweets & Desserts' },
  { id: 'p17', name: 'Roshmalai', price: 8.50, weight: '(500g)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/960px-Ras_Malai_2.JPG', category: 'Sweets & Desserts' },
  { id: 'p18', name: 'Sweet Yogurt (Mishti Doi)', price: 4.50, weight: '(500g)', image: 'https://loremflickr.com/400/400/yogurt', category: 'Sweets & Desserts' },

  // Vegetables
  { id: 'p19', name: 'Pui Shak', price: 1.50, weight: '(1 Bunch)', image: 'https://loremflickr.com/400/400/spinach', category: 'Fresh Vegetables' },
  { id: 'p20', name: 'Lal Shak', price: 1.50, weight: '(1 Bunch)', image: 'https://loremflickr.com/400/400/red,spinach', category: 'Fresh Vegetables' },
  { id: 'p21', name: 'Bottle Gourd (Lau)', price: 3.50, weight: '(1 pc)', image: 'https://loremflickr.com/400/400/gourd', category: 'Fresh Vegetables' },
  { id: 'p22', name: 'Kancha Morich', price: 2.00, weight: '(250g)', image: 'https://loremflickr.com/400/400/chili', category: 'Fresh Vegetables' },
  { id: 'p23', name: 'Kancha Kola', price: 1.20, weight: '(2 pcs)', image: 'https://loremflickr.com/400/400/banana', category: 'Fresh Vegetables' },
  { id: 'p24', name: 'Kochur Loti', price: 3.00, weight: '(500g)', image: 'https://loremflickr.com/400/400/vegetable', category: 'Fresh Vegetables' },
  { id: 'p25', name: 'Bombai Morich (Naga)', price: 2.50, weight: '(100g)', image: 'https://loremflickr.com/400/400/spicy,chili', category: 'Fresh Vegetables' },
];

export const exploreCategories = [
  { name: 'Fresh Vegetables', image: '/images/explore_vegetables.jpg' },
  { name: 'Fresh Fruits', image: '/images/explore_fruits.jpg' },
  { name: 'Frozen Items', image: '/images/explore_frozen.jpg' },
  { name: 'Rice & Grains', image: '/images/explore_rice.jpg' },
  { name: 'Snacks', image: '/images/explore_snacks.jpg' },
  { name: 'Household', image: '/images/explore_household.jpg' },
];
