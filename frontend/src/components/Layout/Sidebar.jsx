import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, BarChart2, Github, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/analysis', label: 'Live Analysis', icon: Activity },
        { path: '/models', label: 'Model Metrics', icon: BarChart2 },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 glass border-r border-white/20 dark:border-slate-700/50 flex flex-col transition-all duration-300 z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10 dark:border-slate-700/50">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
                    <Activity className="text-white w-6 h-6" />
                </div>
                <span className="hidden lg:block ml-3 font-bold text-lg tracking-tight">
                    Crack<span className="text-primary">Detect</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-2 lg:px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center px-2 lg:px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                            isActive
                                ? "bg-primary text-white shadow-soft"
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={clsx("w-6 h-6 shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                                <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white/10 rounded-xl"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Theme Toggle */}
            <div className="p-4 border-t border-white/10 dark:border-slate-700/50 space-y-4">
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center lg:justify-start p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-slate-500" />}
                    <span className="hidden lg:block ml-3 text-sm font-medium">
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>

                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start p-2 text-slate-400 hover:text-primary transition-colors"
                >
                    <Github className="w-5 h-5" />
                    <span className="hidden lg:block ml-3 text-xs">v2.0.0</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
