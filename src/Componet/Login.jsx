import { useState } from 'react';
import Swal from "sweetalert2";

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const login_url = `${import.meta.env.VITE_API}/api/auth/login`;

    try {
      const formData = new FormData();
      formData.append("email", email); // Fixed variable name from username to email
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
       console.log("jskns");
        Swal.fire({
          title: "Success",
          text: "You've successfully logged in!",
          icon: "success",
          confirmButtonColor: "color1 ",
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Email Or Password Incorrect!",
          icon: "error",
          confirmButtonColor: "color1 ",
        });
      }

    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Email Or Password Incorrect!",
        icon: "error",
        confirmButtonColor: "color1 ",
      });

      console.error(error);
    }

    console.log({
      email, // Changed from username to email
      password,
    });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Log In</button>
      <form
        onSubmit={handleLogin}
        className="flex justify-center items-center mx-24"
      >
        <div
          className="bg-white flex flex-col items-center w-[480px] p-[80px] rounded-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ boxShadow: "0px 4px 41.9px 24px rgba(0, 0, 0, 0.10)" }}
        >
          <div className=" flex flex-col max-w-[384px] content-center items-center gap-[32px]">
            <div className="flex flex-col items-center content-center gap-[20px]">
              <div className=" flex justify-center items-center">
             
              </div>
              <div>
                <h1 className="text-2xl text-center font-normal text-[#393939]">
                  Dispatcher Login
                </h1>
              </div>
            </div>
            <div className="flex flex-col content-center items-center gap-[16px]">
              <div className="flex flex-col w-[300px] items-start gap-[16px]">
                <label
                  htmlFor="userName"
                  className="text-[#393939] text-[14px] font-normal opacity-80"
                >
                  Username
                </label>
                <input
                  type="tel"
                  name="username"
                  id="username"
                  placeholder="ekelle@africatechnology.com"
                  className="relative flex w-full h-[50px] items-center border-[1px] border-[#393939] opacity-80 px-3 rounded-[5px] focus:outline-none focus:border-[#009999] focus:border-[2px]"
                  onChange={(e) => setEmail(e.target.value)} // Changed from setusername to setEmail
                />
              </div>
              <div className="flex flex-col w-[300px] items-start gap-[16px]">
                <label
                  htmlFor="password"
                  className="text-[#393939] text-[14px] font-normal opacity-80"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    type={ "password"}
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="**********"
                    className=" w-full flex h-[50px] items-center border-[1px] border-[#393939] opacity-80 px-3 rounded-[5px] focus:outline-none focus:border-[#009999] focus:border-[2px]"
                    onChange={(e) => setPassword(e.target.value)} // Changed from setpassword to setPassword
                  />
       
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#009999] text-white rounded-[5px] gap-[10px] items-center content-center h-[50px] w-full"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;