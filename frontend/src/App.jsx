import { Routes, Route } from 'react-router-dom';
import ModernLayout from './components/Layout/ModernLayout';
import Home from './pages/Home';
import LiveDetection from './pages/LiveDetection';
import ModelComparison from './pages/ModelComparison';
import About from './pages/About';

function App() {
  return (
    <ModernLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<LiveDetection />} />
        <Route path="/models" element={<ModelComparison />} />
        <Route path="/about" element={<About />} />

        {/* 404 Route */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-slate-500 mb-8">Page not found</p>
            <a href="/" className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors">
              Go Back Home
            </a>
          </div>
        } />
      </Routes>
    </ModernLayout>
  );
}

export default App;
