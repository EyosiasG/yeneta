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

    const MenuItem = ({ icon, name, subMenus, children }) => (
        <div className={`flex flex-col py-1 px-4 mx-2 rounded-lg font-poppins transition-all duration-300 ${activeMenu === name ? 'bg-teal-700 shadow-lg' : 'hover:bg-teal-600 hover:shadow-md'}`}>
            <a href="#" className="flex items-center justify-between" onClick={() => subMenus ? toggleMenu(name) : setAdminNav(name)}>
                <div className="flex items-center ">
                    <i className={`${icon} mr-3`}></i> 
                    {isDrawerOpen && <span className='text-sm'>{name}</span>}
                </div>
                {subMenus && isDrawerOpen && <i className={`fa-solid fa-angle-${activeMenu === name ? 'up' : 'down'}`}></i>}
            </a>
            {activeMenu === name && isDrawerOpen && <div className="mt-2">{children}</div>}
        </div>
    );

    return (
        <div className={`bg-teal-900 flex flex-col justify-center pt-20 overflow-scroll relative min-h-screen transition-width duration-300 ${isDrawerOpen ? 'min-w-[225px]' : 'min-w-[50px]'}`}>

            <div className='flex flex-col justify-center items-center text-white text-5xl mt-10'>
                <img src={logo} className='h-24 w-auto' alt="Yeneta Logo" />
                {isDrawerOpen && <h1 className="text-2xl mt-2 display-1">Yeneta</h1>}
            </div>
            
            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="text-white absolute top-10 right-2 justify-end mx-auto p-2 bg-teal-700 rounded-full hover:bg-teal-600 transition-all h-8 w-8 flex justify-center align-center duration-300">
                {isDrawerOpen ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>}
            </button>
            <div className="flex flex-col gap-3 pt-10 h-full text-xl font-semibold text-gray-200">
                <MenuItem icon="fas fa-tachometer-alt" name="Dashboard" />
                <MenuItem icon="fas fa-book" name="Programs" />
                <MenuItem icon="far fa-calendar-alt" name="Events" />
                <MenuItem icon="fas fa-user-graduate" name="Students" subMenus={true}>
                    <div className='pl-4 mt-2 flex flex-col text-lg bg-teal-700 p-2 border rounded-lg'>
                        <a href="#" className="py-2 hover:bg-teal-600 rounded-md" onClick={() => setAdminNav('Students')}>
                            All Students
                        </a>
                        <a href="#" className="py-2 hover:bg-teal-600 rounded-md" onClick={() => setAdminNav('Registered')}>
                            Registered Students
                        </a>
                    </div>
                </MenuItem>
                {/* ... other MenuItems ... */}
                <MenuItem icon="fas fa-users" name="Staff" />
                <MenuItem icon="fas fa-handshake" name="Services" />
                <MenuItem icon="fas fa-comment-alt" name="Testimonials" />
                <MenuItem icon="far fa-images" name="Gallery" />
                <MenuItem icon="fas fa-envelope" name="Messages" />
                <MenuItem icon="fas fa-hand-holding-usd" name="Partnerships" />
                <MenuItem icon="fas fa-file-invoice-dollar" name="Invoices" />
                <MenuItem icon="fas fa-box-open" name="Products" />
            </div>
          
        </div>
    );
}

export default Sidebar;