import Root from './handlers/Root';
import Blog from './handlers/Blog';

export default [
  {
    pattern: '/',
    component: Root,
    routes: [
      {
        pattern: 'blog/:postName/',
        component: Blog
      }
    ]
  }
];
