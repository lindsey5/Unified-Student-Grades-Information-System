import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                    <Leaf className="text-emerald-300 w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Evergreen College</h3>
                    <p className="text-emerald-300 text-xs">Excellence in Education</p>
                </div>
                </div>
                <p className="text-emerald-100 text-sm leading-relaxed">
                Empowering students to achieve their full potential through innovative learning and academic excellence.
                </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-emerald-700 pb-2">Quick Links</h4>
                <ul className="space-y-2">
                <li>
                    <a href="/" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:w-2 transition-all"></span>
                    Home
                    </a>
                </li>
                <li>
                    <a href="/courses" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:w-2 transition-all"></span>
                    Courses
                    </a>
                </li>
                <li>
                    <a href="/login" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:w-2 transition-all"></span>
                    Student Portal
                    </a>
                </li>
                </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-emerald-700 pb-2">Contact Us</h4>
                <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-emerald-100">
                    <MapPin size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>123 Education Street<br />Learning City, LC 12345</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-emerald-100">
                    <Phone size={18} className="text-emerald-400 flex-shrink-0" />
                    <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +1 (234) 567-890
                    </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-emerald-100">
                    <Mail size={18} className="text-emerald-400 flex-shrink-0" />
                    <a href="lindseysamson5@gmail.com" className="hover:text-white transition-colors">
                    lindseysamson5@gmail.com
                    </a>
                </li>
                </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-emerald-700 pb-2">Follow Us</h4>
                <p className="text-emerald-100 text-sm">Stay connected with us on social media</p>
                <div className="flex gap-3">
                <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all hover:scale-110"
                    aria-label="Facebook"
                >
                    <Facebook size={20} />
                </a>
                <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all hover:scale-110"
                    aria-label="Twitter"
                >
                    <Twitter size={20} />
                </a>
                <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all hover:scale-110"
                    aria-label="Instagram"
                >
                    <Instagram size={20} />
                </a>
                <a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all hover:scale-110"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={20} />
                </a>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p>© {currentYear} Evergreen College. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;