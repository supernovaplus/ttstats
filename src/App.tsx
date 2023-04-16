import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import ServersListPage from './pages/ServersListPage';

export default function App() {
  const history = useLocation();

  useEffect(() => {
    console.log('> Router', history.pathname);
  }, [history.pathname]);

  return (
    <>
      <div className="max-w-[1000px] w-full mx-auto my-0 min-h-screen">
        <Navbar />
        <div className="flex mt-3">
          <Sidebar />
          <div className="w-full min-h-[500px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servers" element={<ServersListPage />} />
              <Route path="*" element={<p className="text-gray-100 w-full flex justify-center py-20">Error 404</p>} />
            </Routes>
            {/* //footer */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
