import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import LoginForm from '../Forms/Login';
import Home from '../Home';
import NavButton from './NavButton';
import { SetCurrent } from '../../store/appPage';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const onPressHome = () => dispatch(SetCurrent(Home));
  const onPressLogin = () => dispatch(SetCurrent(LoginForm));

  return (
    <View style={styles.container}>
      <NavButton name='menu' />
      <NavButton
        name='home'
        center='true'
        onPress={onPressHome}
      />
      <NavButton
        name={user ? 'face' : 'login'}
        onPress={user ? () => {} : onPressLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '7%',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  }
});
