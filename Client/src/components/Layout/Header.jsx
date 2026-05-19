// Header component with navigation

import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-2 bg-accent rounded-lg group-hover:bg-blue-600 transition-smooth">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-primary">Concrete Crack Detection</h1>
                            <p className="text-xs text-neutral">AI-Powered Analysis</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
