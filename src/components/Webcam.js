import React, {Component} from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import LinkButton from './modules/LinkButton'
import Camera from 'react-camera';

import QrReader from 'react-qr-reader'


export default class WebcamComponent extends Component {

  state = {
    delay: 300,
    result: null,
  }
  handleScan = (data) => {
    if(!!data) this.setState({ result: data})
    // else this.setState({ result: null})
  }

  handleError = (err) => console.error(err)

  render() {
    const {result} = this.state
    return (
      <div className='webcam'>
        <div className='webcamWrap'>
            <div className='viewfinder'></div>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              showViewFinder={false}
              style={{ width: '100%'}}
              />
            {!!result? <div className='result'> {result}</div>: null}
        </div>
        <Link to='ShopPage'>Back to shop</Link>
      </div>
    )
  }
}
