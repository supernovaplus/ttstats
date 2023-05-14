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
          <>
            <div className="relative text-lg font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center before:w-3 pb-6 mt-4">
            {/* <div className="relative text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg before:w-3"> */}
              {/* <div className="h-1 bg-gray-300"></div> */}
              {/* <div className="absolute left-0 right-0 h-[2px] bg-gray-700" style={{"top": "15px"}}></div> */}
              {/* <div className="absolute left-0 right-0 h-[1px] bg-black" style={{"top": "20px"}}></div> */}
              {/* <div className="absolute left-0 right-0 h-[2px] bg-white border-b border-black" style={{"top": "16px"}}></div> */}
              <div className="abs-center text-white inline-block px-3 bg-gray-800 text-shadow-1 md:w-full box-shadow-1 text-shadow-1" style={{"marginTop": "-10px"}}>{title}</div>
              
              {/* <div className="relative z-2 dark:bg-kebab-bg-dm bg-gray-300 inline-block px-2">{title}</div> */}
            </div>

            {/* <div className="text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg before:w-3"> */}
            {/* <div className="text-lg p-2 font-bold dark:bg-kebab-bg-dm bg-gray-300 dark:text-white text-center border-b border-gray-400 dark:border-black dark: shadow-lg"> */}
            {/* <div className="text-lg p-2 font-bold bg-[#0058a0ad] text-white border-b border-black shadow-sm shadow-black text-center"> */}
            {/* {title} */}
            {/* </div> */}
          </>
        )}
        {children && (
          <article className="p-2 bg-gray-300 dark:bg-kebab-bg-dm text-black dark:text-white dark:shdw mb-1 shadow-lg border-b border-black">
            {children}
          </article>
        )}
      </div>
    </>
  );
}
