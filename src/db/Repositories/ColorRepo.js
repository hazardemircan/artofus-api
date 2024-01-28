const mongoose = require("mongoose");

class ColorRepo {
  constructor() {
    const colorSchema = new mongoose.Schema(
      {
        hex:String,
        active: Boolean,
        createdAt: Date,
        updatedAt: Date,
      },
      { collection: "colors" }
    );

    if (mongoose.models.color) {
      this.model = mongoose.model("Color");
    } else {
      this.model = mongoose.model("Color", colorSchema);
    }
  }

  async getActiveColors(){
    return await this.model.find({active:true});
  }
   
}

module.exports = ColorRepo;
