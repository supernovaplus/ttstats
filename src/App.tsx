import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { DataContextProvider } from './store/DataContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import LazyLoadingWrapper from './components/LazyLoadingWrapper';

import ServersListPage from './pages/ServersListPage';
import PlayerFinderPage from './pages/PlayerFinderPage';
import Page404 from './components/Page404';
import UptimePage from './pages/UptimePage';
import LinksPage from './pages/LinksPage';
import UserDataIndexPage from './pages/userdata/UserDataIndexPage';

const TopJobs = lazy(() => import('./pages/TopJobsPage'));
const HighestIDPage = lazy(() => import('./pages/HighestIDPage'));
const Top10 = lazy(() => import('./pages/TopTenPage'));
const TopVehicles = lazy(() => import('./pages/TopVehiclesPage'));
const ChartPage = lazy(() => import('./pages/ChartPage'));
const ChartPage2 = lazy(() => import('./pages/ChartPage2'));
const StacksCalculatorPage = lazy(() => import('./pages/tools/StacksCalculatorPage'));
const EXPCalculatorPage = lazy(() => import('./pages/tools/EXPCalculatorPage'));
const EconomyTablePage = lazy(() => import('./pages/EconomyTablePage'));
const DealershipPage = lazy(() => import('./pages/DealershipPage'));

export default function App() {
  //dark mode set on inital load
  useEffect(() => {
    if (window.localStorage.getItem('isLightMode')) document.body?.classList.remove('dark');
  }, []);

  // useEffect(() => {
  //   console.log('> Router', history.pathname);
  // }, [history.pathname]);

  return (
    <DataContextProvider>
      <div className="max-w-[1000px] w-full mx-auto my-0 min-h-screen px-1 min-w-[200px]">
        <Header />
        <div className="flex md:flex-col items-start md:items-center mb-6">
          <Sidebar />
          <div className="w-full">
            <Routes>
              {/* static */}
              <Route path="/" element={<ServersListPage />} />
              <Route path="/playerfinder" element={<PlayerFinderPage />} />
              <Route path="/uptime" element={<UptimePage />} />
              {/* dynamic/lazy */}
              <Route path="/chart" element={<LazyLoadingWrapper component={ChartPage2} />} />
              <Route path="/topvehicles" element={<LazyLoadingWrapper component={TopVehicles} />} />
              <Route path="/highest-id" element={<LazyLoadingWrapper component={HighestIDPage} />} />
              <Route path="/top10/*" element={<LazyLoadingWrapper component={Top10} />} />
              <Route path="/topjobs" element={<LazyLoadingWrapper component={TopJobs} />} />
              <Route path="/links" element={<LazyLoadingWrapper component={LinksPage} />} />
              <Route path="/economy" element={<LazyLoadingWrapper component={EconomyTablePage} />} />
              <Route path="/dealership" element={<LazyLoadingWrapper component={DealershipPage} />} />
              <Route
                path="/stacks-calculator"
                element={<LazyLoadingWrapper component={StacksCalculatorPage} />}
              />
              <Route path="/exp-calculator" element={<LazyLoadingWrapper component={EXPCalculatorPage} />} />
              <Route path="/user/*" element={<UserDataIndexPage/>}/>
              {/* 404 */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </DataContextProvider>
  );
}
