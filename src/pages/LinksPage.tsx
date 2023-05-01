import ContentBlock from '../components/ContentBlock';
import { links } from '../data/links';

export default function LinksPage() {
  return (
    <ContentBlock title="Useful links">
      <div className="flex flex-col items-center min-h-[100px] my-5">
        <table className="w-full max-w-[500px] text-center">
          <tbody>
            {links.map(({ url, title, domain }) => (
              <tr className='odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk'>
                <td className="w-1/2 p-2">{title}</td>
                <td className="w-1/2 p-2">
                  <a href={url} target="_blank" className="underline underline-offset-8 hover:text-blue-700 dark:hover:text-blue-300">
                    {domain}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentBlock>
  );
}
