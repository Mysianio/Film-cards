import React, {Component} from 'react';
import '../index.css';
import ListElement from './ListElement.js';
import {connect} from 'react-redux';
import {getFilmsData} from '../actions/filmsData.js'

class List extends Component{
  constructor(props){
    super(props);
    this.state = {sort: 'По убыванию', buttonsStyle: '-200px', selectSort:'По рейтингу'}
  }
  componentDidMount(){
    this.props.onGetFilmsData('https://s3-eu-west-1.amazonaws.com/sequeniatesttask/films.json')
  }
  onChangeSort(){
    if(this.state.sort == 'По возрастанию'){
      this.state.sort = 'По убыванию';
    }else{
      this.state.sort = 'По возрастанию';
    }
    this.setState({sort: this.state.sort})
  }
  onChangeSortType(){
    if(this.state.selectSort == 'По году'){
      this.state.selectSort= 'По рейтингу';
    }else{
      this.state.selectSort = 'По году';
    }
    this.setState({sort: 'По возрастанию'})
    this.setState({selectSort: this.state.selectSort})
  }
  onOpenPanel(){
      if(this.state.buttonsStyle == '-200px'){
        this.setState({buttonsStyle: '0px'})
      }else{
        this.setState({buttonsStyle: '-200px'})
      }
  }
  onClosePanel(e){
    if ((e.target.className !== 'serviceButtons' && e.target.tagName !== 'INPUT' && e.target.innerHTML !== 'Отсортировать по:') && this.state.buttonsStyle == '0px'){
      this.setState({buttonsStyle: '-200px'})
    }
  }
  render(){
    let list, yearList, filmsList, buttonsStyle, flexDer, flexWrap;
    if (this.props.films !== undefined){
        list = this.props.films.map((item, index) =>{
          return <ListElement key={index} name={item.name} localName={item.localized_name}
          rating={item.rating} year = {item.year} description={item.description} image={item.image_url} genres={item.genres}/>
        })
      if(this.state.selectSort == 'По рейтингу'){
        let filmYear = [];
        flexDer = 'column';
        flexWrap = 'noWrap';
        for (let i = 0; i < this.props.films.length; i++) {
          if (filmYear.length != 0) {
            let counter = 0;
            for (let j = 0; j < filmYear.length; j++) {
              if (filmYear[j] == this.props.films[i].year){
                counter++
              }
            }
            if (counter == 0) {
              filmYear.push(this.props.films[i].year)
            }
          }else{
            filmYear.push(this.props.films[i].year)
          }
        }
        yearList = filmYear.sort()
        if (this.state.sort == 'По возрастанию'){
          yearList.reverse()
        }
        filmsList= yearList.map((item, index) =>{
          let indexCounter = [];
          let elList = list.map((listFragment,index) =>{
            if (listFragment.props.year == item){
              return <React.Fragment key={index}>{listFragment}</React.Fragment>
            }
          })
          for (let i = 0; i < elList.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < elList.length; j++) {
              if(elList[i] != undefined && elList[j] != undefined){
                if (elList[i].props.children.props.rating <= elList[j].props.children.props.rating) {
                  min = j;
                }
              }
            }
            let temp = elList[i];
            elList[i] = elList[min];
            elList[min] = temp;
          }
          return <div key={index} className='filmsYear'><h2>Фильмы {item} года</h2><div className='filmWrap'>{elList}</div></div>
        })
      }else{
        flexDer = 'row';
        flexWrap ='wrap';
        let counter=0;
        for (let i = 0; i < list.length; i++) {
          if(list[i].props.rating === null || list[i].props.rating == undefined){
            let temp = list[list.length-counter];
            list[list.length-counter] = list[i];
            list[i] = temp;
            counter++;
          }
        }
        if(this.state.sort == 'По возрастанию'){
          for (let i = 0; i < list.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < list.length; j++) {
              if(list[i] != undefined && list[j] != undefined){
                if (list[i].props.rating <= list[j].props.rating && list[i].props.rating != null && list[j].props.rating != null) {
                  min = j;
                }
              }
            }
            let temp = list[i];
            list[i] = list[min];
            list[min] = temp;
          }
        }else{
          for (let i = 0; i < list.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < list.length; j++) {
              if(list[i] != undefined && list[j] != undefined){
                if (list[i].props.rating >= list[j].props.rating && list[i].props.rating != null && list[j].props.rating != null) {
                  min = j;
                }
              }
            }
            let temp = list[i];
            list[i] = list[min];
            list[min] = temp;
          }
        }
        filmsList = list.map((item, index) =>{
          return <div className='ratingSortedList'>{item}</div>
        })
      }
    }else{
      list = 'loading...'
    }
    return(
      <div onClick={this.onClosePanel.bind(this)} className='filmsWrap' style={{flexDirection: flexDer, flexWrap: flexWrap}}>
        <span onClick={this.onOpenPanel.bind(this)}>&equiv;</span>
        <div className='serviceButtons' style={{top:  this.state.buttonsStyle}}>
          <span>Отсортировать по:</span>
          <input onClick={this.onChangeSort.bind(this)} type='submit' value={this.state.sort}/>
          <input onClick={this.onChangeSortType.bind(this)} type='submit' value={this.state.selectSort}/>
        </div>
        {filmsList}
      </div>
    )
  }
}

export default connect(
  state =>({
    films: state.listElementData.films
  }),
  dispatch =>({
    onGetFilmsData: (url) =>{
      dispatch(getFilmsData(url))
    }
  })
)(List)
