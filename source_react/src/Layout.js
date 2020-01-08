import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home'
import SearchResult from './searchResult'
import WriteRecipe from './WriteRecipe';
import LogIn from './User';
import Nav from './Nav';

class Layout extends Component {
  state = {
    keyword: ''
  }

  handleSearch = (keyword) => {
    this.setState({
      keyword
    })
  }

  render() {
    return (
      <div>
        <Nav handleSearch={this.handleSearch}/>
          <Switch>
            <Route path="/" exact render={() => <Home keyword={this.state.keyword} />} />
            <Route path="/searchresults" exact render={() => <SearchResult keyword={this.state.keyword} />} />
            <Route path="/writerecipe" component={WriteRecipe} />
            <Route path="/user" component={LogIn} />
          </Switch>
      </div>
    )
  }
}

export default Layout;