import React, { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { DataContextProvider } from './store/DataContext';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import LazyLoadingWrapper from './components/LazyLoadingWrapper';
import PageWrapper from './components/PageWrapper';

import ServersListPage from './pages/ServersListPage';
import ServersRawPage from './pages/ServersRawPage';
import PlayerFinderPage from './pages/PlayerFinderPage';
import Page404 from './components/Page404';

const LazyPage = React.lazy(() => import('./pages/LazyPage'));
const ChartPage = React.lazy(() => import('./pages/ChartPage'));
const ChartPage2 = React.lazy(() => import('./pages/ChartPage2'));
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
          <DataContextProvider>
            <Sidebar />
            <div className="w-full min-h-[500px]">
              <div className="min-w-[300px] max-w-full">
                <Routes>
                  {/* static */}
                  <Route path="/" element={<ServersListPage />} />
                  <Route path="/ServersRawPage" element={<ServersRawPage />} />
                  <Route path="/playerfinder" element={<PlayerFinderPage />} />
                  {/* dynamic/lazy */}
                  <Route path="/chart" element={<LazyLoadingWrapper component={ChartPage2} />} />
                  <Route path="/lazy" element={<LazyLoadingWrapper component={LazyPage} />} />
                  <Route path="/ServersRawPage" element={<LazyLoadingWrapper component={LazyPage} />} />
                  <Route
                    path="/stacks-calculator"
                    element={<LazyLoadingWrapper component={StacksCalculatorPage} />}
                  />
                  {/* 404 */}
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
            </div>
          </DataContextProvider>
        </div>
        <Footer />
      </div>
    </>
  );
}
