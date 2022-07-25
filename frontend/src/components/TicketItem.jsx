import { Link } from "react-router-dom";
import { FaBeer,FaEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket, reset ,closeTicket} from "../features/ticket/TicketSlice";
import { ClipLoader } from "react-spinners";

function TicketItem({ ticket,index,currentIndexItem }) {

  const dispatch = useDispatch();
  const { tickets,isTicketDeleting } = useSelector((state) => state.ticket);
  
  



  const onDeleteTicket = (e) => {
    if (isTicketDeleting) {
      toast.success("deleting");
    }
    
    dispatch(deleteTicket(ticket._id));
    
  };

  const onCloseTicket=()=>{
    if(ticket.status==='closed'){
      toast.error('Already closed')
      return
    }
    dispatch(closeTicket(ticket._id))
  }

  
  
  
  return (
    <div className="ticket-outer">
      {isTicketDeleting  ? (
        <div className="spinner">
          <ClipLoader />
        </div>
      ) : (
        <>
          <div className="ticket">
          <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
          <div>{ticket.product}</div>
          <div className={`status status-${ticket.status}`}>
            {ticket.status}
          </div>
          <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
            View
          </Link>
          </div>
            
            <FaBeer className='delete-ticket-icon'  onClick={onDeleteTicket}/>
            <FaEdit className='edit-ticket-icon'  onClick={onCloseTicket}/>
        </>
      )}
    </div>
  );
}

export default TicketItem;
