import { ReactNode } from 'react';

interface props {
  title?: string | ReactNode;
  children?: ReactNode;
}

export default function ContentBlock({ title, children }: props) {
  return (
    <>
      <div className='box-shadow-1 mb-3'>
        {title && (
          <>
            <div className="text-lg font-bold  dark:text-white text-center before:w-3 text-shadow-1 text-white px-3 bg-nova-c1 dark:bg-nova-c2 pt-1">
              {/* <div className="text-white inline-block px-3 bg-nova-c1 dark:bg-nova-c2 text-shadow-1 w-full box-shadow-1 text-shadow-1">/div> */}
              {title}
            </div>

            {/* <div className="text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg before:w-3"> */}
            {/* <div className="text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg"> */}
            {/* <div className="text-lg p-2 font-bold bg-[#0058a0ad] text-white border-b border-black shadow-sm shadow-black text-center"> */}
            {/* {title} */}
            {/* </div> */}
          </>
        )}
        {children && (
          <article className="p-2 bg-gray-300 dark:bg-nova-c1 text-black dark:text-white border-2 border-nova-c1 dark:border-nova-c2">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
