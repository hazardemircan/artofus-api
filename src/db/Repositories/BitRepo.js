const mongoose = require('mongoose');
const { COLLECTION_BITS, MODEL_BIT } = require('./constants');
class BitRepo {
  constructor() {
    const bitSchema = new mongoose.Schema({
      mapId: mongoose.Schema.Types.ObjectId,
      sortNumber: Number,
      color: mongoose.Schema.Types.ObjectId,
      locked: Boolean,
      createdAt:Date,
      updatedAt: Date,
    }, { collection: COLLECTION_BITS });

    // Create the model if it doesn't already exist
    if (mongoose.models.Bit) {
      this.model = mongoose.model(MODEL_BIT);
    } else {
      this.model = mongoose.model(MODEL_BIT, bitSchema);
    }
  }

  async createBit(data) {
    const bit = new this.model(data);
    return await bit.save();
  }

  async getAllBits() {
    return await this.model.find();
  }

  async getBitsByMap(mapId){
    
    return await this.model.find({mapId:mapId});
  }

  async getBitById(id){
    return await this.model.findById(id);
  }
  async changeColorById(id,color){
    return await this.model.findByIdAndUpdate(id,{color:color,updatedAt:Date.now()});
  }
  async isLocked(id){
    var bit= await this.model.findById(id)
    if(bit){
      return bit.locked;
    }

    return null;
  }
  async lockById(id){
    return await this.model.findByIdAndUpdate(id,{locked:true,updatedAt:Date.now()})
  }
  async unlockById(id){
    return await this.model.findByIdAndUpdate(id,{locked:false,updatedAt:Date.now()})
  }
}

module.exports = BitRepo;
