import axios from 'axios';

export const fetchRecords = () => {
  return async (dispatch) => {
    dispatch({ type: 'GETINGS_RECORDS' });
    const { data } = await axios.get('http://178.128.196.163:3000/api/records');
    dispatch({
      type: 'GET_RECORDS',
      payload: data,
    });
  };
};

export const deleteRecordAPI = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      'http://178.128.196.163:3000/api/records/' + id
    );
    dispatch({
      type: 'DELETE_RECORD',
      payload: id,
    });
  };
};

export const addRecordAPI = (newRecord) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      'http://178.128.196.163:3000/api/records/',
      {
        data: newRecord,
      }
    );
    dispatch(fetchRecords());
  };
};

export const changeRecordAPI = ({ _id, name, age }) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      'http://178.128.196.163:3000/api/records/' + _id,
      {
        data: { name, age },
      }
    );
    dispatch(fetchRecords());
  };
};
