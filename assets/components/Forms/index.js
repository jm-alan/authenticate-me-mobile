import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GoHome } from '../../store/appPage';

export default function Form ({ children }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);

  if (user) {
    dispatch(GoHome());
    return null;
  }

  return loaded && (
    <View style={styles.formContainer}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#f00',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
