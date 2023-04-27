import { ServerDataObject } from '../../types/serverTypes';

export default function PlayersListModal({ server }: { server: ServerDataObject }) {
  return (
    <div className="text-center">
      {!server.playersData || server.playersData.length === 0 ? (
        <h2>No Players</h2>
      ) : (
        <div className="overflow-y-scroll" style={{ maxHeight: '80vh' }}>
          <table className="w-full dyntable">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>#</th>
                <th>Name #ID</th>
                <th>Job</th>
              </tr>
            </thead>
            <tbody>
              {server.playersData.map((player, index) => (
                <tr key={index} className="even:bg-kebab-even odd:bg-kebab-odd">
                  <td data-label="Avatar">
                    {player[3] ? (
                      <a href={player[3]} target="_blank" rel="noopener noreferrer" className="inline-block">
                        <img src={player[3] || '#'} height="50px" alt="img" className="h-[50px] block" />
                      </a>
                    ) : (
                      // <img className="no-avatar" src="media/no-avatar.gif" alt="-" />
                      <div style={{ width: '50px', height: '50px' }} className='bg-black inline-block'></div>
                    )}
                  </td>
                  <td data-label="#">#{index + 1}</td>
                  <td data-label="Name #ID">
                    {player[0]} <small className={'mg'}>#{player[2]}</small>
                    {player[4] && <small className={'bg-blue mg'}>Staff</small>}
                    {player[6] && <small className={'bg-orange mg'}>Donator</small>}
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
