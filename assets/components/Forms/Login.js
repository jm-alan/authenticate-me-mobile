import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';

import Form from './index';
import { LogIn } from '../../store/session';
import { GoHome } from '../../store/appPage';

export default function LoginForm () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const identificationRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = () => {
    setErrors([]);
    if (identification && password) {
      dispatch(LogIn({ identification, password }))
        .catch(err => setErrors(err.errors));
    } else setErrors(['Please enter a username and password']);
  };

  if (user) {
    dispatch(GoHome());
    return null;
  }

  return (
    <Form errors={errors}>
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        value={identification}
        ref={identificationRef}
        placeholder='Username or email'
        onChangeText={text => setIdentification(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <TextInput
        value={password}
        ref={passwordRef}
        style={styles.input}
        onSubmitEditing={onSubmit}
        placeholder='Password'
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
    </Form>
  );
}

const styles = StyleSheet.create({
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
