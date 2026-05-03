if (!self.Ultraviolet) {
    importScripts('uv.bundle.js?v=6');
}
if (!self.__uv$config) {
    importScripts('uv.config.js?v=6');
}
if (!self.UVServiceWorker) {
    importScripts(__uv$config.sw || 'uv.sw.js?v=6');
}

const uvServiceWorker = self.__frostedUvServiceWorker || new self.UVServiceWorker();
self.__frostedUvServiceWorker = uvServiceWorker;

let config = {
    blocklist: new Set(),
};


async function serve404() {
    const errorHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Frosted | Error</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap");
        :root {
            --bg-1: #03111f;
            --bg-2: #0a2337;
            --panel: rgba(6, 18, 33, 0.72);
            --line: rgba(145, 198, 255, 0.24);
            --text: #ebf6ff;
            --muted: #9bb9d6;
            --accent: #7fd3ff;
        }
        * { box-sizing: border-box; }
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: "Outfit", system-ui, sans-serif;
            color: var(--text);
            background: radial-gradient(circle at 15% 15%, #123d5c 0%, var(--bg-1) 40%, var(--bg-2) 100%);
        }
        #noise {
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: 0.08;
            background-image: radial-gradient(#ffffff 0.8px, transparent 0.8px);
            background-size: 6px 6px;
        }
        .wrap {
            position: relative;
            z-index: 2;
            width: min(92vw, 740px);
            margin: 8vh auto 0;
            padding: 28px;
            border: 1px solid var(--line);
            border-radius: 18px;
            background: var(--panel);
            backdrop-filter: blur(8px);
            text-align: center;
            box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
        }
        .badge {
            display: inline-block;
            margin-bottom: 12px;
            padding: 5px 12px;
            border: 1px solid var(--line);
            border-radius: 999px;
            color: var(--accent);
            letter-spacing: 0.08em;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        h1 {
            margin: 0 0 12px;
            font-size: clamp(30px, 6vw, 52px);
            line-height: 1.05;
            letter-spacing: -0.02em;
        }
        p {
            margin: 0;
            color: var(--muted);
            font-size: clamp(14px, 2vw, 18px);
            line-height: 1.55;
        }
        .actions {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        button {
            border: 1px solid var(--line);
            border-radius: 10px;
            background: rgba(127, 211, 255, 0.15);
            color: var(--text);
            padding: 10px 16px;
            font: inherit;
            font-weight: 600;
            cursor: pointer;
        }
        button:hover { background: rgba(127, 211, 255, 0.24); }
        .footer {
            position: fixed;
            bottom: 16px;
            left: 0;
            right: 0;
            text-align: center;
            color: #7d9dbd;
            letter-spacing: 0.18em;
            font-size: 11px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div id="noise"></div>
    <main class="wrap">
        <div class="badge">Frosted</div>
        <h1>Frosted | Error</h1>
        <p>This page could not be loaded through UV.<br />please contact mrdavidss@discord.</p>
        <div class="actions">
            <button onclick="window.top.location.reload()">Refresh</button>
        </div>
    </main>
    <div class="footer">FROSTED</div>
    <script>
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: 'uv-error' }, '*');
        }
    </script>
</body>
</html>`;

    return new Response(errorHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
    });
}

async function handleRequest(event) {
    if (uvServiceWorker.route(event)) {
        try {
            const response = await uvServiceWorker.fetch(event);

            if ([404, 500, 502, 503].includes(response.status)) {
                return await serve404();
            }

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
                const cloned = response.clone();
                const text = await cloned.text();
                if (text.includes('Error processing your request') || text.includes('uv-error-code')) {
                    return await serve404();
                }
            }

            return response;
        } catch (err) {
            // Catches non-existent sites (DNS errors)
            return await serve404();
        }
    }
    return await fetch(event.request);
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.blocklist) {
        config.blocklist = new Set(event.data.blocklist);
    }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
