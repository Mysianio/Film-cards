export default function listElementData(state = [], action){
  switch (action.type) {
    case 'FETCH_LIST_ELEMENT_DATA':
      return action.data
      break;
    default:
      return state;
  }
}
