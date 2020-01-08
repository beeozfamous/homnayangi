import React, { Component } from 'react';
import './Log.css';
import {Link,Redirect} from "react-router-dom";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            fullname:'',
            email:'',
            password:'',
            repass:'',
            success:''
        };
    }
    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    handleName= e => {
   this.setState({fullname: e.target.value});
};
    handleEmail= e => {
   this.setState({email: e.target.value});
};
    handlePassword= e => {
   this.setState({password: e.target.value});
};
    handleRePassword= e => {
   this.setState({repass: e.target.value});
};
    handleRegister=()=>{

      if(this.state.fullname!=='' && this.state.email!=='' && this.state.password!=='' && this.state.password===this.state.repass && this.state.file!==''){
            let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password',this.state.password);
        formData.append('role_id',1);
        formData.append('fullname',this.state.fullname);
        formData.append('gender_id',1);
        formData.append('avatar_link',this.state.file);

        fetch("http://0.0.0.0:5000/register",
{
    headers: {
        "access-control-allow-origin" : "*"},
    method: 'POST',
    body:formData,
    redirect: 'follow'
  })
     .then((response) => {
     return response.json();
    })
    .then((json) => {
      this.setState({
        success:json
      });
      alert(json.message);
    });
console.log();
      }else{alert("Thiếu thông tin hoặc mật khẩu không khớp hoặc thiếu avatar!")}
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        const isLoggedIn = this.state.success;
        if (isLoggedIn.message==="Create user successfully." ) {
                    console.log("iamhere")
                    return <Redirect to="/login"/>;
    }
        if (imagePreviewUrl) {
            $imagePreview = (<div className="uploadImg" onChange={(e) => this._handleImageChange(e)}>
                <img src={imagePreviewUrl} />
                <input className="fileInput"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)} />
            </div>);
        } else {
            $imagePreview = (
                <div className="uploadImg" onChange={(e) => this._handleImageChange(e)}>
                    <div className="upload_content">
                        <i className="fa fa-camera-retro fa-3x"></i>
                        <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />
                    </div>
                </div>);
        }
        return (
            <div className="container_signup">
                <div className="signup-content">
                    <div className="signup-image">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                {$imagePreview}
                                {/* <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} /> */}
                            </form>
                        </div>
                        <p className="signup-question">Bạn đã có tài khoản?</p>
                        <a href="/login" className="signup-image-link">Đăng nhập với tài khoản của bạn</a>
                        <a href="/" className="signup-image-link">Tiếp tục sử dụng ẩn danh</a>
                    </div>
                    <div className="signup-form">
                        <h2 className="form-title">Đăng Ký</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label for="name"><i className="fa fa-user"></i></label>
                                <input className="login" type="text" name="name" id="name" placeholder="Họ và tên"  onChange={this.handleName}/>
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="fa fa-envelope"></i></label>
                                <input className="login" type="email" name="email" id="email" placeholder="Email"  onChange={this.handleEmail}/>
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="fa fa-lock"></i></label>
                                <input className="login" type="password" name="pass" id="pass" placeholder="Mật khẩu" onChange={this.handlePassword} />
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i className="fa fa-lock"></i></label>
                                <input className="login" type="password" name="re_pass" id="re_pass" placeholder="Xác nhận lại mật khẩu"  onChange={this.handleRePassword}/>
                            </div>
                            <div className="form-group">
                                <input className="login" type="checkbox" name="agree-term" id="agree-term" className="agree-term"  />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>
                                    Bạn chấp nhận với tất cả <a href="#" className="term-service">điều khoản dịch vụ</a></label>
                            </div>
                            <div className="form-group form-btn">
                                <input className="login" name="signup" id="signup" className="form-submit btn" value="Đăng ký"  onClick={this.handleRegister}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;