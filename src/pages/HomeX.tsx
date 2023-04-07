import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 ">
        <Navbar/>
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Sidebar/>
          <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main>
              
            </main>
            {/* //footer */}
            <Footer/>
          </div>
        </div>

        {/* <svg id="SvgjsSvg1001" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" style={{ overflow: 'hidden', top: '-100%', left: '-100%', position: 'absolute', opacity: '0' }}>
          <defs id="SvgjsDefs1002"></defs>
          <polyline id="SvgjsPolyline1003" points="0,0"></polyline>
          <path id="SvgjsPath1004" d="M0 0 "></path>
        </svg> */}
      </div>
    </>
  );
}
