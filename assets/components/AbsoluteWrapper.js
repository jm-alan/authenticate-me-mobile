import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function AbsoluteWrapper ({ children }) {
  return (
    <View style={styles.absoluteWrap}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteWrap: {
    position: 'absolute',
    height: '86%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});
