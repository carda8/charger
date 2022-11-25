import {commonTypes} from '@types';
import {_delAPI, _getAPI, _postAPI, _putAPI} from 'api/apiModules';

export default {
  // user
  _postSaveUserInfo: async (params: commonTypes.saveUserDB) => {
    const res = await _postAPI('login', params);
    return res;
  },
  _putEditUserInfo: async (params: commonTypes.saveUserDB) => {
    const res = await _putAPI('users', params);
    return res;
  },
  _getUserInfo: async (params: any) => {
    const res = await _getAPI('users', params);
    return res;
  },
  _getUserHistory: async (params: any) => {
    const res = await _getAPI('search/histories', params);
    return res;
  },
  _postUserHistory: async (params: any) => {
    const res = await _postAPI('search/histories', params);
    return res;
  },
  _postUserAddr: async (params: any) => {
    const res = await _postAPI('address', params);
    return res;
  },
  _deleteUserHistory: async (params: any) => {
    const res = await _delAPI('search/histories', params);
    return res;
  },
  _delUserRetire: async (params: any) => {
    const res = await _delAPI('users', params);
    return res;
  },
  // common
  _getCarInfoList: async (params: any) => {
    const res = await _getAPI('car-infos', params);
    return res;
  },

  //favorite
  _postUserStar: async (params: any) => {
    const res = await _postAPI('search/favorites', params);
    return res;
  },
  _getUserStar: async (params: any) => {
    const res = await _getAPI('search/favorites', params);
    return res;
  },
  _deleteUserStar: async (params: any) => {
    const res = await _delAPI('search/favorites', params);
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

  _getSearchAddr: async (params: any) => {
    const res = await _getAPI('search/address', params);
    return res;
  },

  _postSearchBase: async (params: any) => {
    const res = await _postAPI('search/base', params);
    return res;
  },
};
