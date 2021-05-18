import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GoHome } from '../../store/appPage';

export default function Form ({ children, titleText }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);

  if (user) {
    dispatch(GoHome());
    return null;
  }

  children.forEach(({ props: { style } }) => {
    for (const styleProp in styles.input) {
      style[styleProp] = styles.input[styleProp];
    }
  });

  return loaded && (
    <>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>
          {titleText}
        </Text>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 75,
    marginBottom: 50
  },
  formContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
});
