import { useEffect, useState } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { getCacheStr } from '../../controllers/misc';
import { serversList } from '../../data/serversList';
import { NavLink } from 'react-router-dom';
import businessData from '../../data/businessData';
const localCacheKey = 'api_biz_data_v1.';

interface BizServer {
  endpoint: string;
  charges: number;
}

export default function BusinessPage() {
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    localStorage.getItem('');
  }, []);

  return (
    <ContentBlock title="Business">
      <div className="flex justify-end">
        <NavLink
          to={`/user/settings`}
          className={({ isActive }) =>
            ` lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block`
          }>
          API settings
        </NavLink>
      </div>
      <div className="flex h-10 align-middle justify-center">
        <div className="flex flex-col justify-center">
          <p>Server</p>
        </div>
        <select
          defaultValue=""
          className="p-0 m-0 ml-1 block w-full my-1 cursor-pointer text-center bg-gray-600 border border-gray-600 text-white">
          <option value="" disabled>
            Select server
          </option>
          {serversList
            .filter((server) => server.apiKeyAllow)
            .map((server, index) => (
              <option value={server.apiname} key={index}>
                {server.name}
              </option>
            ))}
        </select>
      </div>
      <button className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block w-full max-w-[200px] m-auto">
        Get Businesses
      </button>
      <div className="flex flex-col">
        {businessData.map((biz) => (
          <div>{biz.name}</div>
        ))}
      </div>
    </ContentBlock>
  );
}
