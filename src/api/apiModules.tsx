import {API} from './API';
import {ErrorHandler} from './ErrorHandler';

export const _getAPI = async (url: string, params: any) => {
  const resGet = await API.get(url)
    .then(result => {
      return result;
    })
    .catch(e => {
      const data = {
        error: e,
        url: url,
        params: params,
      };
      ErrorHandler(data);
      console.log('## ERROR GET API');
      console.log('## ERROR URL', url);
      console.log('## ERROR PARAMS ', params);
    });
  if (resGet) return resGet;
};

export const _postAPI = async (url: string, params: any) => {
  console.log('url', url, params);
  // API.post('hi', {{data: dat}})
  const resGet = await API.post(url, params)
    .then(result => {
      return result;
    })
    .catch(e => {
      const data = {
        error: e,
        url: url,
        params: params,
      };
      ErrorHandler(data);
      console.log('## ERROR GET API', e);
      console.log('## ERROR URL', url);
      console.log('## ERROR PARAMS ', params);
    });
  if (resGet) return resGet;
};

export const _delAPI = async (url: string, params: any) => {
  const resGet = await API.delete(url, params)
    .then(result => {
      return result;
    })
    .catch(e => {
      const data = {
        error: e,
        url: url,
        params: params,
      };
      ErrorHandler(data);
      console.log('## ERROR GET API');
      console.log('## ERROR URL', url);
      console.log('## ERROR PARAMS ', params);
    });
  if (resGet) return resGet;
};
