import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import {
  getTicket,
  reset,
  closeTicket,
  deleteTicket,
} from "../features/ticket/TicketSlice";
import {
  getNotes,
  reset as noteReset,
  createNote,
} from "../features/notes/NoteSlice";
import BackButton from "../components/BackButton";
import { ClipLoader } from "react-spinners";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const {
    notes,
    isLoading: notesIsLoading,
    isError: noteError,
  } = useSelector((state) => state.note);

  const params = useParams();
  const nav = useNavigate();
  const { ticketId } = params;

  useEffect(() => {
    if (isError || noteError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, ticketId, message]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("ticket closed");
    nav("/tickets");
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();

    if (noteText.trim() === "") {
      toast.error("Note can not be empty");
      return;
    }

    dispatch(createNote({ noteText, ticketId }));
    setNoteText("");
    closeModal();
  };
  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.length === 0 ? (
        <h3>No notes</h3>
      ) : (
        <>
          {notesIsLoading && <ClipLoader/>}
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}

        </>
      )}

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
