import React from 'react';
import {Box, Text} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>();

  const navigateToSigInScreen = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text>WelcomeScreen</Text>
        <Button title="Navigate to sign in" onPress={navigateToSigInScreen} />
        <Button title="Navigate to sign up" onPress={navigateToSignUpScreen} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
