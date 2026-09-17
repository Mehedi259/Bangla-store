export const BASE_URL = 'http://localhost:8000/api';

export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Temporary fallback for explore categories
export const exploreCategories = [
  { name: 'Fresh Vegetables', image: '/images/explore_vegetables.jpg' },
  { name: 'Fresh Fruits', image: '/images/explore_fruits.jpg' },
  { name: 'Frozen Items', image: '/images/explore_frozen.jpg' },
  { name: 'Rice & Grains', image: '/images/explore_rice.jpg' },
  { name: 'Snacks', image: '/images/explore_snacks.jpg' },
  { name: 'Household', image: '/images/explore_household.jpg' },
];
