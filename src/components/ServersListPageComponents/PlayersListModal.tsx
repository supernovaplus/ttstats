import { ServerDataObject } from '../../types/serverTypes';

export default function PlayersListModal({ server }: { server: ServerDataObject }) {
  return (
    <div className="text-center">
      {!server.playersData || !server.playersData.length ? (
        <div>No Players</div>
      ) : (
        <div className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <table className="w-full dyntable">
            <thead className='sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm'>
              <tr>
                <th>Avatar</th>
                <th>#</th>
                <th>Name #ID</th>
                <th>Job</th>
              </tr>
            </thead>
            <tbody>
              {server.playersData.map((player, index) => (
                <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk">
                  <td data-label="Avatar">
                    {player[3] ? (
                      <img loading="lazy" src={player[3] || '#'} height="50px" alt="img" className="h-[50px] block" />
                    ) : (
                      // <img className="no-avatar" src="media/no-avatar.gif" alt="-" />
                      <div style={{ width: '50px', height: '50px' }} className="bg-black block"></div>
                    )}
                  </td>
                  <td data-label="#">#{index + 1}</td>
                  <td data-label="Name #ID">
                    {player[0]} <span className={'text-xs text-white bg-black p-1 rounded'}>#{player[2]}</span>
                    {player[4] && <span className={'p-1 bg-red-800 ml-1 rounded text-xs'}>Staff</span>}
                    {player[6] && <span className={'bg-orange-700 p-1 rounded ml-1 text-xs'}>Donator</span>}
                  </td>
                  <td data-label="Job">{player[5] || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
