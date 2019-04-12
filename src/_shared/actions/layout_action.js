export const Actions = {
  LAYOUT_UPDATED: 'layout_updated',
};

export const layoutUpdated = (dimensions: Object) => ({
  type: Actions.LAYOUT_UPDATED,
  payload: dimensions,
});
