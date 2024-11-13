import React, { useState } from 'react';
import useStore from '../../store/store';
import logo from '../../assets/img/logo1.webp';

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const { setAdminNav } = useStore();

    const toggleMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? '' : menuName);
    };

    const MenuItem = ({ icon, name, subMenus, children, badge }) => (
        <div className={`
            group relative cursor-pointer
            ${activeMenu === name 
                ? 'bg-gradient-to-r from-teal-700 to-teal-600 shadow-lg scale-[1.02]' 
                : 'hover:bg-teal-600/50 hover:shadow-md hover:scale-[1.01]'
            }
            transition-all duration-300 rounded-xl mx-2 mb-1
        `}>
            <button 
                onClick={() => subMenus ? toggleMenu(name) : setAdminNav(name)}
                className="w-full px-4 py-3 flex items-center justify-between"
            >
                <div className="flex items-center gap-3 text-gray-100">
                    <div className={`
                        flex items-center justify-center w-10 h-10 rounded-lg
                        backdrop-blur-sm
                        ${activeMenu === name 
                            ? 'bg-white/20 shadow-inner' 
                            : 'bg-teal-800/50 group-hover:bg-teal-700/50'
                        }
                        transition-all duration-300 transform group-hover:rotate-3
                    `}>
                        <i className={`${icon} text-lg group-hover:scale-110 transition-transform`}></i>
                    </div>
                    {isDrawerOpen && (
                        <span className='text-sm font-medium tracking-wide group-hover:translate-x-1 transition-transform'>
                            {name}
                        </span>
                    )}
                </div>
                
                {subMenus && isDrawerOpen && (
                    <div className="flex items-center">
                        {badge && (
                            <span className="px-2 py-1 text-xs font-medium bg-teal-500/80 text-white rounded-full mr-2 backdrop-blur-sm">
                                {badge}
                            </span>
                        )}
                        <i className={`
                            fa-solid fa-chevron-${activeMenu === name ? 'down' : 'right'}
                            text-sm transition-all duration-300
                            ${activeMenu === name ? 'rotate-180' : ''}
                            group-hover:scale-110
                        `}></i>
                    </div>
                )}
            </button>

            {/* Submenu with animation */}
            {activeMenu === name && isDrawerOpen && (
                <div className="mt-1 mb-2 mx-4 overflow-hidden transition-all duration-300">
                    <div className="space-y-1 animate-fadeIn">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );

    const SubMenuItem = ({ name, onClick }) => (
        <button
            onClick={onClick}
            className="w-full px-4 py-2 text-sm text-gray-100 hover:bg-teal-600/50 rounded-lg transition-all duration-200 flex items-center hover:translate-x-2"
        >
            <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></span>
            {name}
        </button>
    );

    return (
        <aside className={`
            bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900
            flex flex-col min-h-screen relative
            transition-all duration-300 ease-in-out
            shadow-2xl
            ${isDrawerOpen ? 'w-64' : 'w-20'}
        `}>
            {/* Logo Section with enhanced animation */}
            <div className="flex flex-col items-center pt-8 pb-6 border-b border-teal-700/50">
                <div className="relative group">
                    <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-70"></div>
                    <img 
                        src={logo} 
                        className={`
                            transition-all duration-300 relative
                            hover:scale-105 cursor-pointer
                            ${isDrawerOpen ? 'h-16' : 'h-12'}
                        `} 
                        alt="Yeneta Logo" 
                    />
                    {isDrawerOpen && (
                        <h1 className="text-xl font-semibold text-white mt-3 text-center hover:text-teal-300 transition-colors">
                            Yeneta
                        </h1>
                    )}
                </div>
            </div>

            {/* Enhanced Toggle Button */}
            <button 
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`
                    absolute top-6 -right-3
                    w-6 h-6 rounded-full
                    bg-gradient-to-r from-teal-600 to-teal-700
                    text-white
                    flex items-center justify-center
                    hover:from-teal-500 hover:to-teal-600
                    transition-all duration-300
                    shadow-lg hover:shadow-teal-500/50
                    hover:scale-110
                `}
            >
                <i className={`fas fa-chevron-${isDrawerOpen ? 'left' : 'right'} text-xs`}></i>
            </button>

            {/* Enhanced Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-teal-600 [&::-webkit-scrollbar-track]:bg-transparent">
                <MenuItem 
                    icon="fas fa-tachometer-alt" 
                    name="Dashboard" 
                />
                <MenuItem 
                    icon="fas fa-book" 
                    name="Programs" 
                    badge="New"
                />
                <MenuItem 
                    icon="far fa-calendar-alt" 
                    name="Events" 
                />
                <MenuItem 
                    icon="fas fa-user-graduate" 
                    name="Students" 
                    subMenus={true}
                >
                    <SubMenuItem 
                        name="All Students" 
                        onClick={() => setAdminNav('Students')}
                    />
                    <SubMenuItem 
                        name="Registered Students" 
                        onClick={() => setAdminNav('Registered')}
                    />
                </MenuItem>
                <MenuItem 
                    icon="fas fa-users" 
                    name="Staff" 
                />
                <MenuItem 
                    icon="fas fa-handshake" 
                    name="Services" 
                />
                <MenuItem 
                    icon="fas fa-comment-alt" 
                    name="Testimonials" 
                />
                <MenuItem 
                    icon="far fa-images" 
                    name="Gallery" 
                />
                <MenuItem 
                    icon="fas fa-envelope" 
                    name="Messages" 
                    badge="5"
                />
                <MenuItem 
                    icon="fas fa-hand-holding-usd" 
                    name="Partnerships" 
                />
                <MenuItem 
                    icon="fas fa-file-invoice-dollar" 
                    name="Invoices" 
                />
                <MenuItem 
                    icon="fas fa-box-open" 
                    name="Products" 
                />
            </nav>

            {/* Enhanced User Profile Section */}
            {isDrawerOpen && (
                <div className="p-4 border-t border-teal-700/50 bg-gradient-to-r from-teal-800/50 to-transparent">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <i className="fas fa-user text-white group-hover:rotate-12 transition-transform"></i>
                        </div>
                        <div className="group-hover:translate-x-1 transition-transform">
                            <h3 className="text-sm font-medium text-white group-hover:text-teal-300 transition-colors">Admin User</h3>
                            <p className="text-xs text-teal-300 group-hover:text-teal-200 transition-colors">admin@yeneta.com</p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;