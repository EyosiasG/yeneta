import React from 'react';
import Programs from './programQ';
import Events from './events';
import PaymentForm from './PaymentForm';
import useStore from '../../store/store';

import CheckoutButton from './PaymentForm';
import Dashboard from './Dashboard';
import Student from './Student';
import Staff from './Staff';
import Services from './Service';
import Gallerys from './Gallery';
import About from './About';
import Testimonial from './Testimonial';
import Why from './Why';
import RegisteredStudents from './RegisteredStudents';
import MessageList from './Message';
import CompanyMessageList from './CompanyMessage';
import Verify from './VerfiyPayment';
import Invoice from './Invoice';
import Product from './Product';
import PendingOrder from './PendingOrder';
import Order from './Order';
import OnRouteOrder from './OnRouteOrder';
import DeliveredOrder from './DeliveredOrder';
import UnPaidOrder from './UnPaidOrder';
import VerifyStatus from './VerfiyStatus';
import VerifyStatus1 from './VerfiyStatus1';

function Body() {
  const { setAdminNav , AdminNav } = useStore();
  return (
<>
{ AdminNav === "Programs" && <Programs/> }
{ AdminNav === "Events" && <Events /> }
{ AdminNav === "Dashboard" && <Dashboard/> }
{ AdminNav === "Registerd" && <RegisteredStudents/> }
{ AdminNav === "Verify" && <Verify/> }
{ AdminNav === "Students" && <Student/> }
{ AdminNav === "Staff" && <Staff/> }
{ AdminNav === "Services" && <Services/>}
{ AdminNav === "Gallery" && <Gallerys/>}
{ AdminNav === "Testimonials" && <Testimonial/>}
{ AdminNav === "Why" && <Why/>}
{ AdminNav === "About" && <About/>}
{ AdminNav === "Registered" && <RegisteredStudents/>}
{ AdminNav === "Messages" && <MessageList/>}
{ AdminNav === "Partnerships" && <CompanyMessageList/> }
{ AdminNav === "Invoices" && <Invoice/> }
{ AdminNav === "Products" && <Product/> }
{ AdminNav === "PendingOrder" && <PendingOrder/> }
{ AdminNav === "Order" && <Order/> }
{ AdminNav === "Delivered" && <DeliveredOrder/> }
{ AdminNav === "OnRoute" && <OnRouteOrder/> }
{ AdminNav === "UnPaid" && <UnPaidOrder/> }
{ AdminNav === "VerfiyStatus" && <VerifyStatus/> }
{ AdminNav === "VerfiyStatus1" && <VerifyStatus1/> }



{/*}
<div className='h-full w-full bg-stone-50'>
<div className=' flex flex-row justify-between flex-wrap'>
<div className=' shadow-lg flex gap-2 p-2 border border-gray-200 w-48 min-w-16 rounded-sm bg-white m-2'><h1>Students</h1> <h1>18</h1></div>
<div className=' shadow-lg flex ga p-2 border border-gray-200 w-48 min-w-16 rounded-sm bg-white m-2'><h1>Classes</h1> <h1>18</h1></div>
<div className=' shadow-lg flex ga p-2 border border-gray-200 w-48 min-w-16 rounded-sm bg-white m-2'><h1>Staff</h1> <h1>18</h1></div>
<div className=' shadow-lg flex ga p-2 border border-gray-200 w-48 min-w-16 rounded-sm bg-white m-2'><h1>Events</h1> <h1>18</h1></div>
<div className=' shadow-lg flex ga p-2 border border-gray-200 w-48 min-w-16 rounded-sm bg-white m-2'><h1>Payment</h1> <h1>18</h1></div>

</div>
</div>*/}
</>
  );
}

export default Body;