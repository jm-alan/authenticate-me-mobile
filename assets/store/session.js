import csrfetch from './csrfetch';

const USER = 'session/user';

const setSession = (user = null) => ({
  type: USER,
  user
});

export const RestoreUser = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session/', {});
  dispatch(setSession(user));
};

export const LogIn = userInfo => async dispatch => {
  const { user } = await csrfetch.post('/api/session/', userInfo);
  dispatch(setSession(user));
};

export const SignUp = userInfo => async dispatch => {
  const { user } = await csrfetch.post('/api/users/', userInfo);
  dispatch(setSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session/');
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
