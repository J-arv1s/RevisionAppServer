const mongoose = require('mongoose')
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: { 
    type: String, 
    required: true, 
  },
  quizzesId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Quiz' }]
});

subjectSchema.statics.getAll = async function () {
  return await this.find();
};

subjectSchema.statics.getOneById = async function (id) {
  return await this.findById(id);
}

subjectSchema.statics.getOneByName = async function (subjectName) {
  return await this.findOne({ subjectName })
}

subjectSchema.statics.createOne = async function(subjectName) {
  const subject = new this({ subjectName: subjectName });
  await subject.save();
  return subject;
};

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
