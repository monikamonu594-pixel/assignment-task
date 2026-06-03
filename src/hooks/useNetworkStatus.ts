import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setOnline} from '../redux/slices/uiSlice';

export function useNetworkStatus(): boolean {
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(s => s.ui.isOnline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online =
        Boolean(state.isConnected) && state.isInternetReachable !== false;
      dispatch(setOnline(online));
    });
    NetInfo.fetch().then(state => {
      const online =
        Boolean(state.isConnected) && state.isInternetReachable !== false;
      dispatch(setOnline(online));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return isOnline;
}
