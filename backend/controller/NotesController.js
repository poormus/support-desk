const expressAsyncHandler = require("express-async-handler");
const User=require('../models/UserModel')
const Ticket=require('../models/TicketModel')
const Note=require('../models/NoteModel')



var util = require('util')

//@desc gets notes for a ticket
//@route GET /api/tickets/:ticketId/notes
//@access private
const getNotes=expressAsyncHandler(async (req,res)=>{

   console.log(req.user.id)
   //Get user by id
   const user= await User.findById(req.user._id)

  // console.log(`user is ${user}`)
   console.log(`request is ${util.inspect(req)}`)
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   const ticket= await Ticket.findById(req.params.ticketId)
   
   //console.log(`ticket  is ${ticket}`)
   
   if(ticket.user.toString() != req.user._id){
      res.status(401)
      throw new Error('Unauthorized')
   }

   const notes =await Note.find({ticket:req.params.ticketId})

   res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = expressAsyncHandler(async (req, res) => {
   // Get user using the id in the JWT
   const user = await User.findById(req.user.id)
   util.inspect(req)
   if (!user) {
     res.status(401)
     throw new Error('User not found')
   }
 
   const ticket = await Ticket.findById(req.params.ticketId)
 
   if (ticket.user.toString() !== req.user.id) {
     res.status(401)
     throw new Error('User not authorized')
   }
 
   const note = await Note.create({
     text: req.body.text,
     isStaff: false,
     ticket: req.params.ticketId,
     user: req.user.id,
   })
 
   res.status(200).json(note)
 })


module.exports={
   getNotes,addNote
}