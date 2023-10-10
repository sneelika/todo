import React from 'react';
import AuthStackNavigator from './auth-stack-navigator';
import {NavigationContainer} from '@react-navigation/native';
import AppstackNavigator from './app-stack-navigator';

const Navigation = () => {
  const user = true;

  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      <AppstackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
