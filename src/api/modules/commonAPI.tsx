import {commonTypes} from '@types';
import {_getAPI, _postAPI} from 'api/apiModules';

export default {
  // user
  _postSaveUserInfo: async (params: any) => {
    const res = await _postAPI('users', params);
    return res;
  },
  _getUserInfo: async (params: any) => {
    const res = await _getAPI('users', params);
    return res;
  },

  // station
  _postStation: async (params: any) => {
    const res = await _postAPI('users', params);
    return res;
  },

  _postStationPath: async (params: any) => {
    const res = await _postAPI('users', params);
    return res;
  },

  _postAruondStation: async (params: any) => {
    const res = await _postAPI('search/autocomplete', params);
    return res;
  },
};
