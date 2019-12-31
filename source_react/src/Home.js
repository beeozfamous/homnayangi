import React, { Component } from 'react';
import Masonry from 'react-masonry-infinite';
import shortid from 'shortid';
import './App.css';
import data from './data/data.json'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      elements: [],
      load: true,
    };
  }

  // images = [require('./img/ct.jpg'), require('./img/gk.jpg'), require('./img/pz.jpg'), require('./img/bx.jpg'), require('./img/bb.jpg'), 'https://upload.wikimedia.org/wikipedia/commons/0/0a/OffHN_10_2008_1.jpg?fbclid=IwAR0yHttwqz_jilTzFJjWLQxNvUJvZzfnKevm6IsgDcMMAC6gR2rzKPNweWk'];

  // getRandomElement = array => array[Math.floor(Math.random() * array.length)];

  generateElements = () => [...Array(10).keys()].map((item, index) => {
    const newImg = new Image()
    newImg.onload = () => {
    }
    const imgs = data.map(item => item.img)
    console.log(data[index])
    newImg.src = imgs[index][0]
    return {
      key: shortid.generate(),
      img: newImg,
      username: data[index].username,
      content: data[index].name
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
    console.log(this.state.elements[0].img.src)
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
                  <img className="post-img" src={item.img.src} alt="" />
                  <div className="post-body">
                    <ul className="post-react flex flex-wrap align-items-center">
                      <li><i className="fa fa-heart-o fa-3x"></i></li>
                      <li><i className="fa fa-comments-o fa-3x"></i></li>
                      <li><i className="fa fa-share-alt fa-3x"></i></li>
                    </ul>
                    <h1 className="post-content">{item.content}</h1>
                  </div>
                </div>
              ))
            }
          </Masonry>) : null}
        </div>
      </div>
    );
  }
}

export default Home;