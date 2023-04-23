import React, { useState, useEffect, ReactNode, ButtonHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import ContentBlock from './ContentBlock';

interface props {
  children: ReactNode;
  buttonValue: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  title?: string;
}

export default function Modal({ children, buttonProps = {}, buttonValue, title }: props) {
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
            <div className="modal-overlay" onClick={toggleOpen}></div>
            <div className="modal-container">
              <ContentBlock title={title}>
                <div>{children}</div>
                <div className="flex justify-end">
                  <button onClick={toggleOpen} className="bg-white px-3 py-1 rounded text-black mt-2">
                    close
                  </button>
                </div>
              </ContentBlock>
            </div>
          </>
        ),
        modalRoot
      )}
    </>
  );
}
