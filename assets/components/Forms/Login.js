import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native';

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
    <Form
      errors={errors}
      titleText='Log In'
    >
      <TextInput
        style={{}}
        blurOnSubmit={false}
        value={identification}
        ref={identificationRef}
        placeholder='Username or email'
        onChangeText={text => setIdentification(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <TextInput
        style={{}}
        value={password}
        ref={passwordRef}
        onSubmitEditing={onSubmit}
        placeholder='Password'
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
    </Form>
  );
}
