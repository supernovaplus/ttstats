import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
// border-[1px] border-solid border-black
const OneItem = ({ children, to = "/" }: any) => (
  <li>
    <NavLink to={to} className="w-full block px-2 py-1  mt-1 shadow-md text-left hover:bg-slate-200">
      {children}
    </NavLink>
  </li>
);

export default function Sidebar() {
  return (
    <>
      <aside className="w-400 w-full max-w-[200px] box-border rounded bg-red-300 min-w-[140px]">
        <ul className="">
          <OneItem to="/">bob</OneItem>
          <OneItem to="/servers">servers</OneItem>
          <OneItem>servers x</OneItem>
        </ul>
      </aside>
    </>
  );
}
