import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/AuthSlice';
import ticketReducer from '../features/ticket/TicketSlice';
import noteReducer from '../features/notes/NoteSlice'


export const store = configureStore({
  reducer: {
    auth:authReducer,
    ticket:ticketReducer,
    note:noteReducer
  },
});
