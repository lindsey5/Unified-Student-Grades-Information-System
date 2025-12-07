import { Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-red-800 to-red-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                <img className="w-20 h-20" src="/logo.png" alt="tcu-logo"/>
                <div>
                    <h3 className="text-2xl font-bold">TCU</h3>
                    <p className="text-red-300 text-base">Taguig City University</p>
                </div>
                </div>
                <p className="text-red-100 text-sm leading-relaxed">
                TCU has garnered national recognition for its myriad of academic and extracurricular achievements. As a young institution, TCU showcases exemplary academic performance in board examinations, affirming its dedication to academic excellence. Reach out to us for inquiries, admissions, or collaborations.
                </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-red-700 pb-2">Quick Links</h4>
                <ul className="space-y-2">
                <li>
                    <a href="/" className="text-red-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-red-400 rounded-full group-hover:w-2 transition-all"></span>
                    Home
                    </a>
                </li>
                <li>
                    <a href="/courses" className="text-red-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-red-400 rounded-full group-hover:w-2 transition-all"></span>
                    Courses
                    </a>
                </li>
                <li>
                    <a href="/login" className="text-red-100 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-red-400 rounded-full group-hover:w-2 transition-all"></span>
                    Student Portal
                    </a>
                </li>
                </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-red-700 pb-2">Contact Us</h4>
                <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-red-100">
                    <MapPin size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span> Gen. Santos Ave., Central Bicutan, Taguig City</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-red-100">
                    <Phone size={18} className="text-red-400 flex-shrink-0" />
                    <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    Phone: 8635-8300 | Registrar: 8635-8300 (7204) / 0961-887-2644
                    </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-red-100">
                    <Facebook size={18} className="text-red-400 flex-shrink-0" />
                    <a href="mailto:lindseysamson5@gmail.com" className="hover:text-white transition-colors">
                    https://www.facebook.com/TaguigCityUniversity
                    </a>
                </li>
                </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-red-700 pb-2">Follow Us</h4>
                <p className="text-red-100 text-sm">Stay connected with us on social media</p>
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
        <div className="border-t border-red-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p>© {currentYear} Taguig City University. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
