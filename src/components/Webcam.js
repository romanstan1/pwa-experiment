import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import QrReader from 'react-qr-reader'
import Camera from './modules/camera/Camera.js';

const CoolButton = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Capture
  </button>
);

export default class WebcamComponent extends Component {

  state = {
    delay: 300,
    result: null,
  }
  handleScan = (data) => {
    if(!!data) this.setState({ result: data})
    var win = window.open(data, '_blank');
    win.focus();
  }

  handleError = (err) => console.error(err)

  render() {
    const {result} = this.state
    return (
      <div className='webcam'>
        <div className='webcamWrap'>
            <div className='viewfinder'></div>
            <Camera
              captureButtonRenderer={onClick => <CoolButton onClick={onClick} />}
              onTakePhoto={(image) => this.handleScan(image)}
            />
            {!!result? <div className='result'> {result}</div>: null}
        </div>
        <Link to='ShopPage'>Back to shop</Link>
      </div>
    )
  }
}
