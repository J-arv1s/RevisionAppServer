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
  return await this.findOne({ subjectName: subjectName })
}

subjectSchema.statics.createOne = async function(name) {
  const subject = new this({ subjectName: name });
  await subject.save();
  return subject;
};

subjectSchema.statics.updateOneByName = async function (subjectName, data) {
  return await this.findOneAndUpdate({ subjectName }, data, { new: true });
};

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
