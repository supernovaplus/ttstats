import { useDataContext } from '../store/DataContext';
import { HighestIDList, MainAPIPlayer, MainAPIPlayerHighest } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

export default function HighestIDPage() {
  const { servers } = useDataContext();
  let playersList: MainAPIPlayerHighest[] = [];

  for (const key in servers) {
    const server = servers[key];
    if (!server.loaded || !server.playersData) continue;
    server.playersData.forEach((player) => {
      playersList.push({
        index: -1,
        name: player[0],
        id: player[2],
        sname: server.sname,
      });
    });
  }

  playersList = playersList
    .sort((a, b) => b.id - a.id)
    .map((player, index) => {
      player.index = index + 1;
      return player;
    });

  if (playersList.length > 25) {
    playersList = [...playersList.splice(0, 10), ...playersList.splice(playersList.length - 10)];
  }

  return (
    <ContentBlock title="Highest and lowest player IDs currently online">
      <table className="w-full text-center">
        <thead className='sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm'>
          <tr>
            <th>#</th>
            <th>Server</th>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {!playersList.length ? (
            <tr>
              <th></th>
              <th>No Data</th>
              <th></th>
            </tr>
          ) : (
            playersList.map((player, index) => (
              <tr
                key={index}
                style={index === 0 ? { fontSize: '2em' } : {}}
                className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk">
                <td data-label="# Place">#{player.index}</td>
                <td data-label="Server">{player.sname}</td>
                <td data-label="Player">{player.name || '?'}</td>
                <td data-label="ID">{player.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </ContentBlock>
  );
}
