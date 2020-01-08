import React, { Component } from 'react';
import './App.css';

class User extends Component {
  render() {
    return (
        <div className="container">
        <div className="content">
            <div className="contentInfo">
                <div className="imgContent">
                    <img className="avatar" src="img.jpg" />
                </div>
                <div>
                    <p>Sang</p>
                </div>
            </div>
            <div className="col-sm-4 col-md-3 tab">
                <ul id="myTab" className="nav nav-tabs nav-top-border mt-80" role="tablist">
                    <li className="nav-item"><a className="nav-link active" href="#description" data-toggle="tab">Bài đăng</a></li>
                    <li className="nav-item"><a className="nav-link" href="#specs" data-toggle="tab">Yêu thích</a></li>
                </ul>
                <div className="tab-content pt-20">
                    <div role="tabpanel" className="tab-pane active" id="description">
                        <div className="imgPostContent">
                            <img className="imgPost" src="img.jpg"/>
                            <img className="imgPost" src="img.jpg"/>
                        </div>
                        <div className="imgPostContent">
                            <img className="imgPost" src="img.jpg"/>
                            <img className="imgPost" src="img.jpg"/>
                        </div>
                        <div className="imgPostContent">
                            <img className="imgPost" src="img.jpg"/>
                            <img className="imgPost" src="img.jpg"/>
                        </div>
                        <div className="imgPostContent">
                            <img className="imgPost" src="img.jpg"/>
                        </div>
                    </div>

                    <div role="tabpanel" className="tab-pane fade" id="specs">
                        <div className="table-responsive">

                        </div>
                    </div>
                </div>
        </div>
        </div>
        </div>
    )
  }
}

export default User;