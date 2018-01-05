export function reportError(dispatch, meta, error) {
  console.error(error);
  const payload = { error };
  dispatch({ type: COMPONENT_ACTIONS.FAILURE, payload, meta });
}
