import ContentBlock from './ContentBlock';

export default function Page404() {
  return (
    <ContentBlock title="Error 404">
      <p className="w-full flex justify-center py-20 text-center">
        Error 404
        <br />
        Page not found
      </p>
    </ContentBlock>
  );
}
