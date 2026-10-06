import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setCurrentUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link to="/" className="flex items-center">
                    <BookOpen className="mr-3 h-6 w-6 text-purple-600" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">LearnAI</span>
                </Link>
                <div className="flex items-center lg:order-2 gap-4">
                    <Link to="/dashboard" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                        Dashboard
                    </Link>
                    <Link to="/admin" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                        Instructor
                    </Link>
                    <Link to="/live" className="relative text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 flex items-center gap-2">
                        Live Classes
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                    </Link>

                    {currentUser ? (
                        <>
                            <div className="flex items-center text-gray-800 dark:text-white px-4 py-2">
                                <User className="w-5 h-5 mr-2" />
                                <span className="text-sm font-medium">{currentUser.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-red-600 hover:bg-red-50 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:text-red-400 dark:hover:bg-red-900/20 dark:focus:ring-red-800"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
