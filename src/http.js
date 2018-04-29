import auth from './auth';

const baseURL = 'http://localhost:1337/';

export default function (path, method = 'get', body = null) {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method,
    body: body && JSON.stringify(body),
  };

  if (auth.jwt) {
    options.headers.set('Authorization', `Bearer ${auth.jwt}`);
  }

  return fetch(`${baseURL}${path}`, options)
    .then(response => Promise.all([
      response.ok,
      response.json(),
    ]))
    .then(([isOK, data]) => {
      if (!isOK) {
        if (data.statusCode === 401) {
          auth.setJWT(null);
        }

        throw data;
      }
      return data;
    });
}
