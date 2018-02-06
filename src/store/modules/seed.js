import moment from 'moment'

export const beforeDate = days => moment().subtract(days, 'days').format('ll')
export const afterDate = days => moment().add(days, 'days').format('ll')
export const addSeven = date => moment(date, 'MMMDDYYYY').add(7, 'days').format('ll')
export const random = list => list.map(item=>item.value)[Math.floor((Math.random()*list.length))]

export const brandNames = [
  { value: 'Biofinity', label: 'Biofinity'},
  { value: 'Biofinity toric', label: 'Biofinity toric'},
  { value: 'Air Optix Aqua', label: 'Air Optix Aqua'},
  { value: 'Acuvue', label: 'Acuvue'},
  { value: 'Soczewki FreshLook', label: 'Soczewki FreshLook'}
]
export const opticianNames = [
  { value: 'Ben Thornley', label: 'Ben Thornley'},
  { value: 'Andy Cole', label: 'Andy Cole'},
  { value: 'Nicky Butt', label: 'Nicky Butt'},
  { value: 'David Seaman', label: 'David Seaman'},
  { value: 'Sven Goran Erikson', label: 'Sven Goran Erikson'}
]
export const lenseTypes = [
  { value: 'Dailies', label: 'Dailies'},
  { value: 'Weekly', label: 'Weekly'},
  { value: 'Monthly', label: 'Monthly'}
]
export const cardTypes = [
  { value: 'Mastercard', label: 'Mastercard'},
  { value: 'Visa Debit', label: 'Visa Debit'},
  { value: 'American Express', label: 'American Express'}
]
export const orderStatuses = [
  { value: 'Processing', label: 'Processing'},
  { value: 'Out for delivery', label: 'Out for delivery'},
  { value: 'Completed', label: 'Completed'}
]
export const appointmentType = [
  { value: 'Under 16', label: 'Under 16'},
  { value: 'Over 16', label: 'Over 16'},
  { value: 'Trial', label: 'Trial'},
  { value: 'Eye Test', label: 'Eye Test'}
]
export const appointmentTime = [
  { value: 'Before 12 noon', label: 'Before 12 noon'},
  { value: '12pm - 3pm', label: '12pm - 3pm'},
  { value: 'After 3pm', label: 'After 3pm'}
]
export const appointmentFor = [
  { value: 'Myself', label: 'Myself'},
  { value: 'Someone else', label: 'Someone else'}
]
export const appointmentTypes = ['Under 16', 'Over 16', 'Trial', 'Eye Test']

export const initialState = {
  currentUser: null,
  // confirmedAppointment: {
  //   selectedStore:"Wimbledon",
  //   dateAndTime:' 12 Jan 2017',
  //   address: 'wherever',
  //   optician: 'whoever',
  //   homeLocation: {lat:12, lng: 12},
  //   placeId:"action.payload.selectedStoreId",
  //   type:"action.payload.appointmentType",
  //   for: 'myself',
  //   additional:"action.payload.additionalInfo",
  //   phoneNumber: "action.payload.phoneNumber"
  // },
  users: [
    {
      username:'tomoconnor',
      password:'',
      title: 'Mr',
      first_name: 'Tom',
      last_name: "O'Connor",
      dob: beforeDate(12775),
      prescription: {
        left_eye: {
          'D': '+3.25',
          'BC': '8.5',
          'DIA': '14.2'
        },
        right_eye: {
          'D': '+3.75',
          'BC': '8.0',
          'DIA': '14.6'
        }
      },
      address:'21 Kingston Road, London',
      postcode:'SW20 9BT',
      payment_cards: [
        {
          type: 'Mastercard',
          number: '**** **** **** 9872'
        },
        {
          type: 'Visa Debit',
          number: '**** **** **** 9800'
        }
      ],
      appointments: [],
      orders:[
        {
          purchase_date: beforeDate(4),
          brand: random(brandNames),
          type: random(lenseTypes),
          prescription: {
            left_eye: {
              'D': '+3.25',
              'BC': '8.5',
              'DIA': '14.2'
            },
            right_eye: {
              'D': '+3.75',
              'BC': '8.0',
              'DIA': '14.6'
            }
          },
          order_type:'Individual',
          status: 'Processing',
          id:831629
        },
        {
          purchase_date: beforeDate(80),
          brand: random(brandNames),
          type: random(lenseTypes),
          prescription: {
            left_eye: {
              'D': '+3.25',
              'BC': '8.5',
              'DIA': '14.2'
            },
            right_eye: {
              'D': '+3.75',
              'BC': '8.0',
              'DIA': '14.6'
            }
          },
          order_type:'Individual',
          status: 'Completed',
          id:231621
        }
      ],
      subscription: {
        type: random(lenseTypes),
        brand: random(brandNames),
        next_arrival_date:afterDate(10)
      },
    },
    {
      username:'pat123',
      password:'',
      first_name: 'Pat',
      last_name: 'Mowell',
      age: 27,
      left_eye: -1.5,
      right_eye: -3.2,
      appointments: []
    }
  ]
}
