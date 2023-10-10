import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box} from '../utils/theme';

export default function Button() {
  return (
    <Box bg="primary" p="4" borderRadius="rounded-3xl">
      <Text>button button button button</Text>
    </Box>
  );
}

const styles = StyleSheet.create({});
