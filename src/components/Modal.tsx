import { useState, ReactNode, ButtonHTMLAttributes } from 'react';
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
                <button
                  onClick={toggleOpen}
                  className="text-sm text-white lnk-btn bg-nova-c3 dark:bg-nova-c3 w-full mt-2">
                  CLOSE
                </button>
              </ContentBlock>
            </div>
          </>
        ),
        modalRoot
      )}
    </>
  );
}
