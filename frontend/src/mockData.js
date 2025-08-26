// Mock data for testing the frontend
export const mockStores = [
  {
    _id: '1',
    name: 'Fresh Market',
    logo: 'https://via.placeholder.com/80x80?text=FM',
    type: 'offline',
    location: { city: 'New York' }
  },
  {
    _id: '2',
    name: 'Local Grocery',
    logo: 'https://via.placeholder.com/80x80?text=LG',
    type: 'offline',
    location: { city: 'New York' }
  },
  {
    _id: '3',
    name: 'Online Superstore',
    logo: 'https://via.placeholder.com/80x80?text=OS',
    type: 'online',
    location: { city: 'Online' }
  }
];

export const mockItems = [
  {
    _id: '1',
    name: 'Organic Bananas',
    category: 'Fruit',
    brand: 'Fresh Farms',
    image: 'https://via.placeholder.com/300x200?text=Bananas',
    prices: [
      { store: '1', currentPrice: 3.99, originalPrice: 4.99, discount: 1.00, inStock: true },
      { store: '2', currentPrice: 4.49, originalPrice: 4.49, discount: 0, inStock: true }
    ],
    dealScore: 8,
    isOnSale: true
  },
  {
    _id: '2',
    name: 'Whole Milk',
    category: 'Dairy',
    brand: 'Dairy Fresh',
    image: 'https://via.placeholder.com/300x200?text=Milk',
    prices: [
      { store: '1', currentPrice: 4.49, originalPrice: 4.49, discount: 0, inStock: true },
      { store: '2', currentPrice: 4.99, originalPrice: 4.99, discount: 0, inStock: true }
    ],
    dealScore: 5,
    isOnSale: false
  },
  {
    _id: '3',
    name: 'Whole Grain Bread',
    category: 'Bakery',
    brand: 'Bread Co',
    image: 'https://via.placeholder.com/300x200?text=Bread',
    prices: [
      { store: '1', currentPrice: 3.99, originalPrice: 4.99, discount: 1.00, inStock: true },
      { store: '2', currentPrice: 4.49, originalPrice: 4.49, discount: 0, inStock: true }
    ],
    dealScore: 7,
    isOnSale: true
  },
  {
    _id: '4',
    name: 'Fresh Spinach',
    category: 'Vegetables',
    brand: 'Green Valley',
    image: 'https://via.placeholder.com/300x200?text=Spinach',
    prices: [
      { store: '1', currentPrice: 2.99, originalPrice: 3.49, discount: 0.50, inStock: true },
      { store: '2', currentPrice: 3.29, originalPrice: 3.29, discount: 0, inStock: true }
    ],
    dealScore: 6,
    isOnSale: true
  },
  {
    _id: '5',
    name: 'Chicken Breast',
    category: 'Meat',
    brand: 'Farm Fresh',
    image: 'https://via.placeholder.com/300x200?text=Chicken',
    prices: [
      { store: '1', currentPrice: 8.99, originalPrice: 10.99, discount: 2.00, inStock: true },
      { store: '2', currentPrice: 9.49, originalPrice: 9.49, discount: 0, inStock: true }
    ],
    dealScore: 9,
    isOnSale: true
  },
  {
    _id: '6',
    name: 'Organic Apples',
    category: 'Fruit',
    brand: 'Apple Orchard',
    image: 'https://via.placeholder.com/300x200?text=Apples',
    prices: [
      { store: '1', currentPrice: 5.99, originalPrice: 6.99, discount: 1.00, inStock: true },
      { store: '2', currentPrice: 6.49, originalPrice: 6.49, discount: 0, inStock: true }
    ],
    dealScore: 7,
    isOnSale: true
  },
  {
    _id: '7',
    name: 'Greek Yogurt',
    category: 'Dairy',
    brand: 'Yogurt Co',
    image: 'https://via.placeholder.com/300x200?text=Yogurt',
    prices: [
      { store: '1', currentPrice: 4.99, originalPrice: 5.99, discount: 1.00, inStock: true },
      { store: '2', currentPrice: 5.49, originalPrice: 5.49, discount: 0, inStock: true }
    ],
    dealScore: 8,
    isOnSale: true
  },
  {
    _id: '8',
    name: 'Quinoa',
    category: 'Grains',
    brand: 'Grain Co',
    image: 'https://via.placeholder.com/300x200?text=Quinoa',
    prices: [
      { store: '1', currentPrice: 6.99, originalPrice: 7.99, discount: 1.00, inStock: true },
      { store: '2', currentPrice: 7.49, originalPrice: 7.49, discount: 0, inStock: true }
    ],
    dealScore: 7,
    isOnSale: true
  }
];

export const mockCategories = ['Fruit', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Grains'];

export const mockFeaturedDeals = mockItems.filter(item => item.isOnSale).slice(0, 4);
