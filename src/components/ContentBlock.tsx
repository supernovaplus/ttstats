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
          <div className="text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg">
            {/* <div className="text-lg p-2 font-bold bg-[#0058a0ad] text-white border-b border-black shadow-sm shadow-black text-center"> */}
            {title}
          </div>
        )}
        {children && (
          <article className="p-2 bg-gray-300 dark:bg-kebab-bg-dm text-black dark:text-white dark:shdw mb-3 shadow-lg border-b border-black">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
