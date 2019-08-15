import React, {Component} from 'react';
import {connect} from 'react-redux';
import posterNone from '../img/poster_none.png';

class ListElement extends Component{
  constructor(){
    super()
    this.state = {display: 'none', image: ''}

  }
  componentDidMount(){
    this.setState({image: this.props.image})
    if (this.props.image === undefined || this.props.image === null){
      this.setState({image: posterNone})
    }
  }
  onChangeBigScreen(){
    if (this.state.display == 'none') {
        this.state.display = 'flex';
    }else{
      this.state.display = 'none';
    }
    this.setState({display: this.state.display})
  }
  onErrorImage(){
    this.state.image = posterNone
    this.setState({image: this.state.image})
  }
  render(){
    let display = {display: this.state.display};
    let genres = this.props.genres.join(', ');
    let description;
    if (this.props.description == undefined){
      description = 'Отуствует';
    }else{
      description = this.props.description
    }
    return(
      <React.Fragment>
        <div className='film' onClick={this.onChangeBigScreen.bind(this)}>
          <h3 className='filmName'>
            {this.props.localName}
          </h3>
          <div>
            <span>{this.props.name}</span>
            <span className='filmRating'>{this.props.rating}</span>
          </div>
        </div>
        <div className='bigScreenFilmWrap' style={display}>
          <div className='blackBackground'>
          </div>
          <div className='bigScreenFilm'>
            <span onClick={this.onChangeBigScreen.bind(this)}>&#9668;</span>
            <div className='filmDesctiptionWrap'>
              <div>
                <img src={this.state.image} onError={this.onErrorImage.bind(this)} alt='Sorry, there is no photo :('/>
                <div className='otherFilmData'>
                  <span className='filmGenres'>{genres}</span>
                  <span className='filmRating'>{this.props.rating}</span>
                </div>
                <span></span>
              </div>
              <div className='filmDesctiption'>
                <h4>{this.props.localName}</h4>
                <span>{this.props.name}({this.props.year})</span>
                <h5>Описание:</h5>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ListElement;
