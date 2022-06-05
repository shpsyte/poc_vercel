export const FETCH_JOBS = 'fetch_jobs';
export const fetchJobs = () => async (dispatch, getState, api) => {
  const res = await api.get('/v1/talentpool');
  dispatch({
    type: FETCH_JOBS,
    payload: res.data.result,
  });
};
