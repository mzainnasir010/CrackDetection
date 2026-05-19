import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home      from './pages/Home';
import Detect    from './pages/Detect';
import Metrics   from './pages/Metrics';
import About     from './pages/About';
import { ROUTES } from './theme';
import './global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME}    element={<Home />} />
          <Route path={ROUTES.DETECT}  element={<Detect />} />
          <Route path={ROUTES.METRICS} element={<Metrics />} />
          <Route path={ROUTES.ABOUT}   element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
