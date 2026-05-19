# Concrete Crack Detection - Frontend

React frontend application for the Concrete Crack Detection System.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout/           # Header, Footer, Navigation
│   │   ├── Upload/           # ImageUploader, DropZone
│   │   ├── Prediction/       # PredictionCard, ConfidenceBar, ModelComparison
│   │   ├── Visualization/    # Charts and tables (Recharts)
│   │   └── UI/              # Reusable UI components (Button, Card, etc.)
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── LiveDetection.jsx # Main detection interface
│   │   ├── ModelComparison.jsx # Analytics dashboard
│   │   └── About.jsx         # Project information
│   ├── services/
│   │   └── api.js           # API service (Axios)
│   ├── hooks/
│   │   ├── usePrediction.js # Prediction logic hook
│   │   └── useModelHistory.js # History data hook
│   ├── utils/
│   │   ├── constants.js     # App constants
│   │   └── helpers.js       # Helper functions
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Design System

### Colors
- **Primary**: `#1a1a1a` (Almost Black)
- **Secondary**: `#f5f5f5` (Off White)
- **Accent**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green - No Crack)
- **Warning**: `#ef4444` (Red - Crack Detected)
- **Neutral**: `#9ca3af` (Gray)

### Typography
- **Headings**: Inter (600-700 weight)
- **Body**: Inter (400 weight)
- **Monospace**: JetBrains Mono (metrics/numbers)

### Animations
- Powered by Framer Motion
- Smooth transitions (200-300ms)
- Stagger animations for prediction cards
- Floating effect for feature cards
- Progress bar animations

## 📦 Dependencies

### Core
- **React**: 18+
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Data Visualization
- **Recharts**: Charting library for training history

### Icons
- **Lucide React**: Icon library

### HTTP Client
- **Axios**: API requests to backend

## 🔧 Configuration

### API Proxy
Vite is configured to proxy `/api` requests to `http://localhost:8000` (backend server).

Update `vite.config.js` if your backend runs on a different port.

### Tailwind Configuration
Custom theme extends default Tailwind with:
- Custom color palette
- Google Fonts (Inter, JetBrains Mono)
- Custom animations (float, fadeIn, slideUp)

## 📱 Pages

### Home (`/`)
- Hero section with call-to-action
- Feature cards with floating animation
- Quick statistics
- Navigation to detection page

### Live Detection (`/detect`)
- Image upload with drag-and-drop
- Model selection checkboxes
- Real-time prediction results
- Confidence visualization
- Quick comparison summary

### Model Comparison (`/compare`)
- Training accuracy charts (train & validation)
- Loss charts (train & validation)
- Metrics comparison table
- Key insights section

### About (`/about`)
- Project overview
- Model architecture comparison
- Technology stack
- Key features

## 🎯 Features

### Image Upload
- Drag-and-drop support
- File validation (JPG, PNG, max 5MB)
- Preview before analysis
- Clear/reset functionality

### Predictions
- Multiple model selection
- Concurrent predictions
- Confidence bars with animation
- Inference time display
- Color-coded results

### Visualizations
- Interactive line charts (Recharts)
- Responsive design
- Tooltip on hover
- Legend with color coding

### Animations
- Smooth page transitions
- Stagger effect for prediction cards
- Progress bar fill animation
- Hover effects on interactive elements
- Loading spinners

## 🌐 API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`.

### Endpoints Used
- `POST /api/predict` - Get predictions
- `GET /api/model-history` - Fetch training history
- `GET /api/model-info` - Get model metadata

## 🧪 Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Hot Module Replacement (HMR)
Vite provides instant HMR during development. Changes to components will reflect immediately without full page reload.

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: Single column layout, collapsible navigation
- **Tablet**: Two-column grids where appropriate
- **Desktop**: Full multi-column layouts

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎭 Accessibility

- Keyboard navigation support
- Focus indicators on interactive elements
- Proper ARIA labels
- Semantic HTML structure
- Alt text for images

## 🐛 Troubleshooting

**CORS errors:**
- Ensure backend server is running on port 8000
- Check CORS configuration in FastAPI backend

**Images not uploading:**
- Verify file is JPG or PNG
- Check file size is under 5MB
- Ensure backend `/api/predict` endpoint is accessible

**Charts not rendering:**
- Check browser console for errors
- Verify `/api/model-history` returns valid data
- Ensure Recharts is properly installed

**Tailwind classes not applying:**
- Run `npm install` to ensure all dependencies are installed
- Check that `tailwind.config.js` and `postcss.config.js` exist
- Verify `index.css` imports Tailwind directives

## 💡 Tips

- Use React DevTools to inspect component state
- Check Network tab in browser DevTools for API requests
- Framer Motion animations can be disabled for debugging by setting `animate` to `false`
- Use browser's responsive design mode to test mobile layouts
