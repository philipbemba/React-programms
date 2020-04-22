// --- Imports --- //
import uuid4 from 'uuid/v4'; // for demo purporse only,
import * as types from './Types';

// --- State Definitation --- //
// const documents = [
//   {
//     id: uuid4(),
//     name: 'Truth in Savings',
//     url: 'https://www.nwcu.com/rates'
//   },
//   {
//     id: uuid4(),
//     name: 'Truth in Checking',
//     url: 'https://www.nwcu.com/rates'
//   }
// ];

// const services = [
//   {
//     id: uuid4(),
//     name: 'Debit Card',
//     type: 'service',
//     description:
//       'Conveniently make purchases and withdraw cash from your checking account.',
//     documents: []
//   },
//   {
//     id: uuid4(),
//     name: 'Debit Assist',
//     type: 'service',
//     description:
//       'Authorizes NWCU to pay overdrafts on ATM and everyday debit card transactions.',
//     documents: []
//   }
// ];

// const products = [
//   {
//     id: uuid4(),
//     name: 'Regular Share',
//     description:
//       'Membership at Northwest Community begins with this account. All adult members are required to open and maintain this account in order to take advantage of any credit union product or service. $10 minimum to open.',
//     type: 'savings',
//     media: {
//       image: types.MEDIA_IMAGE,
//       title: types.MEDIA_TITLE
//     },
//     documents: [documents[0]],
//     services: [],
//     isPrimaryForAge: age => age >= 18
//   },
//   {
//     id: uuid4(),
//     name: 'Youth Share',
//     description:
//       'Membership at Northwest Community begins with this account. All members age 12-18 are required to open and maintain this account in order to take advantage of any credit union product or service.',
//     type: 'savings',
//     media: {
//       image: types.MEDIA_IMAGE,
//       title: types.MEDIA_TITLE
//     },
//     documents: [documents[0]],
//     services: [],
//     isPrimaryForAge: age => age < 18 && age >= 12
//   },
//   {
//     id: uuid4(),
//     name: 'Northwest Checking',
//     description:
//       'A checking account to meet all of your banking needs. And you can earn a competitive interest rate simply by enrolling in estatements and making 10+ debit card purchases each month. $40 minimum to open.',
//     type: 'checking',
//     media: {
//       image: types.MEDIA_IMAGE,
//       title: types.MEDIA_TITLE
//     },
//     documents: [documents[1]],
//     services: [services[0].id, services[1].id]
//   },
//   {
//     id: uuid4(),
//     name: 'Essential Checking',
//     description:
//       'A non-interest  bearing checking account for members who may not have qualified for a checking account at another bank or credit union. $40 minimum to open.',
//     type: 'checking',
//     media: {
//       image: types.MEDIA_IMAGE,
//       title: types.MEDIA_TITLE
//     },
//     documents: [documents[1]],
//     services: [services[0].id, services[1].id]
//   },
//   {
//     id: uuid4(),
//     name: 'Northwest Secure Checking',
//     description:
//       'A checking account that includes a complete suite of identity theft detection, recovery benefits and mobile phone protection plus the ability to earn interest when qualifiers are met. $40 minimum to open.',
//     type: 'checking',
//     media: {
//       image: types.MEDIA_IMAGE,
//       title: types.MEDIA_TITLE
//     },
//     documents: [documents[1]],
//     services: [services[0].id, services[1].id]
//   }
// ];
const status = types.INIT;
const products = [];
const services = [];
const documents = [];
// --- State Export --- //
export { status, products, services, documents };
