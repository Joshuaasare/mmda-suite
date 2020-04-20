/*
 * @Author: Joshua Asare
 * @Date: 2019-11-01 17:14:07
 * @Last Modified by:   Joshua Asare
 * @Last Modified time: 2019-11-01 17:14:07
 */


import { InteractionManager } from 'react-native';

export default {
  ...InteractionManager,
  runAfterInteractions: (f) => {
    // ensure f get called, timeout at 500ms
    // @gre workaround https://github.com/facebook/react-native/issues/8624
    let called = false;
    const timeout = setTimeout(() => {
      called = true;
      f();
    }, 500);
    InteractionManager.runAfterInteractions(() => {
      if (called) return;
      clearTimeout(timeout);
      f();
    });
  },
};
