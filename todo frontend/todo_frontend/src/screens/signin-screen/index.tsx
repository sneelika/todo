import React from 'react';
import {Box, Text} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import Button from '../../components/shared/button';
import Input from '../../components/shared/input';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {loginUser} from '../../services/api';
import {IUser} from '../../types';
import {login} from '../../store/actions';

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const dispatch = useDispatch();
  const navigateToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Omit<IUser, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Omit<IUser, 'name'>) => {
    try {
      const {email, password} = data;
      const _user = await loginUser({
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      });
      dispatch(login(_user.token));
    } catch (error) {}
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back !
        </Text>
        <Box mb="6" />

        <Input label="Email" />
        <Box mb="6" />
        <Input label="Password" />
        <Box height={44} />

        <Pressable onPress={navigateToSignUpScreen}>
          <Text color="primary" textAlign="right">
            Don't have an account? Register
          </Text>
        </Pressable>
        <Box mb="5.5" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
