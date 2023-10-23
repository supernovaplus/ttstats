import { MouseEvent, ReactNode, useState, useRef, useEffect } from "react";

export default function PopUnder({ button = "i", children }: { button?: string, children: ReactNode }) {
    const ref = useRef<null | HTMLDivElement>(null)

    const toggle = () => {
        if (ref.current) {
            document.querySelectorAll('.server-list-info-box').forEach(box => {
                if (box !== ref.current || !box.classList.contains("hidden")) {
                    box.classList.add("hidden")
                } else {
                    box.classList.remove("hidden")
                }
            })
        }
    }

    return <>
        <div className="inline-block">
            <button className="ml-1 w-[20px] h-[20px] bg-gray-600 rounded box-shadow-3 text-white text-shadow-1" onClick={toggle}>{button}</button>
        </div>
        <div className="mb-2 rounded border border-black p-1 hidden server-list-info-box box-shadow dark:text-white bg-gray-400 dark:bg-gray-700 text-black text-sm inner-shadow" ref={ref}>
            {children}
        </div>
    </>

    // const ref = useRef<HTMLDivElement | null>(null);


    // const handleHoverEnter = (e: MouseEvent<HTMLButtonElement>) => {
    //     if (!ref.current) return;
    //     const buttonBoundingBox = e.currentTarget.getBoundingClientRect();
    //     const popupBoundingBox = ref.current.getBoundingClientRect();
    //     ref.current.style.top = (buttonBoundingBox.y - 10 - popupBoundingBox.height) + "px";
    //     ref.current.style.left = (buttonBoundingBox.x - (popupBoundingBox.width / 2)) + "px";

    //     setTimeout(() => {
    //         if(ref.current) ref.current.classList.remove("hidden")
    //     }, 100);
    // }

    // const handleHoverLeave = (e: MouseEvent<HTMLButtonElement>) => {
    //     if (!ref.current) return;
    //     ref.current.classList.add("hidden")
    // }

    // return <div className="popup-wrapper-nov inline-block">
    //     <button onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} className="bg-red-200 w-[20px] rounded text-sm">{button}</button>
    //     <div className={`popup-nov absolute bg-black px-2 white rounded z-10 mt-1 max-w-[300px] border border-blue-600 box-shadow-1 text-center hidden`} ref={ref}>{text}</div>
    // </div>
};
