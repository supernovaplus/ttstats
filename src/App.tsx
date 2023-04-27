import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { DataContextProvider } from './store/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import LazyLoadingWrapper from './components/LazyLoadingWrapper';

import ServersListPage from './pages/ServersListPage';
import ServersRawPage from './pages/ServersRawPage';
import PlayerFinderPage from './pages/PlayerFinderPage';
import Page404 from './components/Page404';

const TopJobs = lazy(() => import('./pages/TopJobsPage'));
const HighestIDPage = lazy(() => import('./pages/HighestIDPage'));
const Top10 = lazy(() => import('./pages/TopTenPage'));
const TopVehicles = lazy(() => import('./pages/TopVehiclesPage'));
const ChartPage = lazy(() => import('./pages/ChartPage'));
const ChartPage2 = lazy(() => import('./pages/ChartPage2'));
const StacksCalculatorPage = lazy(() => import('./pages/StacksCalculatorPage'));
const LazyPage = lazy(() => import('./pages/LazyPage'));

export default function App() {
  const history = useLocation();

  //dark mode set on inital load
  useEffect(() => {
    if (window.localStorage.getItem('isLightMode')) document.body?.classList.remove('dark');
  }, []);

  useEffect(() => {
    console.log('> Router', history.pathname);
  }, [history.pathname]);

  return (
    <DataContextProvider>
      <div className="max-w-[1000px] w-full mx-auto my-0 min-h-screen p-1 bgbg">
        <Navbar />
        <div className="flex mt-3 flex-col sm:flex-row items-center sm:items-start">
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
                <Route path="/topvehicles" element={<LazyLoadingWrapper component={TopVehicles} />} />
                <Route path="/highest_id" element={<LazyLoadingWrapper component={HighestIDPage} />} />
                <Route path="/top10" element={<LazyLoadingWrapper component={Top10} />} />
                <Route path="/topjobs" element={<LazyLoadingWrapper component={TopJobs} />} />
                <Route
                  path="/stacks-calculator"
                  element={<LazyLoadingWrapper component={StacksCalculatorPage} />}
                />
                {/* 404 */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </DataContextProvider>
  );
}
