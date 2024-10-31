import { useEffect, useState } from 'react';
import Logo from '../assets/img/logo.png'
import Login from '../assets/img/lg.webp'

import Logo1 from '../assets/img/logo1.png'
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAdmin } = useStore();
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      await signup(email, password);
      console.log('User signed up successfully');

    } catch (error) {
      console.error('Signup failed', error);
    }
  };
  useEffect(() => {
   setAdmin(true);
    
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    const login_url = `${import.meta.env.VITE_API}/api/auth/login`;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(login_url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === true) {
        localStorage.setItem("token", data.token);
        setAdmin(true);
        setAdmin(false);
        setTimeout(() => {
          setAdmin(true);
          navigate('/admin');
        }, 1000);
        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User signed up successfully'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid user credentials'
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid login credentials'
      });

      console.error(error);
    }
  };

  const handleLogin1 = async () => {
    try {
      await login(email, password);
      console.log('User logged in successfully');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User logged in successfully'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid login credentials'
      });
      console.error('Login failed', error);
    }
  };

  return (
    

    <div className='h-screen flex  justify-center   items-center  max-w-screen bg-cover width bg-no-repeat  bg-center max-h-[100vh]' style={{backgroundImage: `url(${Login})`}}>
         <form
        onSubmit={handleLogin}
        className="flex justify-center items-center mx-24"
      >
    <div className=' flex flex-col justify-center  items-center h-[40vh] w-[20vw] border rounded-xl shadow-lg  rounded-lg shadow-3xl bg-white/80 border-color1 border border-white   gap-8'>
                                    <h1 className='text-center font-bold text-secondary text-3xl display-1 '>Administration Login</h1> 
       <div className='w-[80%]'>
       <div className=' flex flex-col gap-2 '>
          <label htmlFor="" className='align-center font-bold text-color1 -600 '>Email</label>
      <input className='border border-gray-500 bg-white rounded-xl w-5/4 px-4  h-11' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  
      </div>
      
      <div className=' flex flex-col gap-2'>
      <label htmlFor="" className='align-center font-bold text-color1 -600 '>Password</label>
      
      <input className='border border-gray-500 bg-white rounded-xl px-2 h-11' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

   
       </div>
       <button className=' py-2 px-10 rounded-md border border-color1 bg-green-800 -100 hover:bg-green-400 shadow-lg text-white font-bold' type="submit">Log In</button>
    </div>
    </form>
    </div>
  );
}

export default Auth;