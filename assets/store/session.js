import csrfetch from './csrfetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER = 'session/user';

const setSession = (user = null) => ({
  type: USER,
  user
});

export const RestoreUser = () => async dispatch => {
  const { user, mobileToken } = await csrfetch.get('/api/session/', {
    mobileToken: await AsyncStorage.getItem('mobileToken')
  });
  await AsyncStorage.setItem('mobileToken', mobileToken || '');
  dispatch(setSession(user));
};

export const LogIn = userInfo => async dispatch => {
  const { user, mobileToken } = await csrfetch.post(
    '/api/session/',
    JSON.stringify(userInfo)
  );
  await AsyncStorage.setItem('mobileToken', mobileToken || '');
  dispatch(setSession(user));
};

export const SignUp = userInfo => async dispatch => {
  const { user, mobileToken } = await csrfetch.post(
    '/api/users/',
    JSON.stringify(userInfo)
  );
  await AsyncStorage.setItem('mobileToken', mobileToken || '');
  dispatch(setSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session/');
  await AsyncStorage.removeItem('mobileToken');
  dispatch(setSession());
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case USER:
      return { ...state, user, loaded: true };
    default:
      return state;
  }
}
