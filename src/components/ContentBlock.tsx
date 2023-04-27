import { ReactNode } from 'react';

interface props {
  title?: string | ReactNode;
  children?: ReactNode;
}

export default function ContentBlock({ title, children }: props) {
  return (
    <>
      <div className="shadow-lg">
        {title && (
          <div className="sm:ml-3 text-lg p-2 font-bold bg-kebab-bg-dm text-white  text-center border-b border-kebab-border2 shadow-lg">
            {/* <div className="sm:ml-3 text-lg p-2 font-bold bg-[#0058a0ad] text-white border-b border-black shadow-sm shadow-black text-center"> */}
            {title}
          </div>
        )}
        {children && (
          <article className="sm:ml-3 p-2 bg-kebab-bg-dm text-white border-1 border-black border-b border-b-black shdw mb-3 shadow-lg">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
