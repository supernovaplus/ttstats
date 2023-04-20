import PageWrapper from '../components/PageWrapper';
import { useDataContext } from '../store/DataContext';

export default function ServersRawPage() {
  const { servers } = useDataContext();
  return (
    <PageWrapper title="potato">
      <pre>{JSON.stringify(servers, null, 4)}</pre>
    </PageWrapper>
  );
}
