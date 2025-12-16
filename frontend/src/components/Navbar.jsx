import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-red-900 to-maroon text-cream shadow-lg border-b-2 border-gold sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-maroon text-xl border-2 border-gold shadow-sm">
                            🍯
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold drop-shadow-sm">
                            Kata Sweet Shop
                        </h1>
                    </div>

                    {/* Right Profile Section */}
                    <div className="flex items-center space-x-6">
                        {user && (
                            <div className="hidden md:flex items-center gap-2 text-gold/90 bg-black/20 px-4 py-2 rounded-full border border-gold/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium tracking-wide">
                                    Hello, {user.name || user.email?.split('@')[0] || 'Guest'}
                                </span>
                                {user.role === 'ADMIN' && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-gold text-maroon rounded uppercase">
                                        Admin
                                    </span>
                                )}
                            </div>
                        )}
                        
                        <button
                            onClick={logout}
                            className="group flex items-center gap-2 bg-cream/10 hover:bg-gold hover:text-maroon text-cream font-medium py-2 px-5 rounded-lg transition-all duration-300 border border-gold/30"
                        >
                            <span className="hidden md:inline">Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
