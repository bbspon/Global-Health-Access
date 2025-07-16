import React from 'react'

function AboutUs() {
  return (
    <>
    <div className='container p-5 border rounded my-5'>
   <div className='m-3'>
        <h2 className='pb-3 border-bottom border-2 '>BBS Global Health Access</h2>
        <p className='lead py-3'><em>BBS Global Health Access</em> is a next-gen healthcare platform designed to offer 
        <em>affordable, cashless health plans</em> across <em className='fw-black'>India and the UAE</em>. 
        Unlike traditional insurance, our Basic, Prime, and Elite memberships are priced at just 50–60% of typical insurance premiums, 
        making quality healthcare accessible without the burden of high upfront costs or reimbursement delays.</p>
        
         

      <div className='row my-5 mx-5'  >
          <ul className='text-start '>
           <h5 className="fw-bold pb-2 px-3 text-start">Every plan includes:</h5>
          <li>Virtual consultation support with 24/7 AI-powered assistance</li>
          <li>Discounted OPD visits, including savings on doctor consultations, pharmacy bills, diagnostic labs, and scans</li>
          <li>Digital health cards, usable across partner hospitals</li>
          <li>Maternity and dental add-on modules</li>
          <li>Secure health record vaults</li>
          <li>Direct hospital payments — no reimbursement process required</li>
        </ul>

        <ul className='text-start mt-5 '>
          <h5  className="fw-bold pb-2 px-3 text-start">What truly sets us apart:</h5>
          <li>🌍 We enable medical tourism from high-cost countries like the USA, UK, EU, Canada, and Australia by offering premium care in South India’s top hospitals</li>
          <li>💳 No reimbursement model </li>
          <li>🌎 Medical tourism enabled — patients from high-cost countries (USA, UK, Canada, etc.) can access premium hospitals in South India</li>
          <li>🧠 AI Assistants to guide users for bookings, health advice, and plan selection</li>
          <li>🏥 Geo-filtered pricing for different cities, hospitals, and countries</li>
          <li>💼 Partner tools with CRM and commission logic built-in</li>
        </ul>
      </div>


        <p>Our mission is to make quality healthcare globally accessible and financially sustainable — whether you're in a metro city, a Tier-2 town, or abroad.</p>
        <h3>It is a pioneering digital healthcare solution.</h3>
     </div>
    </div>
  
    </>
  )
}

export default AboutUs