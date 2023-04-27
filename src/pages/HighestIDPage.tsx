import { useDataContext } from '../store/DataContext';
import { HighestIDList, MainAPIPlayer } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

export default function HighestIDPage() {
  const { servers } = useDataContext();

  const playersList: HighestIDList[] = Object.values(servers)
    .reduce(
      (acc: MainAPIPlayer[], server) =>
        server.loaded && server.playersData
          ? [...acc, ...server.playersData!.filter((player) => typeof player[2] === 'number')]
          : acc,
      []
    )
    .sort((a, b) => b[2] - a[2])
    .map((data, index) => ({
      index: index + 1,
      name: data[0],
      id: data[2],
    }));

  const sortedList =
    playersList.length > 25
      ? [
          ...playersList.splice(0, 10),
          {
            index: '...',
            name: '...',
            id: '...',
          },
          ...playersList.splice(playersList.length - 10),
        ]
      : playersList;

  return (
    <ContentBlock title="Highest and lowest player IDs currently online">
      <table className='w-full text-center'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {!sortedList.length ? (
            <tr>
              <th></th>
              <th>No Data</th>
              <th></th>
            </tr>
          ) : (
            sortedList.map((player, index) => (
              <tr key={index} style={index === 0 ? { fontSize: '2em' } : {}} className='odd:bg-kebab-odd even:bg-kebab-even'>
                <td data-label="# Place">#{player.index}</td>
                <td data-label="Player">
                  {player.name ? player.name : '?'}
                </td>
                <td data-label="ID">{player.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </ContentBlock>
  );
}
