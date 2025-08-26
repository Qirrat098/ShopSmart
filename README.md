# 🛒 ShopSmart - Grocery Price Comparison & Deals Finder

A complete web application that allows users to compare grocery prices from multiple online and offline stores in real-time, create shopping lists with the cheapest options, and receive alerts for discounts and deals.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Price Comparison** - Compare prices across multiple stores instantly
- **Smart Search & Filtering** - Advanced search with category, price range, and store filters
- **Deal Discovery** - Find the best discounts and offers automatically
- **Shopping Lists** - Create and manage personal shopping lists
- **Price Alerts** - Get notified when prices drop below your target
- **Favorites** - Save your favorite products for quick access

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Responsive Design** - Works perfectly on mobile and desktop
- **Smooth Animations** - Framer Motion powered interactions
- **Real-time Updates** - Live price updates and notifications

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure email/password and Google login
- **User Profiles** - Personalized shopping experience
- **Data Privacy** - Secure handling of user preferences and lists

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **CORS** - Cross-origin resource sharing

### External Services
- **Firebase** - Authentication, Firestore, and hosting
- **MongoDB Atlas** - Cloud database hosting

## 📁 Project Structure

```
shopsmart/
├── backend/                 # Backend API server
│   ├── models/             # Database models
│   │   ├── Item.js        # Product model with price history
│   │   ├── Store.js       # Store information model
│   │   └── User.js        # User profile and preferences
│   ├── routes/             # API endpoints
│   │   ├── items.js       # Product management
│   │   ├── stores.js      # Store management
│   │   └── users.js       # User management
│   ├── server.js           # Main server file
│   ├── seed.js            # Database seeding script
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ItemCard.jsx      # Product display card
│   │   │   ├── SearchFilters.jsx # Advanced search filters
│   │   │   └── ...
│   │   ├── pages/         # Application pages
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Search.jsx        # Product search
│   │   │   ├── Deals.jsx         # Featured deals
│   │   │   └── ...
│   │   ├── contexts/      # React contexts
│   │   ├── api.js         # API service functions
│   │   └── ...
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shopsmart
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (optional)
echo "MONGODB_URI=your_mongodb_connection_string" > .env

# Seed the database with sample data
npm run seed

# Start the development server
npm start
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Environment Configuration

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopsmart
PORT=8000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 🗄️ Database Schema

### Item Model
```javascript
{
  name: String,           // Product name
  category: String,       // Product category
  brand: String,          // Brand name
  image: String,          // Product image URL
  description: String,    // Product description
  unit: String,           // Unit of measurement
  prices: [{              // Price information per store
    store: ObjectId,      // Reference to store
    currentPrice: Number, // Current price
    originalPrice: Number,// Original price
    discount: Number,     // Discount amount
    lastUpdated: Date,    // Last price update
    inStock: Boolean      // Availability status
  }],
  priceHistory: [{        // Price change history
    price: Number,
    date: Date,
    store: ObjectId
  }],
  averagePrice: Number,   // Average price across stores
  lowestPrice: Number,    // Lowest available price
  highestPrice: Number,   // Highest available price
  dealScore: Number,      // Deal rating score
  isOnSale: Boolean,      // Sale status
  tags: [String]          // Product tags
}
```

### Store Model
```javascript
{
  name: String,           // Store name
  logo: String,           // Store logo URL
  website: String,        // Store website
  type: String,           // Store type (online/offline/both)
  location: {             // Store location
    address: String,
    city: String,
    coordinates: {         // GPS coordinates
      lat: Number,
      lng: Number
    }
  },
  isActive: Boolean       // Store status
}
```

### User Model
```javascript
{
  firebaseUid: String,    // Firebase user ID
  email: String,          // User email
  displayName: String,    // User display name
  photoURL: String,       // Profile photo URL
  preferences: {          // User preferences
    favoriteStores: [ObjectId],
    categories: [String],
    maxPriceRange: Number,
    notifications: {
      email: Boolean,
      push: Boolean
    }
  },
  shoppingLists: [{       // Shopping lists
    name: String,
    items: [{
      item: ObjectId,
      quantity: Number,
      priority: String,
      isCompleted: Boolean
    }]
  }],
  dealAlerts: [{          // Price alerts
    item: ObjectId,
    targetPrice: Number,
    isActive: Boolean
  }],
  favoriteItems: [ObjectId] // Favorite products
}
```

## 🔌 API Endpoints

### Items
- `GET /api/items` - Get all items with filters
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/deals/featured` - Get featured deals
- `GET /api/items/:id/compare` - Get price comparison

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get store by ID
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Deactivate store

### Users
- `GET /api/users/:firebaseUid` - Get user profile
- `POST /api/users` - Create/update user
- `PUT /api/users/:firebaseUid/preferences` - Update preferences
- `POST /api/users/:firebaseUid/shopping-list` - Add to shopping list
- `PUT /api/users/:firebaseUid/shopping-list/:itemId` - Update list item
- `DELETE /api/users/:firebaseUid/shopping-list/:itemId` - Remove from list
- `POST /api/users/:firebaseUid/deal-alerts` - Set price alert
- `POST /api/users/:firebaseUid/favorites/:itemId` - Toggle favorite

## 🎯 Usage Examples

### Search for Products
```javascript
import { getItems } from '../api';

// Search with filters
const results = await getItems({
  search: 'organic milk',
  category: 'Dairy',
  minPrice: 2,
  maxPrice: 8,
  sortBy: 'price_low'
});
```

### Add to Shopping List
```javascript
import { addToShoppingList } from '../api';

await addToShoppingList(userId, {
  itemId: 'product_id',
  quantity: 2,
  priority: 'high'
});
```

### Set Price Alert
```javascript
import { addDealAlert } from '../api';

await addDealAlert(userId, 'product_id', 5.99);
```

## 🚀 Deployment

### Backend Deployment
1. **Vercel/Render**: Deploy the Node.js backend
2. **MongoDB Atlas**: Use cloud database
3. **Environment Variables**: Set production environment variables

### Frontend Deployment
1. **Firebase Hosting**: Deploy React app
2. **Build Command**: `npm run build`
3. **Environment**: Update API URLs for production

### Environment Variables (Production)
```env
MONGODB_URI=your_production_mongodb_uri
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server
npm run seed       # Seed database with sample data
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **Component-based architecture** with React hooks
- **RESTful API design** with proper HTTP methods

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the beautiful utility-first CSS framework
- **Framer Motion** for smooth animations
- **Heroicons** for the beautiful SVG icons
- **MongoDB** for the flexible NoSQL database
- **Firebase** for authentication and hosting services

## 📞 Support

If you have any questions or need help:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Shopping! 🛒✨**
