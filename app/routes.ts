import {
   type RouteConfig,
   index,
   route,
   layout,
} from '@react-router/dev/routes';

export default [
   layout('./components/AppLayout/index.tsx', [
      index('./routes/home.tsx'),
      route('/:folderId', './routes/folder.tsx'),
      route('/*', './routes/not-found.tsx'),
   ]),
] satisfies RouteConfig;
