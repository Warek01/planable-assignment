import {
   type RouteConfig,
   index,
   route,
   layout,
} from '@react-router/dev/routes';

export default [
   layout('./components/AppLayout/index.tsx', [
      index('./routes/home.tsx'),
      route('/:folder', './routes/folder.tsx'),
   ]),
] satisfies RouteConfig;
