export default function PageWrapper({ children, title }: any) {
  return (
    <div className="min-w-[300px] max-w-full">
      <div className="ml-3 text-lg p-2 font-bold bg-red-100 mb-3 rounded">{title}</div>
      <article className="ml-3 p-2 bg-red-100 rounded min-h-[700px]">{children}</article>
    </div>
  );
}

