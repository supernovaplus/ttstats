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
            <div className="modal-container modal-center">
              <ContentBlock title={title}>
                <div>{children}</div>
                <div
                  className="flex justify-end bg-nova-c1 pb-2 px-2 mt-2"
                  style={{ marginBottom: '-8px', marginLeft: '-8px', marginRight: '-8px' }}>
                  <button
                    onClick={toggleOpen}
                    className="inline-flex items-center px-3 mt-2 text-sm text-white lnk-btn bg-nova-c1 dark:bg-nova-c3">
                    CLOSE
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
