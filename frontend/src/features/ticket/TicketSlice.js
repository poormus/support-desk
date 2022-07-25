import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from '../ticket/TicketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    isTicketDeleting:false,
    message: '',
  }

  export const createTicket=createAsyncThunk('tickets/create', async (ticketData,thunkAPI)=>{
    //console.log(user)
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData,token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })


  //get user tickets
  export const getTickets=createAsyncThunk('tickets/getAll', async (_,thunkAPI)=>{
    //console.log(user)
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })

  //get single ticket
  export const getTicket=createAsyncThunk('tickets/get', async (ticketId,thunkAPI)=>{
    //console.log(user)
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId,token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })

  //update a single ticket status
  export const closeTicket=createAsyncThunk('tickets/close', async (ticketId,thunkAPI)=>{
    //console.log(user)
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId,token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })


   //update a single ticket status
   export const deleteTicket=createAsyncThunk('tickets/delete', async (ticketId,thunkAPI)=>{
    //console.log(user)
    try {
        const token =thunkAPI.getState().auth.user.token
        return await ticketService.deleteTicket(ticketId,token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  })



  export const ticketSlice=createSlice(
    {
        name:'ticket',
        initialState,
        reducers:{
            reset: (state)=>initialState
        },
        extraReducers:(builder)=>{
            builder
            .addCase(createTicket.pending, (state) => {
              state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              
            })
            .addCase(createTicket.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
            .addCase(getTickets.pending, (state) => {
              state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.tickets=action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
            .addCase(getTicket.pending, (state) => {
              state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.ticket=action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
            .addCase(closeTicket.pending, (state) => {
              state.isLoading = true
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
              state.isLoading = false
              state.tickets.map((ticket)=>
                ticket._id===action.payload._id? (ticket.status='closed') :ticket
              )
            })
            .addCase(deleteTicket.pending, (state) => {
              state.isTicketDeleting = true
            })
            .addCase(deleteTicket.rejected, (state, action) => {
              state.isTicketDeleting = false
              state.isError = true
              state.message=action.payload
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
              console.log(`from case ${action.payload}`)
              state.isTicketDeleting = false
              state.tickets= state.tickets.filter((ticket)=>ticket._id!=action.payload)
            })
            
        }
    }
  )

  export const {reset}=ticketSlice.actions

  export default ticketSlice.reducer