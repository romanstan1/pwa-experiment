import moment from 'moment'

export const checkDate = date => {
  const daysBetween = moment(date,'MMMDDYYYY').diff(moment(),'days')
  if(daysBetween <= -7) return 'Completed'
  else if (daysBetween <= -4) return 'Out for delivery'
  else return 'Processing'
}

export const updateNotifications = (orders, appointments, type) => {
  const countFutureEntities = (entities,dateString) =>  {
    if(dateString ==='date') return entities.filter(appointment => moment(appointment.date,'MMMDDYYYY') >= moment().subtract(5,'d'))
    else return entities.filter(order => order.status === 'Processing'|| order.status ==='Out for delivery')
  }
  return {
    orders: countFutureEntities(orders,'purchase_date').length,
    appointments: countFutureEntities(appointments,'date').length,
    chat: 0,
    misc: 0
  }
}
