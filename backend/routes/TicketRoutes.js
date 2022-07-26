const express=require('express')
const router=express.Router()
const {getTickets,createTicket,deleteTicket,updateTicket,getTicket}=require('../controller/TicketController')

const {protect}=require('../middleware/AuthMiddleware')

const noteRouter=require('./NoteRoutes')
router.use('/:ticketId/notes',noteRouter)

router.route('/').get(protect,getTickets).post(protect,createTicket)
router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports=router