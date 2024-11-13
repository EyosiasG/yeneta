import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../../store/store';
import Programs from './programQ';
import Events from './events';
import PaymentForm from './PaymentForm';
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
  const { AdminNav } = useStore();

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  // Component mapping
  const components = {
    Programs: <Programs />,
    Events: <Events />,
    Dashboard: <Dashboard />,
    Registerd: <RegisteredStudents />,
    Verify: <Verify />,
    Students: <Student />,
    Staff: <Staff />,
    Services: <Services />,
    Gallery: <Gallerys />,
    Testimonials: <Testimonial />,
    Why: <Why />,
    About: <About />,
    Registered: <RegisteredStudents />,
    Messages: <MessageList />,
    Partnerships: <CompanyMessageList />,
    Invoices: <Invoice />,
    Products: <Product />,
    PendingOrder: <PendingOrder />,
    Order: <Order />,
    Delivered: <DeliveredOrder />,
    OnRoute: <OnRouteOrder />,
    UnPaid: <UnPaidOrder />,
    VerfiyStatus: <VerifyStatus />,
    VerfiyStatus1: <VerifyStatus1 />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={AdminNav}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
        className="min-h-full"
      >
        {components[AdminNav] || <Dashboard />}
      </motion.div>
    </AnimatePresence>
  );
}

export default Body;