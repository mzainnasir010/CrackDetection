import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, ScanLine, BarChart3, Info,
  Activity, Menu, X, ChevronRight, Moon, Sun
} from 'lucide-react';
import { ROUTES } from '../../theme';

const NAV_ITEMS = [
  { path: ROUTES.HOME,    label: 'Overview',    icon: LayoutDashboard },
  { path: ROUTES.DETECT,  label: 'Live Detect', icon: ScanLine },
  { path: ROUTES.METRICS, label: 'Metrics',     icon: BarChart3 },
  { path: ROUTES.ABOUT,   label: 'About',       icon: Info },
];

/* Theme Hook */
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  return { theme, toggleTheme };
}

/* Sidebar (desktop) */
function Sidebar({ theme, toggleTheme }) {
  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: 220,
      background: 'var(--bg-raised)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      zIndex: 40,
    }}>
      {/* Logo */}
      <Link to={ROUTES.HOME} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '24px 20px 20px',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
      }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Activity size={17} color="var(--accent-fg)" strokeWidth={2.5} />
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 15,
          color: 'var(--text-primary)',
          letterSpacing: '.01em',
          lineHeight: 1.2,
        }}>
          Crack<br />
          <span style={{ color: 'var(--accent)' }}>Detect</span>
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{
          fontSize: 10, fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)', letterSpacing: '.12em',
          textTransform: 'uppercase', padding: '4px 8px 10px',
        }}>Navigation</p>
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path} to={path} end={path === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Icon size={15} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={toggleTheme} 
            className="nav-link" 
            style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </aside>
  );
}

/* Mobile topbar */
function TopBar({ onToggle, theme, toggleTheme }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'var(--bg-raised)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', height: 56,
    }}>
      <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <span style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Activity size={14} color="var(--accent-fg)" strokeWidth={2.5} />
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
          Crack<span style={{ color: 'var(--accent)' }}>Detect</span>
        </span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6 }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 6 }}
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

/* Mobile drawer */
function Drawer({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'rgba(0,0,0,.6)',
          }}
        />
      )}
      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, bottom: 0, left: 0,
        width: 260, zIndex: 70,
        background: 'var(--bg-raised)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRight: '1px solid var(--border)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .25s cubic-bezier(.16,1,.3,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 16px', borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
            Crack<span style={{ color: 'var(--accent)' }}>Detect</span>
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path} to={path} end={path === '/'}
              onClick={onClose}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
              <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: .4 }} />
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

/* Layout wrapper */
export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Mobile topbar + drawer */}
      <div className="mobile-topbar">
        <TopBar onToggle={() => setDrawerOpen(true)} theme={theme} toggleTheme={toggleTheme} />
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>

      <style>{`
        .desktop-sidebar { display: none; }
        .mobile-topbar   { display: block; }
        .main-content    { padding: 72px 16px 40px; }

        @media (min-width: 1024px) {
          .desktop-sidebar { display: block; }
          .mobile-topbar   { display: none; }
          .main-content    { margin-left: 220px; padding: 40px 40px 60px; }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .main-content { padding: 72px 24px 40px; }
        }
      `}</style>
    </div>
  );
}
