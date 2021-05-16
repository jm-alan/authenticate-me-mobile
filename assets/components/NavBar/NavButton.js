import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function NavButton ({ onPress, name, center }) {
  return (
    <Pressable
      style={
        ({ pressed }) => [
          {
            backgroundColor: pressed
              ? '#f00'
              : '#fff'
          },
          center && styles.centerButton,
          styles.button
        ]
      }
      onPress={onPress || (() => {})}
    >
      {({ pressed }) => (
        <Icon
          name={name}
          iconStyle={[
            { color: pressed ? '#fff' : '#f00' },
            styles.buttonIcon
          ]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
    borderTopColor: '#f00',
    borderTopWidth: 1
  },
  centerButton: {
    borderLeftColor: '#f00',
    borderRightColor: '#f00',
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  buttonIcon: {
    fontSize: 50
  }
});
