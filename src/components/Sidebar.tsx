import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

// border-[1px] border-solid border-black
const OneItem = ({ children, to = '/404' }: any) => (
  <li>
    {/* <NavLink to={to} className="w-full block px-2 py-1  mt-1 shadow-md text-left hover:bg-slate-200"> */}
    <NavLink
      to={to}
      className="navlink block border-l-2 pl-4 -ml-px-2 border-transparent hover:border-slate-600 dark:hover:border-slate-500 text-slate-900 hover:text-slate-900">
      {children}
    </NavLink>
  </li>
);

export default function Sidebar() {
  return (
    <>
      <aside className="w-400 w-full max-w-[200px] box-border rounded bg-red-300 min-w-[140px] pt-5">
        <ul className="">
          <OneItem to="/">Servers List</OneItem>
          <OneItem to="/servers">servers</OneItem>
          <OneItem to="/lazy">lazy</OneItem>
          <OneItem to="/stacks-calculator">stacks calculator</OneItem>
          <OneItem to="/chart">chart</OneItem>
          <OneItem to="/404">404</OneItem>
          <OneItem to="/ServersRawPage">ServersRawPage</OneItem>
          <OneItem to="/playerfinder">playerfinder</OneItem>
          <OneItem>servers x</OneItem>
        </ul>
      </aside>
    </>
  );
}
