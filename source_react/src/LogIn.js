import React, { Component } from 'react';
import './Log.css';
import { render } from 'react-dom';
import {Link,Redirect} from "react-router-dom";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            loginData:''
        };
        this.handleEmailChange=this.handleEmailChange.bind();
        this.handlePasswordChange=this.handlePasswordChange.bind();
        this.handleLogin=this.handleLogin.bind();

    }

handleEmailChange= e => {
   this.setState({email: e.target.value});
};
handlePasswordChange= e => {
   this.setState({password: e.target.value});
   console.log(this.state.email +this.state.password)
};

handleLogin=()=> {
    // fetch('http://127.0.0.1:6969/listRecipe')
    //  .then((response) => {
    //  return response.json();
    // })
    // .then((json) => {
    //   this.setState({
    //     list:json
    //   });
    // });
    // console.log(this.state.list);

let formData = new FormData();

formData.append('email', this.state.email);
formData.append('password',this.state.password);

  // options.body = new FormData();
  //   options.body.append("email","kienBTX@gmail.com");
  //   options.body.append("password","123456");
  //   console.log(options);
fetch("http://127.0.0.1:6969/login",
{
    headers: {
        "access-control-allow-origin" : "*"},
    method: 'POST',
    body:formData
  })
     .then((response) => {
     return response.json();
    })
    .then((json) => {
      this.setState({
        loginData:json
      });
    });
console.log(this.state.loginData)
};

    render() {
        const isLoggedIn = this.state.loginData;
            if (isLoggedIn!=="" ) {
                    console.log("iamhere")
                    return <Redirect to="/"/>;
    } else {
    }
        return (
            <div className="container_login">
                <div className="signin-content">
                    <div className="signin-image">
                        <img src={require("./img/login.jpg")} alt="sign up image" />
                        <p className="signup-question">Bạn chưa có tài khoản?</p>
                        <a href="/signup" className="signup-image-link">Đăng kí tài khoản mới</a>
                        <a href="/" className="signup-image-link">Tiếp tục sử dụng ẩn danh</a>
                    </div>

                    <div className="signin-form">
                        
                        <h2 className="form-title">Đăng Nhập</h2>
                        <form className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="fa fa-user"></i></label>
                                <input className="login" type="text" name="your_name" id="your_name" placeholder="Tài khoản"   onChange={this.handleEmailChange}  />
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="fa fa-lock"></i></label>
                                <span className="btn-show-pass">
                                    <i className="fa fa-eye"></i>
                                </span>
                                <input className="login" type="password" name="your_pass" id="your_pass" placeholder="Mật khẩu"  onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="form-group">
                                <input className="login" type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Ghi nhớ đăng nhập</label>
                            </div>
                            <div className="form-btn form-group">
                                <input className="login" type="" name="login" id="login" className="form-submit btn" value="Đăng nhập" onClick={this.handleLogin} />
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Đăng nhập với</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center fa fa-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;