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

  subjectSchema.statics.getOneByName = async function (subject_name) {
    return await this.findOne({ subject_name })
  }

  subjectSchema.statics.create = async function(subject_name) {
    const subject = new this({ subject_name: subject_name });
    await subject.save();
    return subject;
  };

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
