const CURRENT = 'page/Current';

export const SetCurrent = Current => ({
  type: CURRENT,
  Current
});

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { Current: null },
  { type, Current }
) {
  switch (type) {
    case CURRENT:
      return { ...state, Current };
    default:
      return state;
  }
}
