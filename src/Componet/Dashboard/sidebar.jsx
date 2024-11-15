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

    // Extracted menu item component for better organization
    const MenuItem = ({ icon, name, subMenus, children, badge, onClick }) => {
        const handleClick = () => {
            if (subMenus) {
                toggleMenu(name);
            } else {
                setAdminNav(name);
                onClick?.();
            }
        };

        return (
            <div className={`
                group relative cursor-pointer
                ${activeMenu === name 
                    ? 'bg-gradient-to-r from-teal-700 to-teal-600 shadow-xl scale-[1.03]' 
                    : 'hover:bg-teal-600/40 hover:shadow-lg hover:scale-[1.02]'
                }
                transition-all duration-300 rounded-2xl mx-3 mb-2
            `}>
                <button 
                    onClick={handleClick}
                    className="w-full px-5 py-4 flex items-center justify-between"
                    aria-expanded={activeMenu === name}
                    aria-controls={subMenus ? `submenu-${name}` : undefined}
                >
                    <div className={`flex items-center gap-4 text-gray-50 ${!isDrawerOpen && 'justify-center w-full'}`}>
                        <div className={`
                            flex items-center justify-center w-11 h-11 rounded-xl
                            backdrop-blur-md
                            ${activeMenu === name 
                                ? 'bg-white/25 shadow-inner' 
                                : 'bg-teal-800/60 group-hover:bg-teal-700/60'
                            }
                            transition-all duration-300 transform group-hover:rotate-6
                        `}>
                            <i className={`${icon} text-xl group-hover:scale-125 transition-transform`} aria-hidden="true"></i>
                        </div>
                        {isDrawerOpen && (
                            <span className='text-sm font-medium tracking-wider group-hover:translate-x-2 transition-transform'>
                                {name}
                            </span>
                        )}
                    </div>
                    
                    {subMenus && isDrawerOpen && (
                        <div className="flex items-center">
                            {badge && (
                                <span className="px-3 py-1.5 text-xs font-semibold bg-teal-500/90 text-white rounded-full mr-3 backdrop-blur-sm">
                                    {badge}
                                </span>
                            )}
                            <i className={`
                                fa-solid fa-chevron-${activeMenu === name ? 'down' : 'right'}
                                text-sm transition-all duration-300
                                ${activeMenu === name ? 'rotate-180' : ''}
                                group-hover:scale-125
                            `} aria-hidden="true"></i>
                        </div>
                    )}
                </button>

                {/* Submenu with animation */}
                {activeMenu === name && (
                    <div 
                        id={`submenu-${name}`}
                        className={`
                            mt-2 mb-3 
                            ${isDrawerOpen ? 'mx-5' : 'absolute left-full top-0 ml-2 bg-teal-800 rounded-lg p-2 min-w-[200px]'} 
                            overflow-hidden transition-all duration-300
                        `}
                    >
                        <div className="space-y-2 animate-fadeIn">
                            {children}
                        </div>
                    </div>
                )}

                {/* Tooltip for collapsed state */}
                {!isDrawerOpen && !activeMenu && (
                    <div className="absolute left-full top-0 ml-2 p-2 bg-teal-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                        {name}
                        {badge && <span className="ml-2 px-2 py-0.5 bg-teal-600 rounded-full text-xs">{badge}</span>}
                    </div>
                )}
            </div>
        );
    };

    const SubMenuItem = ({ name, onClick }) => (
        <button
            onClick={onClick}
            className={`
                w-full px-5 py-3 text-sm text-gray-100 
                hover:bg-teal-600/40 rounded-xl transition-all duration-300 
                flex items-center hover:translate-x-3 
                ${!isDrawerOpen ? 'justify-start pl-4' : ''}
            `}
            role="menuitem"
        >
            <span className="w-2.5 h-2.5 bg-teal-400 rounded-full mr-4 animate-pulse" aria-hidden="true"></span>
            {name}
        </button>
    );

    return (
        <aside 
            className={`
                bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900
                flex flex-col min-h-screen relative
                transition-all duration-300 ease-in-out
                shadow-2xl
                ${isDrawerOpen ? 'w-72' : 'w-24'}
            `}
            aria-label="Sidebar navigation"
        >
            {/* Logo Section with enhanced animation */}
            <div className="flex flex-col items-center pt-10 pb-8 border-b border-teal-700/50">
                <div className="relative group">
                    <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300 opacity-0 group-hover:opacity-80"></div>
                    <img 
                        src={logo} 
                        className={`
                            transition-all duration-300 relative
                            hover:scale-110 cursor-pointer
                            ${isDrawerOpen ? 'h-20' : 'h-14'}
                        `} 
                        alt="Yeneta Logo" 
                    />
                    {isDrawerOpen && (
                        <h1 className="text-2xl font-bold text-white mt-4 text-center hover:text-teal-300 transition-colors">
                            Yeneta
                        </h1>
                    )}
                </div>
            </div>

            {/* Enhanced Toggle Button */}
            <button 
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`
                    absolute top-8 -right-3
                    w-7 h-7 rounded-full
                    bg-gradient-to-r from-teal-500 to-teal-600
                    text-white
                    flex items-center justify-center
                    hover:from-teal-400 hover:to-teal-500
                    transition-all duration-300
                    shadow-xl hover:shadow-teal-500/60
                    hover:scale-125
                    z-50
                `}
                aria-label={isDrawerOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                <i className={`fas fa-chevron-${isDrawerOpen ? 'left' : 'right'} text-xs`} aria-hidden="true"></i>
            </button>

            {/* Enhanced Navigation Menu */}
            <nav 
                className="flex-1 overflow-y-auto py-8 px-2 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-teal-600/80 [&::-webkit-scrollbar-track]:bg-transparent"
                role="navigation"
            >
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
            <div className={`p-5 border-t border-teal-700/50 bg-gradient-to-r from-teal-800/60 to-transparent ${!isDrawerOpen && 'flex justify-center'}`}>
                <div className={`flex items-center ${isDrawerOpen ? 'space-x-4' : ''} group cursor-pointer`}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <i className="fas fa-user text-lg text-white group-hover:rotate-12 transition-transform" aria-hidden="true"></i>
                    </div>
                    {isDrawerOpen && (
                        <div className="group-hover:translate-x-2 transition-transform">
                            <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">Admin User</h3>
                            <p className="text-xs text-teal-300 group-hover:text-teal-200 transition-colors">admin@yeneta.com</p>
                        </div>
                    )}
                    {!isDrawerOpen && (
                        <div className="absolute left-full ml-2 p-2 bg-teal-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                            <h3 className="font-semibold">Admin User</h3>
                            <p className="text-xs text-teal-300">admin@yeneta.com</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;