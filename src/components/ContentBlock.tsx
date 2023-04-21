interface props {
  title?: string;
  children?: React.ReactNode;
}

export default function ContentBlock({ title, children }: props) {
  return (
    <>
      {title && (
        <div className="ml-3 text-lg p-2 font-bold bg-[#0058a0ad] text-white text-shadow-1 rounded border-b border-black shadow-sm shadow-black">
          {title}
        </div>
      )}
      {children && (
        <article className="ml-3 p-2 bg-kebab-border4 text-white min-h-[700px] border-1 border-black border-b border-b-black shadow-sm shadow-black">
          {children}
        </article>
      )}
    </>
  );
}
