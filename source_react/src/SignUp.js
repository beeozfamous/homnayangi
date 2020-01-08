import React, { Component } from 'react';
import './Log.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }




    render() {
        return (
            <div className="container_signup">
                <div className="signup-content">
                    <div className="signup-image">
                        <img src={require("./img/login.jpg")} alt="sign up image" />
                        <p className="signup-question">Bạn đã có tài khoản?</p>
                        <a href="/login" className="signup-image-link">Đăng nhập với tài khoản của bạn</a>
                        <a href="/" className="signup-image-link">Tiếp tục sử dụng ẩn danh</a>
                    </div>
                    <div className="signup-form">
                        <h2 className="form-title">Đăng Ký</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label for="name"><i className="fa fa-user"></i></label>
                                <input className="login" type="text" name="name" id="name" placeholder="Họ và tên" />
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="fa fa-envelope"></i></label>
                                <input className="login" type="email" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="fa fa-lock"></i></label>
                                <input className="login" type="password" name="pass" id="pass" placeholder="Mật khẩu" />
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i className="fa fa-lock"></i></label>
                                <input className="login" type="password" name="re_pass" id="re_pass" placeholder="Xác nhận lại mật khẩu" />
                            </div>
                            <div className="form-group">
                                <input className="login" type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>
                                    Bạn chấp nhận với tất cả <a href="#" className="term-service">điều khoản dịch vụ</a></label>
                            </div>
                            <div className="form-group form-btn">
                                <input className="login" type="submit" name="signup" id="signup" className="form-submit btn" value="Đăng ký" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;