import React, { Component } from 'react';
import Masonry from 'react-masonry-infinite';
import shortid from 'shortid';
import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      load: true,
    };
  }

  images = [require('./img/ct.jpg'), require('./img/gk.jpg'), require('./img/pz.jpg'), require('./img/bx.jpg'), require('./img/bb.jpg')];

  getRandomElement = array => array[Math.floor(Math.random() * array.length)];

  generateElements = () => [...Array(10).keys()].map(() => {
    const newImg = new Image()
    newImg.onload = () => {
    }
    newImg.src = this.getRandomElement(this.images)
    return {
      key: shortid.generate(),
      img: newImg,
    };
  });

  componentWillMount() {
    this.setState(state => ({
      elements: state.elements.concat(this.generateElements())
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

  render() {
    console.log(this.state.elements)
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
              this.state.elements.map(({ key, img }) =>
                <div key={key} className="post" style={{ height: `${img.height / img.width * 456.14 + 122}` }}>
                  <h2>Username</h2>
                  <img className="post-img" src={img.src} alt="" />
                  <div className="post-body">
                    <ul className="post-react flex flex-wrap align-items-center">
                      <li><i className="fa fa-heart-o fa-3x"></i></li>
                      <li><i className="fa fa-comments-o fa-3x"></i></li>
                      <li><i className="fa fa-share-alt fa-3x"></i></li>
                    </ul>
                    <h1 className="post-content">Content</h1>
                  </div>
                </div>
              )
            }
          </Masonry>) : null}
        </div>
      </div>
    );
  }
}

export default Home;