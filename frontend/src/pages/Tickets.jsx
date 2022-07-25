import React from 'react'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTickets ,reset} from '../features/ticket/TicketSlice'
import { ClipLoader } from 'react-spinners'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {

  const {tickets,isLoading,isSuccess}=useSelector((state)=>state.ticket)  
  const dispatch=useDispatch()
  const currentIndex=-1

  //dispath reset on unmounth
  useEffect(()=>{
    return ()=>{
        if(isSuccess){
        dispatch(reset())
        }
    }
  },[dispatch,isSuccess])


  useEffect(()=>{
    dispatch(getTickets())
  },[dispatch])


  if(isLoading){
    return <ClipLoader/>
  }

  if(tickets.length==0){
    return <div className="center">
      <h3>You have no tickets yet</h3>
    </div>
  }
  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket,index) => (
          <TicketItem key={ticket._id} ticket={ticket} index={index} currentIndexItem={currentIndex} />
        ))}
      </div>
    </>
  )
}

export default Tickets
