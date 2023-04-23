import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

// border-[1px] border-solid border-black
const OneItem = ({ children, to = '/404' }: any) => (
  <li>
    {/* <NavLink to={to} className="w-full block px-2 py-1  mt-1 shadow-md text-left hover:bg-slate-200"> */}
    <NavLink
      to={to}
      className="navlink block border-l-2 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 text-white hover:text-gray-400 ">
      {/* className="navlink block border-l-2 pl-4 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 text-white hover:text-gray-400 "> */}
      {children}
    </NavLink>
  </li>
);

export default function Sidebar() {
  return (
    <>
      <aside className="w-fullbox-border rounded bg-kebab-bg-dm w-full min-w-[140px] max-w-[200px] py-5 text-white h-fit shdw text-shadow-1 text-center">
        {/* <aside className="w-fullbox-border rounded bg-kebab-bg-dm w-full min-w-[140px] max-w-[200px] py-5 text-white h-fit shdw text-shadow-1"> */}
        <ul className="">
          <li className="font-sans bg-blue-400">Live</li>
          <OneItem to="/">Servers List</OneItem>
          <OneItem to="/playerfinder">Player Finder</OneItem>
          <li className="font-sans bg-blue-400 mt-2">Data</li>
          <OneItem to="/topjobs">Top Jobs</OneItem>
          <OneItem to="/topvehicles">Top Vehicles</OneItem>
          <OneItem to="/top10">Top 10</OneItem>
          <OneItem to="/highestid">Highest ID</OneItem>
          <li className="font-sans bg-blue-400 mt-2">Tools</li>
          <OneItem to="/stacks-calculator">Stacks Calculator</OneItem>
          <OneItem to="/lazy">lazy</OneItem>
          <OneItem to="/chart">chart</OneItem>
          <OneItem to="/404">404</OneItem>
          <OneItem to="/ServersRawPage">ServersRawPage</OneItem>
        </ul>
      </aside>
    </>
  );
}
