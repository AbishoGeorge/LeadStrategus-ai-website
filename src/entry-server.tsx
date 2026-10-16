import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom';
import { Writable } from 'node:stream';
import { routes } from './App';
import { getPrerenderRoutes } from './lib/seo';

export { getPrerenderRoutes };

const handler = createStaticHandler(routes);

export async function render(pathname: string): Promise<{ html: string; head: string }> {
  const context = await handler.query(new Request(`https://leadstrategus.ai${pathname}`));
  if (context instanceof Response) {
    throw new Error(`Route ${pathname} returned a redirect/response; cannot prerender`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = await new Promise<string>((resolve, reject) => {
    let out = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        out += chunk.toString();
        cb();
      },
      final(cb) {
        resolve(out);
        cb();
      },
    });
    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      }
    );
  });

  const h = helmetContext.helmet!;
  const head = [h.title, h.meta, h.link, h.script].map((t) => t.toString()).join('\n    ');
  return { html, head };
}
