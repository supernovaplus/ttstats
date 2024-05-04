import { useState } from 'react';

export default function DatawrapperChart({ chartId }: { chartId: string }) {
  const [loaded, setIsLoaded] = useState(false);

  const onIframeLoad = () => setIsLoaded(true);

  return (
    <>
      <div className="relative overflow-hidden" style={{ paddingBottom: '100px' }}>
        {!loaded && <div>Loading chart...</div>}
        <iframe
          aria-label="Interactive line chart"
          id={`datawrapper-chart-${chartId}`}
          src={`https://datawrapper.dwcdn.net/${chartId}/`}
          style={{
            position: 'absolute',
            top: '-60px',
            left: 0,
            right: 0,
            width: '100%',
            height: '180px',
            border: 'none',
          }}
          className="w-full"
          data-external="1"
          onLoad={onIframeLoad}></iframe>
      </div>
    </>
  );
}
