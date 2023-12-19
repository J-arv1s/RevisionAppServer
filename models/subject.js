const mongoose = require('mongoose')
const { Schema } = mongoose;


const subjectSchema = new Schema({
    subject_name: { type: String, required: true },
    quizesId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'quiz' }]
  });

  subjectSchema.statics.getAll = async function () {
    return await this.find();
  };

  subjectSchema.statics.getOneById = async function (id) {
    return await this.findById(id);
  }

  subjectSchema.statics.getOneBySubject = async function (subject_name) {
    return await this.findOne({ subject_name })
  }

  subjectSchema.statics.create = async function(subject_name) {
    const subject = new this({ subject_name });
    await subject.save();
    return subject;
  };

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject

// tokenSchema.statics.create = async function(user_id) { 
//     const token = new this({ user_id, token: uuidv4() });
//     return await token.save();
//   }


// userSchema.statics.create = async function (data) {
//     const { username, password, isAdmin = false } = data;
//     const newUser = new this({ username, password, isAdmin });
//     return await newUser.save(); 
//   };

// const User = mongoose.model('User', userSchema);
// module.exports = User;
