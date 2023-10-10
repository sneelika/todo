import {Text, Button} from 'react-native';
import React from 'react';
import {Box} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigateToSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text>SignInScreen</Text>
        <Button title="Navigate to Sign In" onPress={navigateToSignInScreen} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
