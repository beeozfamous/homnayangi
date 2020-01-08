import React, { Component } from 'react';
import './App.css';
import  { Redirect } from 'react-router-dom'

class WriteRecipe extends React.Component {
    constructor(props) {
        super(props);
        // this.inputRef = React.createRef();
        this.state = {
            owner_id:'089786d0-294e-11ea-8671-3c15c2d9b720',
            foodname:'',
            ingredients: [{}],
            stepIndex:0,
            ingredientIndex:0,
            steps: [{}],
            file: '',
            imagePreviewUrl: '',
            upRecipe:''
        };
        this.fileSelector;
    }

    // showOpenFileDlg = () => {
    //     this.inputRef.current.click()
    // }

    componentDidMount (){
        this.fileSelector = this.buildFileSelector();
      }
    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.click();
      }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
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
        console.log(this.imagePreviewUrl)
    }


    handleIngredientNameChange = (idx) => (evt) => {
        const newIngredients = this.state.ingredients.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, name: evt.target.value };
        });

        this.setState({ ingredients: newIngredients });
    }

    // handleIngredientSubmit = (evt) => {
    //     const { name, s } = this.state;
    //     alert(`Incorporated: ${name} with ${s.length} s`);
    // }

    handleIngredientAdd = () => {
        this.setState({ ingredients: this.state.ingredients.concat([{name : '' }]) });
    }

    handleIngredientRemove = (idx) => () => {
        this.setState({ ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx) });
    }

    handleStepNameChange = (idx) => (evt) => {
        const newSteps = this.state.steps.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, name: evt.target.value };
        });

        this.setState({ steps: newSteps });
    }
    _handleFoodName=(e)=>{
   this.setState({foodname: e.target.value});
    }
    handleStepAdd = () => {
        let tmp = this.state.stepIndex + 1;
        this.setState({ steps: this.state.steps.concat([{ name: '' }]) });
    }

    handleStepRemove = (idx) => () => {

        this.setState({ steps: this.state.steps.filter((s, sidx) => idx !== sidx) });

    }

    buildFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        return fileSelector;
    }

    handleSubmitPost=()=>{

        let formData = new FormData();
        var resultStep = this.state.steps.map(function(a) {return a.name;});
        var resultIng = this.state.ingredients.map(function(a) {return a.name;});
        console.log(resultStep.toString());
        console.log(resultIng.toString());


        formData.append('owner_id', this.state.owner_id);
        formData.append('foodname',this.state.foodname);
        formData.append('image',this.state.file);
        formData.append('description',resultStep.toString());
        formData.append('ingredients',resultIng.toString());

        fetch("http://nguyenbm.tk:5000/addRecipe",
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
        upRecipe:json
      });
    });
console.log();
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if(this.state.upRecipe){
            return (
        <Redirect to='/'/>
      )
        }
        if (imagePreviewUrl) {
            $imagePreview = (<div className="uploadImg"  onChange={(e) => this._handleImageChange(e)}>
            <img src={imagePreviewUrl} /> 
        </div> );
        } else {
            $imagePreview = (
            <div className="uploadImg"  onChange={(e) => this._handleImageChange(e)}>
                <div className="upload_content">
                    <img className="icon" src={require("./img/food.png")} alt="" />
                    <p>Chia sẻ một bức ảnh về thành quả của bạn</p>
                    <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} 
                                // ref={this.inputRef}
                                style={{display: 'block'}}/>
                </div>
            </div> );
        }
        return (
            <div>
                <div className="container">
                    {/* <div className="uploadImg" onSubmit={(e) => this._handleSubmit(e)}>
                        <div className="upload_content" onChange={(e) => this._handleImageChange(e)} >
                            <img className="icon" src={require("./img/food.png")} alt="" />
                            <p>Chia sẻ một bức ảnh về thành quả của bạn</p>
                        </div>
                        {$imagePreview}

                    </div> */}
                    <div className="previewComponent">
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            {$imagePreview}
                            <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} 
                                // ref={this.inputRef}
                                style={{display: 'none'}}/>
                        </form>                       
                    </div>
                    <form className="input">
                        <input type="text" className="input__field" placeholder="Bạn muốn chia sẻ món gì?" onChange={(e) => this._handleFoodName(e)}/>
                    </form>
                    <p className="ingredients">Nguyên liệu:
                        <form /*onSubmit={this.handleSubmit}*/>
                            {this.state.ingredients.map((item, idx) => (
                                <div className="ingredient">
                                    <input
                                        type="text"
                                        className="input__field"
                                        placeholder={`Nguyên liệu #${idx + 1}`}
                                        value={item.name}
                                        onChange={this.handleIngredientNameChange(idx)}
                                    />
                                    <button type="button" onClick={this.handleIngredientRemove(idx)} className="btn remove">-</button>
                                </div>
                            ))}
                            <div onClick={this.handleIngredientAdd} className="add">+ Thêm nguyên liệu</div>
                        </form>
                    </p>
                    <p className="ingredients">Các bước:
                        <form /*onSubmit={this.handleIngredientSubmit}*/>
                            {this.state.steps.map((item, idx) => (
                                <div>
                                <div className="ingredient">
                                    <input
                                        type="text"
                                        className="input__field"
                                        placeholder={`Bạn đã làm bước #${idx + 1} thế nào?`}
                                        value={item.name}
                                        onChange={this.handleStepNameChange(idx)}
                                    />
                                    <button type="button" onClick={this.handleStepRemove(idx)} className="btn remove">-</button>
                                    </div>
                                    <div className="stepImages"><i className="fa fa-camera-retro"></i></div>
                                </div>
                            ))}
                            <div onClick={this.handleStepAdd} className="add">+ Bước tiếp theo</div>
                        </form>
                    </p>
                    <button type="button" className="btn submit" onClick={this.handleSubmitPost}><i className="fa fa-check"></i>Đăng bài</button>

                </div>
            </div>
        )
    }
}

export default WriteRecipe;
