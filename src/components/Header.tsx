import { useEffect, useState } from 'react';
import DarkModeButton from './NavBarComponents/DarkModeButton';
import RefreshServersButton from './NavBarComponents/RefreshServersButton';
import ttLogo from '../assets/images/tt_logov2_small.png';

export default function Navbar() {
  return (
    <nav className="flex justify-between min-h-[50px] items-center px-4 md:min-h-[70px]">
      <div id="left-nav" className="">
        <div id="site-logo" className="block">
          <a href="https://ttstats.eu" title="ttstats.eu" className="w-7">
            <img src={ttLogo} className='block w-full'/>
          </a>
        </div>
      </div>
      <div
        id="mid-nav"
        className="text-white
      p-2">
        <RefreshServersButton />
      </div>
      <div id="right-nav" className="flex items-center">
        <DarkModeButton />
      </div>
    </nav>
  );
}
