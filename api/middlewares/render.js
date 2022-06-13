import { matchRoutes } from 'react-router-config';
import Routes from '../../client/routes';
import renderer from '../../helpers/renderer';
import createStore from '../../helpers/createStore';

export default async function render(req, res) {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise(resolve => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises)
    .then(async () => {
      const context = {};

      const content = await renderer(req, store, context);
      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }
      res.send(content);
    })
    .catch(e => {
      console.log('RENDER ERROR', e);
    });
}
