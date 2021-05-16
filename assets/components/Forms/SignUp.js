import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';

import Form from './index';
import Home from '../Home';
import { SignUp } from '../../store/session';
import { SetCurrent } from '../../store/appPage';

export default function SignupForm () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPassRef = useRef(null);

  const onSubmit = () => {
    setErrors([]);
    if (password === repeatPassword) {
      dispatch(SignUp({ username, email, password }))
        .catch(err => setErrors(err.errors));
    } else setErrors(['Passwords do not match']);
  };

  if (user) {
    dispatch(SetCurrent(Home));
    return null;
  }

  return (
    <Form errors={errors}>
      <TextInput
        value={username}
        ref={usernameRef}
        style={styles.input}
        blurOnSubmit={false}
        onChangeText={text => setUsername(text)}
        onSubmitEditing={() => emailRef.current.focus()}
      />
      <TextInput
        value={email}
        ref={emailRef}
        style={styles.input}
        blurOnSubmit={false}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <TextInput
        value={password}
        ref={passwordRef}
        style={styles.input}
        blurOnSubmit={false}
        onChangeText={text => setPassword(text)}
        onSubmitEditing={() => repeatPassRef.current.focus()}
      />
      <TextInput
        ref={repeatPassRef}
        style={styles.input}
        value={repeatPassword}
        onSubmitEditing={onSubmit}
        onChangeText={text => setRepeatPassword(text)}
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
