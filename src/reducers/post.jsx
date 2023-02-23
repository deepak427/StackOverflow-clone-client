const postReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "POST_SOMETHING":
      return { ...state };
    case "POST_COMMENT":
      return { ...state };
    case "FETCH_ALL_POSTS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default postReducer;
