import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('isLightMode')) document.body?.classList.remove('dark');
    console.log('useff');
  }, []);

  const toggleNightmode = () => {
    if (document.body?.classList.contains('dark')) {
      window.localStorage.setItem('isLightMode', '1');
    } else {
      window.localStorage.removeItem('isLightMode');
    }
    document.body?.classList.toggle('dark');
  };

  return (
    <nav className="flex justify-between h-[50px] bg-cyan-600 p-2 rounded items-center shadow-sm">
      <div id="left-nav" className="">
        <div id="site-logo">
          <a href="#">ttstats.eu</a>
        </div>
      </div>
      <div id="right-nav" className="">
        <button onClick={toggleNightmode}>TOGGLE THEME</button>
      </div>
    </nav>
  );
}
