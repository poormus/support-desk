import axios from "axios";

const API_URL='/api/tickets/'


const createTicket= async (ticketData,token)=>{

    console.log(`toke is ${token}`)
    console.log(`ticket  is ${ticketData}`)

  const config={
    headers:{
       Authorization:  `Bearer ${token}`
    }
  }
   const response= await axios.post(API_URL,ticketData,config)

   return response.data
}


const ticketService={
    createTicket
}

export default ticketService