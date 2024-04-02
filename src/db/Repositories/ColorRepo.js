const mongoose = require("mongoose");
const { COLLECTION_COLORS, MODEL_COLOR } = require('./constants');

class ColorRepo {
  constructor() {
    const colorSchema = new mongoose.Schema(
      {
        hex:String,
        active: Boolean,
        createdAt: Date,
        updatedAt: Date,
      },
      { collection: COLLECTION_COLORS }
    );

    if (mongoose.models.Color) {
      this.model = mongoose.model(MODEL_COLOR);
    } else {
      this.model = mongoose.model(MODEL_COLOR, colorSchema);
    }
  }

  async getActiveColors(){
    return await this.model.find({active:true});
  }
  async getColorHexById(id){
    return await this.model.findOne({id:id});
  }
   
}

module.exports = ColorRepo;
