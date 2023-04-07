import { ReactNode } from 'react';
import { useState } from 'react';

type LinksPropType = { links: [{ iconSvgPath: any; text: string; link?: string }, ...{ text: string; link: string }[]] };
/**
 * first param needs a
 */
export default function SidebarItemWrapper({ links: [firstLink, ...rest] }: LinksPropType) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((s) => !s);
  const { iconSvgPath, text, link = null } = firstLink;

  //multiple links with dropdown
  if (rest.length > 0) {
    return (
      <li>
        <button type="button" className="active flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700" aria-controls="dropdown-playground" onClick={() => toggleOpen()}>
          <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            {iconSvgPath}
          </svg>
          <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item="">
            {text}
          </span>
          <svg sidebar-toggle-item="" className={'w-6 h-6 rotatable-icon ' + (isOpen ? ' rotate-icon' : '')} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <ul id="dropdown-playground" className={`space-y-2 py-2`} hidden={!isOpen}>
          {rest.map(({ text, link }, index) => (
            <li key={index}>
              <a href={link} className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700 ">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  } else {
    //single link, no dropdown
    return (
      <li>
        <a href={link || '#'} className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
          <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            {iconSvgPath}
          </svg>
          <span className="ml-3" sidebar-toggle-item="">
            {text}
          </span>
        </a>
      </li>
    );
  }
}
