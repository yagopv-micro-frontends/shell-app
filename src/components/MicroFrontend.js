import React, { useEffect } from 'react';

export default function MicroFrontend({ name, host, history }) {
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name.toLowerCase()}`;
    const renderMicroFrontend = () => {
      window[`render${name}`] &&
        window[`render${name}`](`${name.toLowerCase()}-container`, { history });
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const promises = Object.keys(manifest['files'])
          .filter((key) => key.endsWith('.js'))
          .reduce((sum, key) => {
            sum.push(
              new Promise((resolve) => {
                const path = `${host}${manifest['files'][key]}`;
                const script = document.createElement('script');
                if (key === 'main.js') {
                  script.id = scriptId;
                }
                script.onload = () => {
                  resolve();
                };
                script.src = path;
                document.head.appendChild(script);
              })
            );
            return sum;
          }, []);
        Promise.allSettled(promises).then(() => {
          renderMicroFrontend();
        });
      });

    return () => {
      window[`unMount${name}`] &&
        window[`unMount${name}`](`${name.toLowerCase()}-container`);
    };
  }, [name, host, history]);

  return <main id={`${name.toLowerCase()}-container`} />;
}
