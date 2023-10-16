import {Text, Button} from 'react-native';
import React from 'react';
import {Box} from '../../utils/theme';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import useSWR from 'swr';
import {fetcher} from '../../services/config';

const HomeScreen = () => {
  const {data, isLoading} = useSWR('/categories', fetcher);
  console.log(`data`, JSON.stringify(data, null, 2));
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
