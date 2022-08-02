import React, {useState} from "react";
import './Add.css';
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

class Add extends React.Component {
    cropper;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            short_description: '',
            long_description: '',
            imageSrc: '',
            resultImageSrc: '',
            redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.fileInput = React.createRef();
        this.imageElement = React.createRef();
    }

    async postData(name, image, short_description, long_description) {
        const data = {
            Name: name,
            Image: image,
            ShortDescription: short_description,
            LongDescription: long_description
        };
        await axios.post('/api/add/product', data);
    }

    toDataURL(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            let reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    async handleSubmit(event) {
        event.preventDefault();
        let image = new Image();
        image.src = this.state.resultImageSrc;

        let thisObject = this;
        let name = this.state.name;
        let short_description = this.state.short_description;
        let long_description = this.state.long_description;

        this.toDataURL(image.src, async function(url) {
            await thisObject.postData(name, url, short_description, long_description);
            thisObject.setState({
                redirect: true
            });
        });
    }

    async changeFile() {
        let file = this.fileInput.current.files[0];
        await this.setState({imageSrc: URL.createObjectURL(file)});
        this.cropper = new Cropper(this.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas();
                this.setState({ resultImageSrc: canvas.toDataURL("image/png") });
            }
        });
    }

    render() {
        if (this.props.user == null) {
            return (
                <h1>Для просмотра этой страницы необходимо авторизоваться.</h1>
            );
        }
        if (this.state.redirect) {
            return (
                <Navigate to={'/'} />
            );
        }
        return (
            <div className="content-add">
                <h1>Добавить продукт</h1>
                <form className="add-form" onSubmit={this.handleSubmit}>
                    <label>Название:</label>
                    <input className="product-text-input" type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} />
                    <label>Изображение:</label>
                    <input type="file" ref={this.fileInput} onChange={this.changeFile} />
                    <img src={this.state.imageSrc} ref={this.imageElement} width="600"/>
                    <img src={this.state.resultImageSrc} width="600" />
                    <label>Короткое описание:</label>
                    <textarea rows="4" value={this.state.short_description} onChange={(event) => this.setState({short_description: event.target.value})} />
                    <label>Длинное описание:</label>
                    <textarea rows="6" value={this.state.long_description} onChange={(event) => this.setState({long_description: event.target.value})} />
                    <input className="product-form-send-button" type="submit" value="Создать" />
                </form>
            </div>
        );
    }
}

export default Add;
