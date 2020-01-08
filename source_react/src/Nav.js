import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.setState({keyword: event.target.value})
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.keyword);
    window.location.href="/searchresults";
  }

  render() {
    const {keyword} = this.state;
    return (
        <div>
            <div className="header">
                <Link to="/"><img className="header__logo" src={require("./img/full_logo.png")} alt="" /></Link>
                <form className="search">
                    <input type="text" className="search__field" placeholder="Tìm kiếm món ăn, nguyên liệu,..." onChange={this.handleSearch} value={keyword}/>
                    <button className="btn search__btn" onClick={this.onClick}><i className="fa fa-search"></i>Tìm Kiếm</button>
                </form>
                <div className="icons__bar">
                    <ul className="icons flex flex-wrap align-items-center">
                        <li><a href=""><i className="fa fa-heart-o fa-3x"></i></a></li>
                        <Link to="/login"><li><a href=""><i className="fa fa-user-o fa-3x"></i></a></li></Link>
                    </ul>
                </div>
            </div>
            <ScrollButton scrollStepInPx="50" delayInMs="15" />
            <Link to="/writerecipe"><button className="btn add__btn" data-toggle="tooltip" title="Viết món ăn mới"><i
                className="fa fa-pencil-square-o"></i></button></Link>
        </div>
    )
  }
}

class ScrollButton extends React.Component {
    constructor() {
      super();
      this.state = {
        intervalId: 0,
        hasScrolled: false
      };
    }
  
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll)
    }
  
    onScroll = () => {
      (window.pageYOffset <= 100) ?
        this.setState({ hasScrolled: true }) : this.setState({ hasScrolled: false })
    }
  
    scrollStep() {
      if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
  
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
  
    render() {
      return <button title='Trở về đầu trang' className='btn top__btn' id="scroll-to-top"
        onClick={() => { this.scrollToTop(); }}>
        <span className='fa fa-arrow-up'></span>
      </button>;
    }
  }

export default Nav;