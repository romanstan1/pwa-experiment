import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import QrReader from 'react-qr-reader'

export default class QRComponent extends Component {

  state = {
    delay: 300,
    result: null,
    open: true
  }
  handleScan = (data) => {
    if(!!data) {
      this.setState({ result: data})
      if(!!this.state.open) {
        var win = window.open(data, '_blank');
        win.focus();
        this.setState({open: false})
      }
    }
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
        <Link to='shoppage'>Back to shop</Link>
      </div>
    )
  }
}
