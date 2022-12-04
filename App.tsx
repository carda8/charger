import React from 'react';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from 'react-query';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StatusBar} from 'react-native';
import MainStack from '@screens/navigator/MainStack';

const qeuryClient = new QueryClient({});

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Provider store={store}>
        {/* <QueryClientProvider client={qeuryClient}> */}
        <MainStack />
        {/* </QueryClientProvider> */}
      </Provider>
    </>
  );
};

export default App;
