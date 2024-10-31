
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import PopOutPlayer from './PopOutPlayer';
import bg from '../assets/img/abvid.webp'

const Rule = () => {
  
  const en = useStore((state) => state.en);

 



return (
    <>


<div className="container-fluid py-5 flex justify-center items-center bg-white"style={{ backgroundImage: `linear-gradient(rgba(255,255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${bg})`}} >
  <div className="container py-5">
    <div className="row g-5">
      
      <div className="col-lg-8 col-md-10 mx-auto text-black px-8 rounded-md shadow-xl my-10 py-10  bg-white border ">
        <h1 className="text-3xl font-bold text-center display-1 text-color1 mb-4">Yeneta Language and Cultural Academy</h1>
        <h2 className="text-2xl font-semibold text-center  mb-4">Rules and Regulations for Parents</h2>
        <p className="mb-4">At Yeneta Language and Cultural Academy, we strive to provide a safe, educational, and enriching environment for all students. To ensure the smooth operation of our programs and the safety of all children, we request that parents adhere to the following rules and regulations:</p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">
            <strong>Timely Arrival and Pickup:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Parents are responsible for bringing their children to the academy on time. Classes begin promptly at selected time, and it is important for students to be present from the beginning to avoid disruption and ensure they benefit fully from the lessons.</li>
              <li>Pickup time is selected time. Parents must pick up their children promptly at the end of the session. Late pickups cause inconvenience to the staff and the children, and repeated lateness may result in additional fees or other consequences.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Attendance:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Regular attendance is crucial for your child's progress. If your child is unable to attend a session, please inform the academy in advance by calling +1 240-374-8205 or emailing info@yenetaschool.com.</li>
              <li>Excessive unexcused absences may affect your child's ability to keep up with the curriculum and may result in a review of their enrollment status.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Safety and Supervision:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Parents must ensure that their children are supervised until they enter the academy and after they exit. The academy is not responsible for children outside of scheduled class times.</li>
              <li>Children should not be left unattended before the academy opens or after it closes.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Behavior and Conduct:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Encourage your child to respect the academy’s rules, staff, and fellow students. Positive behavior is essential for a conducive learning environment.</li>
              <li>Parents are also expected to conduct themselves respectfully when on academy premises.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Communication:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Maintain open communication with the academy regarding your child’s progress, any concerns, or any changes in contact information.</li>
              <li>Check for updates from the academy regularly through emails, notices, or the academy’s communication app.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Health and Well-being:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Do not send your child to the academy if they are unwell. This helps prevent the spread of illness to other children and staff.</li>
              <li>Inform the academy of any medical conditions or allergies your child has, along with emergency contact details.</li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Participation:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Encourage your child to participate actively in all academy activities and cultural events, as these are integral to their learning experience.</li>
              <li>Attend parent-teacher meetings and other academy events to stay engaged with your child's education.</li>
            </ul>
          </li>
        </ol>
        <p className="mb-4">We appreciate your cooperation and commitment to making Yeneta Language and Cultural Academy a wonderful place for learning and growth. By following these rules and regulations, you help us maintain a safe and nurturing environment for all students.</p>
        <p className="font-semibold">Thank you for your understanding and support.</p>
        <p className="font-semibold">Sincerely,<br/>Yeneta Language and Cultural Academy</p>
      </div>
    </div>
  </div>
</div>
     
</>
  );
};

export default Rule;
