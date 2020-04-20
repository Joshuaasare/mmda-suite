/**
 * @Author: joshuaasare
 * @Date:   2019-03-06 08:46:09
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-11-01 17:05:31
 */

function generateEventId(e) {
  const pseudoEventId = Math.random();
  for (let i = 0; i < e.length; i += 1) {
    if (pseudoEventId === e.id) generateEventId(e);
    return pseudoEventId;
  }
  return pseudoEventId;
}

// eslint-disable-next-line
export const eventListener = (function() {
  const events = {};
  return {
    dispatch: (event) => {
      if (!events[event]) return;
      for (let i = 0; i < events[event].length; i += 1) events[event][i].function();
    },
    subscribe: (event, callback) => {
      if (!events[event]) events[event] = [];
      const eventId = generateEventId(events[event]);
      //  const eventId = Math.random();
      events[event].push({ id: eventId, function: callback });
      return eventId;
    },
    unsubscribe: (event, id) => {
      if (!events[event]) return;
      for (let i = 0; i < events[event].length; i += 1) {
        if (id === events[event][i]) {
          events[event].splice(i, 1);
          return;
        }
      }
    },
  };
})();

export default eventListener;
