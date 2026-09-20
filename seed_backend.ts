import { categories, featuredProducts } from './src/data/mockData';

const BASE_URL = 'http://167.233.34.127:8000/api';

async function seedData() {
  console.log("Seeding categories...");
  for (const cat of categories) {
    try {
      const res = await fetch(`${BASE_URL}/products/categories/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          image: cat.image || null,
        }),
      });
      if (!res.ok) console.error("Failed category", cat.name, await res.text());
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Seeding products...");
  for (const prod of featuredProducts) {
    try {
      const res = await fetch(`${BASE_URL}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          weight: prod.weight || null,
          image: prod.image,
          category: prod.category,
          isBestSeller: prod.isBestSeller || false,
          stock: 100,
          status: 'Active'
        }),
      });
      if (!res.ok) console.error("Failed product", prod.name, await res.text());
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Seeding complete!");
}

seedData();
