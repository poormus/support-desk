import axios from "axios";

const API_URL = "/api/tickets/";

const createTicket = async (ticketData, token) => {
  console.log(`toke is ${token}`);
  console.log(`ticket  is ${ticketData}`);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

//get user tickets
const getTickets = async (token) => {
  console.log(`token is ${token}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log(`response for get tickets is ${response.data}`)
  return response.data.tickets;
};

//get single ticket
const getTicket = async (ticketId,token) => {
  //console.log(`token is ${token}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL+ticketId,config);
  // console.log(`response for get single  ticket is ${response.data}`)
  // console.log(`ticket id is ${ticketId}`)
  return response.data.ticket;
};

//close ticket status
const closeTicket = async (ticketId,token) => {
  console.log(`token is ${token}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL+ticketId,{status:'closed'},config);
  return response.data;
};

//close ticket status
const deleteTicket = async (ticketId,token) => {
  console.log(`token is ${token}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL+ticketId,config);
  if(response.data.success){
    return ticketId
  }else {
    return ''
  }
  
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  deleteTicket
};

export default ticketService;
