import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDrop(files) {
    this.setState({
      files
    });

    console.log(files);
  }

  render() {
    const { files, crop } = this.state;

    return (
      <div>
        <h2>Image upload and crop</h2>
        <br />

        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Drop image here...</p>
        </Dropzone>

        <div>
          {files && (
            <img
              src={files[0].preview}
              style={{
                border: '1px solid #000'
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

ImageForm = reduxForm({
  form: 'imageForm'
})(ImageForm);

export default ImageForm;
