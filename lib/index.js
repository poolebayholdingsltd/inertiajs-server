"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var process = _interopRequireWildcard(require("process"));

var _http = require("http");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const readableToString = readable => new Promise((resolve, reject) => {
  let data = '';
  readable.on('data', chunk => data += chunk);
  readable.on('end', () => resolve(data));
  readable.on('error', err => reject(err));
});

var _default = (render, port) => {
  const _port = port || 13714;

  const routes = {
    '/health': async () => ({
      status: 'OK',
      timestamp: Date.now()
    }),
    '/shutdown': () => process.exit(),
    '/render': async request => render(JSON.parse(await readableToString(request))),
    '/404': async () => ({
      status: 'NOT_FOUND',
      timestamp: Date.now()
    })
  };
  (0, _http.createServer)(async (request, response) => {
    const dispatchRoute = routes[request.url] || routes['/404'];
    const server = 'Inertia.js SSR';

    try {
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Server': server
      });
      response.write(JSON.stringify(await dispatchRoute(request)));
    } catch (e) {
      response.writeHead(500, {
        'Content-Type': 'text/html',
        'Server': server
      });
      response.write(e.stack);
      console.error(e);
    }

    response.end();
  }).listen(_port, () => console.log('Inertia SSR server started.'));
  console.log(`Starting SSR server on port ${_port}...`);
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJyZWFkYWJsZVRvU3RyaW5nIiwicmVhZGFibGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJvbiIsImNodW5rIiwiZXJyIiwicmVuZGVyIiwicG9ydCIsIl9wb3J0Iiwicm91dGVzIiwic3RhdHVzIiwidGltZXN0YW1wIiwiRGF0ZSIsIm5vdyIsInByb2Nlc3MiLCJleGl0IiwicmVxdWVzdCIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlIiwiZGlzcGF0Y2hSb3V0ZSIsInVybCIsIndyaXRlSGVhZCIsIndyaXRlIiwic3RyaW5naWZ5IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImVuZCIsImxpc3RlbiIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFNQSxNQUFNQSxnQkFBZ0UsR0FBSUMsUUFBRCxJQUFjLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEgsTUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFDQUosRUFBQUEsUUFBUSxDQUFDSyxFQUFULENBQVksTUFBWixFQUFxQkMsS0FBRCxJQUFZRixJQUFJLElBQUlFLEtBQXhDO0FBQ0FOLEVBQUFBLFFBQVEsQ0FBQ0ssRUFBVCxDQUFZLEtBQVosRUFBbUIsTUFBTUgsT0FBTyxDQUFDRSxJQUFELENBQWhDO0FBQ0FKLEVBQUFBLFFBQVEsQ0FBQ0ssRUFBVCxDQUFZLE9BQVosRUFBc0JFLEdBQUQsSUFBU0osTUFBTSxDQUFDSSxHQUFELENBQXBDO0FBQ0QsQ0FMc0YsQ0FBdkY7O2VBT2UsQ0FBQ0MsTUFBRCxFQUFzQkMsSUFBdEIsS0FBOEM7QUFDM0QsUUFBTUMsS0FBSyxHQUFHRCxJQUFJLElBQUksS0FBdEI7O0FBRUEsUUFBTUUsTUFBb0MsR0FBRztBQUMzQyxlQUFZLGFBQWE7QUFBRUMsTUFBQUEsTUFBTSxFQUFFLElBQVY7QUFBZ0JDLE1BQUFBLFNBQVMsRUFBRUMsSUFBSSxDQUFDQyxHQUFMO0FBQTNCLEtBQWIsQ0FEK0I7QUFFM0MsaUJBQWEsTUFBTUMsT0FBTyxDQUFDQyxJQUFSLEVBRndCO0FBRzNDLGVBQVcsTUFBT0MsT0FBUCxJQUFtQlYsTUFBTSxDQUFDVyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxNQUFNckIsZ0JBQWdCLENBQUNtQixPQUFELENBQWpDLENBQUQsQ0FITztBQUkzQyxZQUFRLGFBQWE7QUFBRU4sTUFBQUEsTUFBTSxFQUFFLFdBQVY7QUFBdUJDLE1BQUFBLFNBQVMsRUFBRUMsSUFBSSxDQUFDQyxHQUFMO0FBQWxDLEtBQWI7QUFKbUMsR0FBN0M7QUFPQSwwQkFBYSxPQUFPRyxPQUFQLEVBQWdCRyxRQUFoQixLQUE2QjtBQUN4QyxVQUFNQyxhQUFhLEdBQUdYLE1BQU0sQ0FBVU8sT0FBTyxDQUFDSyxHQUFsQixDQUFOLElBQWdDWixNQUFNLENBQUMsTUFBRCxDQUE1RDs7QUFFQSxRQUFJO0FBQ0ZVLE1BQUFBLFFBQVEsQ0FBQ0csU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUFFLHdCQUFnQixrQkFBbEI7QUFBc0Msa0JBQVU7QUFBaEQsT0FBeEI7QUFDQUgsTUFBQUEsUUFBUSxDQUFDSSxLQUFULENBQWVOLElBQUksQ0FBQ08sU0FBTCxDQUFlLE1BQU1KLGFBQWEsQ0FBQ0osT0FBRCxDQUFsQyxDQUFmO0FBQ0QsS0FIRCxDQUdFLE9BQU9TLENBQVAsRUFBVTtBQUNWQyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNEOztBQUVETixJQUFBQSxRQUFRLENBQUNTLEdBQVQ7QUFDRCxHQVhELEVBV0dDLE1BWEgsQ0FXVXJCLEtBWFYsRUFXaUIsTUFBTWtCLE9BQU8sQ0FBQ0ksR0FBUixDQUFZLDZCQUFaLENBWHZCO0FBYUFKLEVBQUFBLE9BQU8sQ0FBQ0ksR0FBUixDQUFhLCtCQUE4QnRCLEtBQU0sS0FBakQ7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJ1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyLCBJbmNvbWluZ01lc3NhZ2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFnZSwgSW5lcnRpYUFwcFJlc3BvbnNlIH0gZnJvbSAnQGluZXJ0aWFqcy9pbmVydGlhJ1xuXG50eXBlIEFwcENhbGxiYWNrID0gKHBhZ2U6IFBhZ2UpID0+IEluZXJ0aWFBcHBSZXNwb25zZVxudHlwZSBSb3V0ZUhhbmRsZXIgPSAocmVxdWVzdDogSW5jb21pbmdNZXNzYWdlKSA9PiBQcm9taXNlPHVua25vd24+XG5cbmNvbnN0IHJlYWRhYmxlVG9TdHJpbmc6IChyZWFkYWJsZTogSW5jb21pbmdNZXNzYWdlKSA9PiBQcm9taXNlPHN0cmluZz4gPSAocmVhZGFibGUpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgbGV0IGRhdGEgPSAnJ1xuICByZWFkYWJsZS5vbignZGF0YScsIChjaHVuaykgPT4gKGRhdGEgKz0gY2h1bmspKVxuICByZWFkYWJsZS5vbignZW5kJywgKCkgPT4gcmVzb2x2ZShkYXRhKSlcbiAgcmVhZGFibGUub24oJ2Vycm9yJywgKGVycikgPT4gcmVqZWN0KGVycikpXG59KVxuXG5leHBvcnQgZGVmYXVsdCAocmVuZGVyOiBBcHBDYWxsYmFjaywgcG9ydD86IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBfcG9ydCA9IHBvcnQgfHwgMTM3MTRcblxuICBjb25zdCByb3V0ZXM6IFJlY29yZDxzdHJpbmcsIFJvdXRlSGFuZGxlcj4gPSB7XG4gICAgJy9oZWFsdGgnIDogYXN5bmMgKCkgPT4gKHsgc3RhdHVzOiAnT0snLCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSksXG4gICAgJy9zaHV0ZG93bic6ICgpID0+IHByb2Nlc3MuZXhpdCgpLFxuICAgICcvcmVuZGVyJzogYXN5bmMgKHJlcXVlc3QpID0+IHJlbmRlcihKU09OLnBhcnNlKGF3YWl0IHJlYWRhYmxlVG9TdHJpbmcocmVxdWVzdCkpKSxcbiAgICAnLzQwNCc6IGFzeW5jICgpID0+ICh7IHN0YXR1czogJ05PVF9GT1VORCcsIHRpbWVzdGFtcDogRGF0ZS5ub3coKSB9KSxcbiAgfVxuXG4gIGNyZWF0ZVNlcnZlcihhc3luYyAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBkaXNwYXRjaFJvdXRlID0gcm91dGVzWzxzdHJpbmc+IHJlcXVlc3QudXJsXSB8fCByb3V0ZXNbJy80MDQnXVxuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1NlcnZlcic6ICdJbmVydGlhLmpzIFNTUicgfSlcbiAgICAgIHJlc3BvbnNlLndyaXRlKEpTT04uc3RyaW5naWZ5KGF3YWl0IGRpc3BhdGNoUm91dGUocmVxdWVzdCkpKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICB9XG5cbiAgICByZXNwb25zZS5lbmQoKVxuICB9KS5saXN0ZW4oX3BvcnQsICgpID0+IGNvbnNvbGUubG9nKCdJbmVydGlhIFNTUiBzZXJ2ZXIgc3RhcnRlZC4nKSlcblxuICBjb25zb2xlLmxvZyhgU3RhcnRpbmcgU1NSIHNlcnZlciBvbiBwb3J0ICR7X3BvcnR9Li4uYClcbn1cbiJdfQ==