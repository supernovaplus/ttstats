import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const Category = ({ children }: { children: ReactNode }) => {
  // return <li className="font-sans bg-gray-500 dark:bg-kebab-btn [&:not(:first-child)]:mt-2 mb-2 text-white select-none">{children}</li>;
  return <li className="font-sans bg-gray-500 dark:bg-kebab-btn text-white select-none">{children}</li>;
};

// border-[1px] border-solid border-black
const OneItem = ({ children, to = '/404' }: any) => (
  <li>
    {/* <NavLink to={to} className="w-full block px-2 py-1  mt-1 shadow-md text-left hover:bg-slate-200"> */}
    <NavLink
      to={to}
      className="navlink block border-l-2 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 dark:hover:text-gray-400 select-none pt-1">
      {/* className="navlink block border-l-2 pl-4 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 text-white hover:text-gray-400 "> */}
      {children}
    </NavLink>
  </li>
);

export default function Sidebar() {
  return (
    <>
      <aside className="w-fullbox-border bg-white dark:bg-kebab-bg-dm w-full min-w-[140px] sm:max-w-[200px] text-black dark:text-white h-fit dark:shdw text-center my-3 rounded-tl-md overflow-hidden border-r border-r-gray-400 dark:border-r-kebab-bg">
        {/* <aside className="w-fullbox-border bg-white dark:bg-kebab-bg-dm w-full min-w-[140px] sm:max-w-[200px] text-black dark:text-white h-fit dark:shdw text-center my-3 rounded-tl-md overflow-hidden border-r border-r-kebab-bg pb-1"> */}
        {/* <aside className="w-fullbox-border rounded bg-kebab-bg-dm w-full min-w-[140px] max-w-[200px] py-5 text-white h-fit shdw"> */}
        <ul className="">
          <Category>Live</Category>
          <OneItem to="/">Servers List</OneItem>
          <OneItem to="/playerfinder">Player Finder</OneItem>
          <Category>Data</Category>
          <OneItem to="/topjobs">Top Jobs</OneItem>
          <OneItem to="/topvehicles">Top Vehicles</OneItem>
          <OneItem to="/top10">Top 10</OneItem>
          <OneItem to="/highest_id">Highest ID</OneItem>
          <OneItem to="/economy">Economy</OneItem>
          <Category>Tools</Category>
          <OneItem to="/stacks-calculator">Stacks Calculator</OneItem>
          <Category>Info</Category>
          <OneItem to="/links">Useful Links</OneItem>
          {/* <OneItem to="/lazy">lazy</OneItem> */}
          {/* <OneItem to="/chart">chart</OneItem> */}
          {/* <OneItem to="/404">404</OneItem> */}
          {/* <OneItem to="/ServersRawPage">ServersRawPage</OneItem> */}
        </ul>
      </aside>
    </>
  );
}
