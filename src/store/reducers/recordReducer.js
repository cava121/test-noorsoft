const initialState = {
  records: [],
  loading: false,
};

export const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETINGS_RECORDS':
      return { ...state, loading: true };
    case 'GET_RECORDS':
      return {
        ...state,
        loading: false,
        records: action.payload,
      };
    case 'DELETE_RECORD':
      return {
        ...state,
        records: state.records.filter((record) => record._id != action.payload),
      };
    default:
      return state;
  }
};
