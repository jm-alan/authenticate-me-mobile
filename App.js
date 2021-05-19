import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';

import configureStore from './assets/store/index';
import NavBar from './assets/components/NavBar/index';
import AbsoluteWrapper from './assets/components/AbsoluteWrapper';
import Home from './assets/components/Home';
import { restoreCSRF } from './assets/store/csrfetch';
import { RestoreUser } from './assets/store/session';
import { SetCurrent } from './assets/store/appPage';

const store = configureStore();

function App () {
  const dispatch = useDispatch();

  const Current = useSelector(state => state.appPage.Current);

  useEffect(() => {
    restoreCSRF();
    dispatch(RestoreUser());
    dispatch(SetCurrent(Home));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <AbsoluteWrapper>
        {Current && <Current />}
      </AbsoluteWrapper>
      <NavBar />
    </SafeAreaView>
  );
}

export default function Root () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// I've started including this object equality comparator in every project
// to which I contribute because I always wind up needing it somewhere.
// Works on anything with key:value pairs, including objects, arrays, AND classes,
// with any level of nesting (though obviously the deeper the nesting the more
// expensive running this function becomes)
// Eventually planning to convert this to a typescript interface
// As an example, it correctly returns true for two objects containing:
// const obj2 = {
//   1: 'five',
//   two: () => {
//     const forever = 72;
//     return forever;
//   },
//   abracadabra: 'alakazam',
//   array: [],
//   deepArray: [[], [], []],
//   mixedArray: [{}, {}, {}],
//   otherObject: {
//     evenDeeperArray: [],
//     evenDeeperArray2: []
//   }
// };

// Takes in two objects to compare
Object.deepEq = function ($, _) {
  // Explicitly not designed to compare two primitives at the top level; returns false if both
  // arguments passed are not objects. Will not compare functions directly, as those can simply
  // be cast directly to string manually, though it will cast methods to string to compare them.
  if (
    !$ || !_ ||
    typeof $ !== 'object' ||
    typeof _ !== 'object'
  ) return false;
  // If they are, extract Object.values of each and store in two arrays
  const [$$, __] = [$, _].map(Object.values);
  // Compare the number of values; if they aren't the same length, then it's
  // impossible for them to have deep equality
  if ($$.length !== __.length) return false;
  // If they're of the same length, iterate through all the keys in object A
  for (const $_ in $$) {
    if (
      // If, at the same key, the two values are not of the same type, or
      typeof $$[+$_] !== typeof __[+$_] ||
      // If they are functions which, when cast to string, differ, or
      (
        typeof $$[+$_] === 'function' &&
        $$[+$_].toString() !== __[+$_].toString()
      ) ||
      // If they are of the same type and not 'object' or 'function' type, but fail strict
      // equality, or
      (
        typeof $$[+$_] !== 'object' &&
        typeof $$[+$_] !== 'function' &&
        $$[+$_] !== __[+$_]
      ) ||
      // if they are objects which are not null and not recursively deeply equal, or
      (
        typeof $$[+$_] === 'object' &&
        $$[+$_] !== null &&
        !Object.deepEq($$[+$_], __[+$_])
      ) ||
      // if one is null and the other is not
      ($$[+$_] === null && $$[+$_] !== __[+$_])
      // then fail
    ) return false;
  }
  return true;
};
