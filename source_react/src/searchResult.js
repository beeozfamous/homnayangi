import React, { Component } from 'react';
import Masonry from 'react-masonry-infinite';
import shortid from 'shortid';
import './App.css';
import searchData from './data/data.json'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="row">
            <img className="col" src={this.props.img.src}></img>
            <div className="col detail scroll-bar">
              <div className="closeBtn" onClick={this.props.closePopup}><i className="fa fa-times fa-3x"></i></div>
              <h1>{this.props.name}</h1>
              <h2>viết bởi: {this.props.username}</h2>
              <div>
                <p className="title">Nguyên liệu:</p>
                <ul className="content">
                  {this.props.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="title">Các bước:</p>
                <ul className="content">
                  {this.props.steps.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      load: true,
      showPopUp: false,
      dataPopUp: {},
      isLiked: false,
      searchResults: []
    };
  }
//   generateElements = (keyword) => [...Array(10).keys()].map((item, index) => {
//     this.setState.searchResults = data.filter(item => this.searchFor(keyword, item))
//     const newImg = new Image()
//     const imgs = this.state.searchResults.map(item => item.img)
//     newImg.src = imgs[index][0]
//     return {
//       key: shortid.generate(),
//       img: newImg,
//       username: this.state.searchResults[index].username,
//       name: this.state.searchResults[index].name,
//       ingredients: this.state.searchResults[index].ingredients,
//       steps: this.state.searchResults[index].steps,
//       isLiked: false,
//     };
//   });

//   componentWillMount(keyword) {
//     this.setState(state => ({
//       elements: state.elements.concat(this.generateElements(keyword))
//     }))
//   }

//   componentDidMount() {
//     this.setState(state => ({
//       searchResults: state.elements
//     }))
//   }

//   componentWillUnmount = () => {
//     this.setState({
//       elements: []
//     })
//   }

//   loadMore = (keyword) => setTimeout(() => this.setState(state => ({
//     elements: state.elements.concat(this.generateElements(keyword)),
//   })), 2500);

  generateElements = () => [...Array(10).keys()].map((item, index) => {
    console.log();
    const newImg = new Image()
    const imgs = searchData.map(item => item.img)
    newImg.src = imgs[index][0]
    return {
      key: shortid.generate(),
      img: newImg,
      username: searchData[index].username,
      name: searchData[index].name,
      ingredients: searchData[index].ingredients,
      steps: searchData[index].steps,
      isLiked: false,
    };
  });

  componentWillMount() {
    this.setState(state => ({
      elements: state.elements.concat(this.generateElements())
    }))
  }

  componentDidMount() {
    this.setState(state => ({
      searchResults: state.elements
    }))
  }

  componentWillUnmount = () => {
    this.setState({
      elements: []
    })
  }

  loadMore = () => setTimeout(() => this.setState(state => ({
    elements: state.elements.concat(this.generateElements()),
  })), 2500);

  clickLike = (key) => {
    this.setState({
      dataPopUp: this.state.elements.map(item => item.isLiked = item.key === key ? item.key === key && !item.isLiked : item.isLiked),
    });
  }

  togglePopup = (key) => {
    this.setState({
      dataPopUp: this.state.elements.filter(item => item.key === key)[0],
      showPopup: !this.state.showPopup
    });
  }

  change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }

  searchFor = (keyword, item) => {
    return this.change_alias(item.name).toLowerCase().includes(this.change_alias(keyword).toLowerCase());
  }

  componentWillReceiveProps({keyword}) {
    this.setState({
      searchResults : keyword === '' ? this.state.elements : this.state.elements.filter(item => this.searchFor(keyword, item) === true)
    })
  }

  render() {
    // console.log(this.state.elements)
      // const { keyword } = this.props
      // console.log(keyword)

    // const searchResults = keyword === '' ? this.state.elements : this.state.elements.filter(item => this.searchFor(keyword, item) === true)

    const {searchResults} = this.state
    // console.log('searchResults', searchResults)
    return (
      <div>
        <div className="container">
          {this.state.elements ? (<Masonry
            className="masonry"
            hasMore={this.state.hasMore}
            loader={
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube" />
                <div className="sk-cube2 sk-cube" />
                <div className="sk-cube4 sk-cube" />
                <div className="sk-cube3 sk-cube" />
              </div>
            }
            loadMore={this.loadMore}
          >
            {
              this.state.elements.map(item => (
                <div key={item.key} className="post" style={{ height: `${item.img.height / item.img.width * 456.14 + 122}` }}>
                  <h2>{item.username}</h2>
                  <img className="post-img" src={item.img.src} alt="" onClick={() => this.togglePopup(item.key)} style={{ cursor: "pointer" }} />
                  <div className="post-body">
                    <ul className="post-react flex flex-wrap align-items-center">
                      <li><i className={item.isLiked ? "fa fa-heart fa-3x" : "fa fa-heart-o fa-3x"} onClick={() => this.clickLike(item.key)} style={{ cursor: "pointer" }}></i></li>
                      <li><i className="fa fa-comments-o fa-3x"></i></li>
                      <li><i className="fa fa-share-alt fa-3x"></i></li>
                    </ul>
                    <h1 className="post-content">{item.name}</h1>
                  </div>
                </div>
              ))
            }
          </Masonry>) : null}
        </div>
        {this.state.showPopup ?
          <Popup
            img={this.state.dataPopUp.img}
            name={this.state.dataPopUp.name}
            ingredients={this.state.dataPopUp.ingredients}
            steps={this.state.dataPopUp.steps}
            username={this.state.dataPopUp.username}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

export default SearchResults;