const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
	content: String,
	date: Date,
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'		
	}
})

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.user
		delete returnedObject._id
		delete returnedObject.__v
	}
})
commentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Comment', commentSchema)
