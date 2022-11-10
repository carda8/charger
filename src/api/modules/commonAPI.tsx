import {commonTypes} from '@types';
import {_getAPI, _postAPI} from 'api/apiModules';

export default {
  // user
  _postSaveUserInfo: async (params: commonTypes.saveUserDB) => {
    const res = await _postAPI('login', params);
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

  _postSearchStationCoor: async (params: any) => {
    const res = await _postAPI('search/stations', params);
    return res;
  },

  _postPathRecommend: async (params: any) => {
    const res = await _postAPI('recommend/stations', params);
    return res;
  },

  _getPathLine: async (params: any) => {
    const res = await _getAPI('search/route', params);
    return res;
  },

  _getAddrByCoor: async (params: any) => {
    const res = await _getAPI('search/address/geo', params);
    return res;
  },
};
