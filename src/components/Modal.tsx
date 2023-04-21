import React, { useState, useEffect, ReactNode, ButtonHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';

interface props {
  children: ReactNode;
  buttonValue: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

function Modal({ children, buttonProps = {}, buttonValue }: props) {
  const modalRoot = document.getElementById('modal-root')!;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((s) => !s);
  };

  return (
    <>
      <button {...buttonProps} onClick={toggleOpen}>
        {buttonValue}
      </button>

      {ReactDOM.createPortal(
        isOpen && (
          <>
          {console.log("gasdgasdgasd")}
            <div className="modal-overlay" onClick={toggleOpen}></div>
            <div className="modal-container bg-kebab-bg p-2 rounded text-white">
              <div>{children}</div>
              <div className="flex justify-end">
                <button onClick={toggleOpen} className="bg-white p-1 rounded text-black">
                  Close Modal
                </button>
              </div>
            </div>
          </>
        ),
        modalRoot
      )}
    </>
  );
}

export default Modal;

// export default function Modal({ children }: { children: React.ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleOpen = () => setIsOpen((s) => !s);

//   return (
//     <>
//       <div onClick={toggleOpen} className='cursor-pointer'>{children}</div>
//       {isOpen && (
//         <>
//           <div className="modal-overlay" onClick={toggleOpen}></div>
//           <div className="modal-container">
//             <div>{children}</div>
//             <div>
//               <input
//                 type="button"
//                 value="close"
//                 onClick={toggleOpen}
//                 className="hover:bg-slate-400 p-1 rounded cursor-pointer text-black border-1 border-black"
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
