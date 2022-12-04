import {Dispatch, SetStateAction} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {setCurrentUserLocation} from 'redux/reducers/locationReducer';

interface geoProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const useCustomHooks = ({setModal}: geoProps) => {
  const dispatch = useDispatch();

  const _geoCallback = (res: any) => {
    console.log('_geoCallback', res);
    setModal(true);
    Geolocation.getCurrentPosition(
      position => {
        dispatch(
          setCurrentUserLocation({
            currentUserLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }),
        );
        console.log(position);
        setModal(false);
      },
      error => {
        setModal(false);
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
  };

  const _getPermission = async () => {
    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('always').then(res =>
        _geoCallback(res),
      );
    } else {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(res => _geoCallback(res))
        .catch(err => setModal(false));
    }
  };

  return {_getPermission};
};

export default useCustomHooks;
