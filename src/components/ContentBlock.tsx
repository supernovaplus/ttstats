import { ReactNode } from "react";

interface props {
  title?: string | ReactNode;
  children?: ReactNode;
}

export default function ContentBlock({ title, children }: props) {
  return (
    <>
      {title && (
        <div className="ml-3 text-lg p-2 font-bold bg-[#0058a0ad] text-white text-shadow-1 rounded border-b border-black shadow-sm shadow-black text-center">
          {title}
        </div>
      )}
      {children && (
        <article className="ml-3 p-2 bg-kebab-bg-dm text-white border-1 border-black border-b border-b-black shadow-sm shdw mb-3">
          {children}
        </article>
      )}
    </>
  );
}
