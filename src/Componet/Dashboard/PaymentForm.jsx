import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useStore from "../../store/store";
import Program from '../Program';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

const CheckoutButton = ({ productName, amount ,email, type}) => {
    const navigate = useNavigate();
    const [button , setButton] = useState(false);
    const {  bg ,setBg} = useStore();
    const handleCheckout = async () => {
  
        try {
            setButton(true);
            setBg(true);
    console.log(productName)
            // Call your Laravel backend to create a checkout session
            const response = await axios.post(`${import.meta.env.VITE_API}/api/checkout`, {
                product_name: productName,
                amount: amount, // amount in cents
                email: email, // amount in cents
                type: type, // amount in cents
                start_date: '2024-06-05', // amount in cents
                end_date: '2024-12-29', // amount in cents
                student_id:'555',
                success_url: `${import.meta.env.VITE_API1}/programs`,
                cancel_url: `${import.meta.env.VITE_API1}/programs`,
            })
            // Assuming your Laravel backend returns the session in the response's data
            const session = response.data;
        
            // Redirect to Stripe Checkout
            if (session.id) {
                console.log("car1")
                window.location.href = `${session.id}`;
                
            } else {
                console.error('Session ID not found');
            }
            navigate('/programs');
            setBg(false);
        } catch (err) {s
            console.error('Error creating checkout session:', err);
        
            setBg(false);
        }
        
    };

    return <button onClick={handleCheckout}>{button ?  "Redirecting..." : "Pay Now" }</button>;
};

export default CheckoutButton;