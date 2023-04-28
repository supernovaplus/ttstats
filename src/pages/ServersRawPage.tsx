import ContentBlock from '../components/ContentBlock';

import { useDataContext } from '../store/DataContext';

export default function ServersRawPage() {
  const { servers } = useDataContext();
  return (
    <ContentBlock>
      <ContentBlock title="potato">
        <pre className="overflow-scroll max-w-[700px] max-h-[700px] box-border">
          {JSON.stringify(servers, null, 4)}
        </pre>
      </ContentBlock>
    </ContentBlock>
  );
}
