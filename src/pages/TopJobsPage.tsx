import TopJobsHistory from '../components/TopJobsPageComponents/TopJobsHistory';
import TopJobsLive from '../components/TopJobsPageComponents/TopJobsLive';
import ContentBlock from '../components/ContentBlock';

export default function TopJobsPage() {
  return (
    <>
      <TopJobsLive />
      <TopJobsHistory />
    </>
  );
}
