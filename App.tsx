import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import {linking} from './src/navigation/linking';
import OfflineBanner from './src/components/OfflineBanner';
import {useNetworkStatus} from './src/hooks/useNetworkStatus';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <NavigationContainer linking={linking}>
            <AppShell />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function AppShell(): React.JSX.Element {
  const isOnline = useNetworkStatus();
  return (
    <View style={styles.container}>
      <RootNavigator />
      <OfflineBanner visible={!isOnline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
});

export default App;
