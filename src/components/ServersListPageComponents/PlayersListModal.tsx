import { ServerDataObject } from '../../types/serverTypes';

export default function PlayersListModal({ server }: { server: ServerDataObject }) {
  return (
    <div className="text-center">
      {!server.playersData || !server.playersData.length ? (
        <div>No Players</div>
      ) : (
        <div
          className="overflow-y-auto border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1"
          style={{ maxHeight: '80vh' }}>
          <table className="w-full">
            <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3" style={{ zIndex: 2 }}>
              <tr>
                <th></th>
                <th>Name, ID, Job</th>
              </tr>
            </thead>
            <tbody>
              {server.playersData.map((player, index) => (
                <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk z-0">
                  <td data-label="Avatar" className="relative w-[50px]">
                    <div style={{ maxHeight: '50px', minHeight: '50px' }} className="inline-flex text-left">
                      <div className="relative float-left bg-transparent text-white text-xs px-1 pt-9 rounded z-1 left-[50%] text-center text-shadow-2  " style={{ width: '50px', height: '50px' }}>
                        #{index + 1}
                      </div>
                      {player[3] ? (
                        <img
                          loading="lazy"
                          src={player[3] || '#'}
                          alt="img"
                          className="w-full"
                          referrerPolicy="no-referrer"
                          style={{ width: '50px', height: '50px' }}
                        />
                      ) : (
                        // <img className="no-avatar" src="media/no-avatar.gif" alt="-" />
                        <div
                          style={{ width: '50px', height: '50px' }}
                          className="bg-black items-center flex justify-center text-gray-700 select-none">
                          ?
                        </div>
                      )}
                    </div>
                  </td>
                  <td data-label="Name #ID">
                    {player[0]}{' '}
                    {!!player[2] && (
                      <span
                        className={'text-xs bg-nova-c1 text-white dark:bg-nova-c3 p-1 rounded text-shadow-1'}>
                        #{player[2]}
                      </span>
                    )}
                    {player[5] && (
                      <span className={'bg-yellow-500 p-1 rounded ml-1 text-xs text-black text-shadow-none'}>
                        {player[5]}
                      </span>
                    )}
                    {player[4] && (
                      <span
                        className={
                          'p-1 bg-red-800 ml-1 rounded text-xs text-white select-none text-shadow-1'
                        }>
                        Staff
                      </span>
                    )}
                    {player[6] && (
                      <span
                        className={
                          'bg-orange-700 p-1 rounded ml-1 text-xs text-white select-none text-shadow-1'
                        }>
                        Donator
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
