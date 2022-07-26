const express=require('express')

//merge param true to get notes for a specific ticket
const router=express.Router({mergeParams:true})

const {getNotes, addNote} = require('../controller/NotesController')

const {protect}=require('../middleware/AuthMiddleware')


router.route('/').get(protect,getNotes).post(protect,addNote)


module.exports=router