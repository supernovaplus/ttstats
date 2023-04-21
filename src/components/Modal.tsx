import { useState } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((s) => !s);

  return (
    <>
      <div onClick={toggleOpen} className='cursor-pointer'>{children}</div>
      {isOpen && (
        <>
          <div className="modal-overlay" onClick={toggleOpen}></div>
          <div className="modal-container">
            <div>{children}</div>
            <div>
              <input
                type="button"
                value="close"
                onClick={toggleOpen}
                className="hover:bg-slate-400 p-1 rounded cursor-pointer text-black border-1 border-black"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
