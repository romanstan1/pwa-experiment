import React, {Component} from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import LinkButton from './modules/LinkButton'
import Camera from 'react-camera';

import QrReader from 'react-qr-reader'


export default class WebcamComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    console.log("data",data)
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
  }
  render() {
    const width = window.innerWidth
    const height = window.innerHeight
    return (
      <div className='webcam'>
        <div className='webcamWrap'>
          {/* <Webcam
            width={width}
            height={height - 70 - 80}
            audio={false}/> */}

            {/* <Camera
              // style={style.preview}
              // ref={(cam) => {
              //   this.camera = cam;
              // }}
            >
            </Camera> */}

            <div className='viewfinder'></div>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              showViewFinder={false}
              style={{ width: '100%'}}
              />
        </div>
        <div className='capture'>Capture</div>
        <Link to='ShopPage'>Back to shop</Link>
      </div>
    )
  }
}
