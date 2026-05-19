// Footer component

import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-sm text-neutral">
                        © {new Date().getFullYear()} Concrete Crack Detection System. All rights reserved.
                    </p>

                    <p className="text-sm text-neutral flex items-center gap-2">
                        Made with <Heart className="w-4 h-4 text-warning fill-current" /> for Deep Learning Lab
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
