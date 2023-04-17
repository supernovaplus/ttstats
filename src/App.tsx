import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { importDelay } from './components/Misc';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import LazyLoadingWrapper from './components/LazyLoadingWrapper';
import PageWrapper from './components/PageWrapper';

import Home from './pages/Home';
import ServersListPage from './pages/ServersListPage';
const LazyPage = React.lazy(() => import('./pages/LazyPage'));
const StacksCalculatorPage = React.lazy(() => import('./pages/StacksCalculatorPage'));

export default function App() {
  const history = useLocation();

  useEffect(() => {
    console.log('> Router', history.pathname);
  }, [history.pathname]);

  return (
    <>
      <div className="max-w-[1000px] w-full mx-auto my-0 min-h-screen p-1">
        <Navbar />
        <div className="flex mt-3">
          <Sidebar />
          <div className="w-full min-h-[500px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servers" element={<ServersListPage />} />
              <Route path="/lazy" element={<LazyLoadingWrapper component={LazyPage} />} />
              <Route path="/stacks" element={<LazyLoadingWrapper component={StacksCalculatorPage} />} />
              <Route
                path="*"
                element={
                  <PageWrapper title="Error 404">
                    <p className="w-full flex justify-center py-20 text-center">Error 404<br/>Page not found</p>
                  </PageWrapper>
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
