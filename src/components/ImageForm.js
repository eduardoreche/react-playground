import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

class ImageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image_src: null,
      cropResult: null
    };
    this.cropImage = this.cropImage.bind(this);
  }

  onDrop(files) {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        image_src: reader.result
      });
    };

    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL()
    });
  }

  renderImageVisualization() {
    if (this.state.image_src) {
      return [
        <div className="row" key="0">
          <div className="col-8">
            <h3>Original</h3>
            <Cropper
              aspectRatio={4 / 3}
              preview=".img-preview"
              guides={false}
              src={this.state.image_src}
              ref={cropper => {
                this.cropper = cropper;
              }}
            />
          </div>
          <div className="col-4">
            <div className="row">
              <h3>Preview</h3>
              <div
                className="img-preview"
                style={{ width: '100%', height: 200 }}
              />
            </div>
            <br />
            <button className="btn btn-primary" onClick={this.cropImage}>
              Crop Image
            </button>
          </div>
        </div>,
        <div className="row" key="1">
          {this.state.cropResult && (
            <div className="col-8">
              <h3>Crop Result</h3>
              <img src={this.state.cropResult} alt="cropped image" />
            </div>
          )}
        </div>
      ];
    }
  }

  render() {
    const { files, crop } = this.state;

    return (
      <div>
        <h2>Image upload and crop</h2>
        <br />

        <div className="row">
          <div className="col-4">
            <Dropzone onDrop={this.onDrop.bind(this)} style={{}}>
              <div className="image-drop-zone">
                Drop image here or <br />click for selection...
              </div>
            </Dropzone>
          </div>
        </div>

        {this.renderImageVisualization()}
      </div>
    );
  }
}

ImageForm = reduxForm({
  form: 'imageForm'
})(ImageForm);

export default ImageForm;
