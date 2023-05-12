import { ReactNode, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Category = ({ children }: { children: ReactNode }) => {
  return <li className="font-sans bg-gray-500 dark:bg-kebab-btn text-white select-none">{children}</li>;
};

// border-[1px] border-solid border-black
const OneItem = ({
  children,
  to = '/404',
  setForceOpen,
}: {
  children: ReactNode;
  to?: string;
  setForceOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <li>
    <NavLink
      to={to}
      onClick={() => setForceOpen((s) => !s)}
      className="navlink block border-l-2 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 dark:hover:text-gray-400 select-none pt-1">
      {children}
    </NavLink>
  </li>
);

export default function Sidebar() {
  const [forceOpen, setForceOpen] = useState(false);

  function toggleMenu() {
    setForceOpen((s) => !s);
  }

  // useEffect(() => {
  //   console.log(window.innerWidth);
  // }, [window.innerWidth]);

  return (
    <>
      <button
        className="w-[70px] h-[60px] fixed top-0 left-0 items-center z-12 hidden md:block rounded-br-lg bg-white text-black dark:text-white dark:bg-black "
        onClick={toggleMenu}>
        Menu
      </button>
      <aside
        className={`w-fullbox-border bg-white dark:bg-kebab-bg-dm w-full min-w-[140px] max-w-[200px] text-black dark:text-white h-fit text-center my-3 overflow-hidden border-r border-r-gray-400 dark:border-r-kebab-bg md:fixed md:left-0 md:top-12 z-10 ${
          forceOpen ? 'block' : 'md:hidden'
        }`}>
        <div className="">
          <ul className="">
            <Category>Live</Category>
            <OneItem to="/" setForceOpen={setForceOpen}>
              Servers List
            </OneItem>
            <OneItem to="/playerfinder" setForceOpen={setForceOpen}>
              Player Finder
            </OneItem>
            <Category>Data</Category>
            <OneItem to="/topjobs" setForceOpen={setForceOpen}>
              Top Jobs
            </OneItem>
            <OneItem to="/topvehicles" setForceOpen={setForceOpen}>
              Top Vehicles
            </OneItem>
            <OneItem to="/top10" setForceOpen={setForceOpen}>
              Top 10
            </OneItem>
            <OneItem to="/highest_id" setForceOpen={setForceOpen}>
              Highest ID
            </OneItem>
            <OneItem to="/economy" setForceOpen={setForceOpen}>
              Economy
            </OneItem>
            <Category>Tools</Category>
            <OneItem to="/stacks_calculator" setForceOpen={setForceOpen}>
              Stacks Calculator
            </OneItem>
            <Category>Info</Category>
            <OneItem to="/links" setForceOpen={setForceOpen}>
              Useful Links
            </OneItem>
            {/* <OneItem to="/lazy">lazy</OneItem> */}
            {/* <OneItem to="/chart">chart</OneItem> */}
            {/* <OneItem to="/404">404</OneItem> */}
            {/* <OneItem to="/ServersRawPage">ServersRawPage</OneItem> */}
          </ul>
        </div>
      </aside>
    </>
  );
}
