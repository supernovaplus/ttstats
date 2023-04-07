import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import ServersListPage from './pages/ServersListPage';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Home />}>
//       <Route path="servers" element={<ServersListPage />} />
//       {/* ... etc. */}
//     </Route>
//   )
// );

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     children: [
//       {
//         path: 'servers',
//         element: <ServersListPage />,
//       },
//     ],
//   },
// ]);

export default function App() {
  const history = useLocation();

  useEffect(() => {
    console.log('> Router', history.pathname);
  }, [history.pathname]);

  return (
    <>
      <Navbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servers" element={<ServersListPage />} />
          </Routes>
          {/* //footer */}
          <Footer />
        </div>
      </div>

      {/* <svg id="SvgjsSvg1001" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" style={{ overflow: 'hidden', top: '-100%', left: '-100%', position: 'absolute', opacity: '0' }}>
          <defs id="SvgjsDefs1002"></defs>
          <polyline id="SvgjsPolyline1003" points="0,0"></polyline>
          <path id="SvgjsPath1004" d="M0 0 "></path>
        </svg> */}
    </>
  );
}
