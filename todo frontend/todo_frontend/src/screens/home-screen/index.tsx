import {Text, Button} from 'react-native';
import React from 'react';
import {Box} from '../../utils/theme';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';

const HomeScreen = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
