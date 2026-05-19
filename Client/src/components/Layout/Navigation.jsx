// Navigation menu component

import { NavLink } from 'react-router-dom';
import { Home, ScanLine, BarChart3, Info } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const Navigation = () => {
    const navItems = [
        { path: ROUTES.HOME, label: 'Home', icon: Home },
        { path: ROUTES.DETECT, label: 'Live Detection', icon: ScanLine },
        { path: ROUTES.COMPARE, label: 'Model Comparison', icon: BarChart3 },
        { path: ROUTES.ABOUT, label: 'About', icon: Info },
    ];

    return (
        <nav>
            <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-smooth ${isActive
                                        ? 'bg-accent text-white'
                                        : 'text-neutral hover:bg-gray-100 hover:text-primary'
                                    }`
                                }
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{item.label}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
