import { useDataContext } from '../store/DataContext';
import { MainAPIPlayerHighest } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';
import { useState } from 'react';

export default function HighestIDPage() {
  const [showFull, setShowFull] = useState(false);
  const { servers } = useDataContext();
  let playersList: MainAPIPlayerHighest[] = [];

  for (const key in servers) {
    const server = servers[key];
    if (!server.loaded || !server.playersData || !server.apiname) continue;
    server.playersData.forEach((player) => {
      playersList.push({
        index: -1,
        name: player[0],
        id: player[2],
        sname: server.sname,
      });
    });
  }

  if (playersList.length) {
    playersList = playersList
      .sort((a, b) => b.id - a.id)
      .map((player, index) => {
        player.index = index + 1;
        return player;
      });

    if (!showFull && playersList.length > 21) {
      playersList = [...playersList.splice(0, 11), ...playersList.splice(playersList.length - 10)];
    }
  }

  return (
    <ContentBlock title="Highest and lowest player IDs online">
      <div className="border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
        <table className="w-full text-center dyntable">
          <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3">
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
              playersList.map((player, index) =>
                !showFull && index === 10 ? (
                  <tr
                    key={index}
                    className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-d select-none">
                    <td>⠀</td>
                    <td>⠀</td>
                    <td>⠀</td>
                    <td>⠀</td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    style={index === 0 ? { fontSize: '2em' } : {}}
                    className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk">
                    <td data-label="# Place">#{player.index}</td>
                    <td data-label="Server">{player.sname}</td>
                    <td data-label="Player">{player.name || '?'}</td>
                    <td data-label="ID">{player.id}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
      {playersList.length > 20 && (
        <input
          type="button"
          className="mt-3 cursor-pointer block m-auto bg-gray-400 px-2 dark:bg-nova-c3"
          value={!showFull ? 'show all' : 'show less'}
          onClick={() => setShowFull((s) => !s)}
        />
      )}
    </ContentBlock>
  );
}
