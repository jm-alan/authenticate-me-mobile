import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native';

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
        style={{}}
        value={username}
        ref={usernameRef}
        blurOnSubmit={false}
        onChangeText={text => setUsername(text)}
        onSubmitEditing={() => emailRef.current.focus()}
      />
      <TextInput
        style={{}}
        value={email}
        ref={emailRef}
        blurOnSubmit={false}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <TextInput
        style={{}}
        value={password}
        ref={passwordRef}
        blurOnSubmit={false}
        onChangeText={text => setPassword(text)}
        onSubmitEditing={() => repeatPassRef.current.focus()}
      />
      <TextInput
        style={{}}
        ref={repeatPassRef}
        value={repeatPassword}
        onSubmitEditing={onSubmit}
        onChangeText={text => setRepeatPassword(text)}
      />
    </Form>
  );
}
