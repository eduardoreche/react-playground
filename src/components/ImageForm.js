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
        <div className="row">
          <div className="col-12">
            <Cropper
              aspectRatio={16 / 9}
              preview=".img-preview"
              guides={false}
              src={this.state.image_src}
              ref={cropper => {
                this.cropper = cropper;
              }}
            />
          </div>
          <div className="row">
            <div>
              <div className="box" style={{ width: '50%', float: 'right' }}>
                <h1>Preview</h1>
                <div
                  className="img-preview"
                  style={{ width: '100%', float: 'left', height: 100 }}
                />
              </div>
              <div className="box" style={{ width: '50%', float: 'right' }}>
                <h1>
                  <span>Crop</span>
                  <button onClick={this.cropImage} style={{ float: 'right' }}>
                    Crop Image
                  </button>
                </h1>
                <img
                  style={{ width: '100%' }}
                  src={this.state.cropResult}
                  alt="cropped image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageForm = reduxForm({
  form: 'imageForm'
})(ImageForm);

export default ImageForm;
