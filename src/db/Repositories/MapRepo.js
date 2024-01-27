const mongoose = require("mongoose");
const BitRepo = require("./BitRepo");
const { ObjectId } = require("mongodb");

class MapRepo {
  constructor() {
    const mapSchema = new mongoose.Schema(
      {
        active: Boolean,
        width: Number,
        height: Number,
        createdAt: Date,
        updatedAt: Date,
      },
      { collection: "maps" }
    );

    // Create the model if it doesn't already exist
    if (mongoose.models.map) {
      this.model = mongoose.model("map");
    } else {
      this.model = mongoose.model("map", mapSchema);
    }
  }

  async getActiveMap(){
    return await this.model.findOne({active:true});
  }
  
  async createMap(w, h) {
    const map = new this.model({
      active: false,
      width: w,
      height: h,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    var savedMap = await map.save();

    const bit = new BitRepo();

    for (var i = 0; i < w * h; i++) {
      await bit.createBit({
        mapId: savedMap.id,
        sortNumber: i,
        locked: false,
        color: new ObjectId(process.env.WHITE_OID),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return savedMap;
  }
  async activateMap(id){
    await this.model.updateMany({active:true},{ $set: { active: false,updatedAt:Date.now() } });

    return await this.model.findByIdAndUpdate(id,{active:true,updatedAt:Date.now()});

  }
}

module.exports = MapRepo;
