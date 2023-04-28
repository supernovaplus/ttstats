import ContentBlock from '../components/ContentBlock';

export default function UptimePage() {
  return (
    <ContentBlock title="Uptime">
      <iframe src="https://uptime.ttstats.eu/"></iframe>
    </ContentBlock>
  );
}
