export const Actions = {
  ON_MAP_READY: 'on_map_ready',
  RESET_WIDTH: 'reset_width',
  TRAVEL_MODE_CHANGED: 'travel_mode_changed',
};

export const onMapReady = (value: Object) => ({
  type: Actions.ON_MAP_READY,
  payload: value,
});

export const resetWidth = () => ({
  type: Actions.RESET_WIDTH,
  payload: 0,
});

export const travelModeChanged = (mode: string) => ({
  type: Actions.TRAVEL_MODE_CHANGED,
  payload: mode,
});
