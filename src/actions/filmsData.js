export function getFilmsDataSuccsess(data){
  return {
    type: "FETCH_LIST_ELEMENT_DATA",
    data
  }
}

export function getFilmsData(url){
  return (dispatch)=>{
    fetch(url,  {method: 'GET'})
      .then(response =>{
        if(!response.ok){
          console.log('Error');
        }
        return response;
      })
      .then(response=> response.json())
      .then(data => dispatch(getFilmsDataSuccsess(data)))
  }
}
