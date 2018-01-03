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

// export const specsaversStores = [
//   { name: "Islington",
//     id: 1,
//     address: '68 Chapel Market, London N1 9ER',
//     availableDates: [
//       {
//         date: afterDate(1),
//         times: ['9.20am', '11.10am', '12.40pm', '1.10pm', '1.30pm', '2.50pm', '4.20pm' ]
//       },
//       {
//         date: afterDate(2),
//         times: ['8.20am','9.20am','9.30am','10.05am','10.20am','10.30am', '11.10am', '12.40pm', '1.10pm', '2.00pm', '2.05pm', '3.15pm','3.45pm','4.05pm','4.20pm','4.35pm']
//       },
//       {
//         date: afterDate(3),
//         times: ['8.45am','9.25am','10.05am','10.20am','10.30am', '11.10am', '12.20pm', '2.10pm', '2.15pm', '3.15pm','3.45pm','4.05pm']
//       },
//       {
//         date: afterDate(4),
//         times: ['8.30am', '11.10am', '12.40pm', '2.10pm', '1.30pm', '2.50pm', '4.20pm']
//       },
//       {
//         date: afterDate(5),
//         times: ['8.40am', '9.10am', '12.40pm', '1.00pm', '12.50pm', '2.45pm' ]
//       },
//       {
//         date: afterDate(6),
//         times: ['8.30am', '11.25am', '12.45pm', '1.10pm', '1.30pm', '1.50pm', '4.50pm' ]
//       },
//       {
//         date: afterDate(7),
//         times: ['10.10am', '12.40pm', '1.10pm', '1.30pm', '2.40pm', '3.30pm' ]
//       }
//     ]
//   },
//   { name: "London Wall",
//     id: 2,
//     address: '150-151 Salisbury House Shops, London Wall EC2M 5QD',
//     availableDates: [
//       {
//         date: afterDate(1),
//         times: ['9.20am', '11.10am', '12.40pm', '1.10pm', '1.30pm', '2.50pm', '4.20pm' ]
//       },
//       { date: afterDate(2),
//         times: ['8.20am','9.20am','9.30am','10.05am','10.20am','10.30am', '11.10am', '12.40pm', '1.10pm', '2.00pm', '2.05pm', '3.15pm','3.45pm','4.05pm','4.20pm','4.35pm']
//       },
//       {
//         date: afterDate(4),
//         times: ['8.30am', '11.10am', '12.40pm', '2.10pm', '1.30pm', '2.50pm', '4.20pm']
//       },
//       {
//         date: afterDate(5),
//         times: ['8.40am', '9.10am', '12.40pm', '1.00pm', '12.50pm', '2.45pm' ]
//       },
//       {
//         date: afterDate(6),
//         times: ['8.30am', '11.25am', '12.45pm', '1.10pm', '1.30pm', '1.50pm', '4.50pm' ]
//       },
//       {
//         date: afterDate(7),
//         times: ['10.10am', '12.40pm', '1.10pm', '1.30pm', '2.40pm', '3.30pm' ]
//       }
//     ]
//   },
//   {name: "Chiswick", id: 3,  address: '253 Chiswick High Rd, Chiswick, London W4 4PU' },
//   {name: "Liverpool Street", id: 4,  address: '152 Bishopsgate, London EC2M 4LN' },
//   {name: "Strand", id: 5,  address: '114 Strand, London WC2R 0AG' },
//   {name: "Surrey Quays", id: 6,  address: 'Unit 21, Surrey Quays Shopping Centre, Redriff Rd, London SE16 7LL' }
// ]
//
//


export const initialState = {
  currentUser: null,
  users: [
    {
      username:'tomoconnor',
      password:'',
      title: 'Mr',
      first_name: 'Tom',
      last_name: "O'Connor",
      dob: beforeDate(12775),
      left_eye: -7.3,
      right_eye: -6.8,
      address:'21 Kingston Road, London',
      postcode:'SW209BT',
      payment_cards: [
        {
          type: 'Mastercard',
          number: '4827 2831 2871 9872'
        },
        {
          type: 'Visa Debit',
          number: '2221 2839 9891 9800'
        }
      ],
      appointments: [
        {
          location: 'Wimbledon',
          date: beforeDate(31),
          optician:'John Barnes',
          time:'11.30am',
          id:809861,
          type:'Eye test',
          for: 'Myself',
          additional:'No additional info',
        },
        {
          location: 'Liverpool Street',
          date: beforeDate(131),
          optician:'David Seaman',
          time:'9.00am',
          id:219295,
          type:'Eye test',
          for: 'Myself',
          additional:'No additional info',
        },
        {
          location: 'Putney Bridge',
          date: afterDate(21),
          optician:'Teddy Sherringham',
          time:'2.30pm',
          id:819290,
          type:'Eye test',
          for: 'Someone else',
          additional:'For my son',
        }
      ],
      orders:[
        {
          purchase_date: beforeDate(4),
          brand: random(brandNames),
          type: random(lenseTypes),
          left_eye: -2.3,
          right_eye: -2.8,
          order_type:'Individual',
          status: 'Processing',
          id:831629
        },
        {
          purchase_date: beforeDate(80),
          brand: random(brandNames),
          type: random(lenseTypes),
          left_eye: -7.0,
          right_eye: -6.6,
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
