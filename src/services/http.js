import auth from './auth';
import { toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;

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

        toast.error(`Wystąpił błąd podczas wykonywania operacji: ${data.message}`);

        throw data;
      }

      if (method !== 'get') {
        toast.success('Operacja zakończona powodzeniem');
      }

      return data;
    });
}
