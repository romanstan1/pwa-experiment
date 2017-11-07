import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addSeven} from '../../store/modules/seed'
import {cancelOrder,delayOrder} from '../../store/modules/actions'
import Ticket from '../modules/Ticket'
import MiniTicket from '../modules/MiniTicket'
import Card from '../modules/Card'
import LinkButton from '../modules/LinkButton'

const weight = value => <span style={{color:'black', fontWeight:600}}> {value} <br/> </span>

class MyOrders extends Component {
  cancelOrder = event => this.props.dispatch(cancelOrder(parseInt(event.target.id,10)))
  delayOrder = event => this.props.dispatch(delayOrder(parseInt(event.target.id,10)))

  render () {
    const {currentUser} = this.props
    const upcomingOrders = currentUser.orders
      .filter(order => order.status === 'Processing'|| order.status ==='Out for delivery')
    const orderHistory = currentUser.orders
      .filter(order => order.status === 'Completed'|| order.status ==='Cancelled')

    return (<span>
      <Ticket title="Upcoming Orders">
        <MiniTicket title="Upcoming Orders">
          {upcomingOrders.sort((a,b)=> new Date(b.purchase_date) - new Date(a.purchase_date))
            .map((order,index)=>(
              <Card key={index} index={index}>
                Order Placed On: {weight(order.purchase_date)}
                Delivery Expected On: {weight(addSeven(order.purchase_date))}
                <br/>
                Brand: {weight(order.brand)}
                Lense Type: {weight(order.type)}
                Order Type: {weight(order.order_type)}
                <br/>
                Left Eye: {weight(order.left_eye)}
                Right Eye: {weight(order.right_eye)}
                <br/>
                Status: {weight(order.status)}
                <br/>
                <div id={order.id} className='button' onClick={this.cancelOrder}>Cancel Order</div>
              {order.status ==='Out for delivery'? null:<div id={order.id} className='button' onClick={this.delayOrder}>Delay 7 Days</div>}
              </Card>
            ))}
        </MiniTicket>
        <MiniTicket className='fixed'>
          <LinkButton to='/neworder'>New Order </LinkButton>
        </MiniTicket>
        <MiniTicket title="Past Orders">
          {orderHistory
            .sort((a,b)=> new Date(b.purchase_date) - new Date(a.purchase_date))
            .map((order,index)=>(
              <Card key={index} index={index}>
                Order Placed On: {weight(order.purchase_date)}
                { order.status ==='Cancelled'? null:
                    <span> Delivered On:{weight(addSeven(order.purchase_date))}</span>
                }
                <br/>
                Brand: {weight(order.brand)}
                Lense Type: {weight(order.type)}
                Order Type: {weight(order.order_type)}
                <br/>
                Left Eye: {weight(order.left_eye)}
                Right Eye: {weight(order.right_eye)}
                <br/>
                Status: {weight(order.status)}
              </Card>
            ))}
        </MiniTicket>
      </Ticket>
    </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(MyOrders)
