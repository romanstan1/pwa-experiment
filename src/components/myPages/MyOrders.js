import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addSeven} from '../../store/modules/seed'
import {cancelOrder,delayOrder} from '../../store/modules/actions'
import Ticket from '../modules/Ticket'
import {OrderCard} from '../modules/Card'
import CollapsibleParent from '../modules/CollapsibleParent'
import LinkButton from '../modules/LinkButton'

const MultipleOrders = ({orders, upcoming, children}) => {
  return (<span>
    {orders.sort((a,b)=> new Date(b.purchase_date) - new Date(a.purchase_date))
      .map((order,index)=>(
        <OrderCard
          key={index}
          index={index}
          delivery={(addSeven(order.purchase_date))}
          brand={order.brand}
          lense={order.type}
          status={order.status}

          orderType={order.order_type}
          leftEye= {order.left_eye}
          rightEye= {order.right_eye}
          orderedOn={order.purchase_date}
        >
          {children}
      </OrderCard>
      ))}
    </span>)
}


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
        <div className="notificationCard">
          <div className='welcomeMessage'>My Orders</div>
          <CollapsibleParent
             name='Upcoming Orders'
             numberOfEntities={upcomingOrders.length}>
            {upcomingOrders.sort((a,b)=> new Date(b.purchase_date) - new Date(a.purchase_date))
              .map((order,index)=>(
                <OrderCard
                  key={index}
                  index={index}
                  delivery={(addSeven(order.purchase_date))}
                  brand={order.brand}
                  lense={order.type}
                  status={order.status}

                  orderType={order.order_type}
                  leftEye= {order.left_eye}
                  rightEye= {order.right_eye}
                  orderedOn={order.purchase_date}
                >
                <div id={order.id} className='button' onClick={this.cancelOrder}>Cancel Order</div>
                {order.status ==='Out for delivery'? null:<div id={order.id} className='button' onClick={this.delayOrder}>Delay 7 Days</div>}
              </OrderCard>
              ))}
            </CollapsibleParent>
            <CollapsibleParent
              name='Past Orders'
              numberOfEntities={orderHistory.length}>
              <MultipleOrders orders={orderHistory}/>
            </CollapsibleParent>
          </div>
        <LinkButton extraClass='alone' to='/neworder'>New Order </LinkButton>
        <br/><br/><br/>
      </Ticket>
    </span>)
  }
}

export default connect(state => ({
  currentUser: state.data.currentUser
}))(MyOrders)
