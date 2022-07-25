import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTicket, reset, closeTicket,deleteTicket } from "../features/ticket/TicketSlice";
import BackButton from "../components/BackButton";
import { ClipLoader } from "react-spinners";


function Ticket() {

  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const params = useParams();
  const nav = useNavigate();
  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, ticketId, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("ticket closed");
    nav("/tickets");
  };

  const onTicketDelete = () => {
    dispatch(deleteTicket(ticketId));
    toast.success("ticket deleted");
    nav("/tickets");
  };

  if (isLoading) {
    return <ClipLoader />;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          {" "}
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted:{new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product:{ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p> {ticket.description}</p>
        </div>
      </header>
      {ticket.status === "closed" ? (
        <div className="outer">
          <h3>Ticket closed</h3>
        </div>
      ) : (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
