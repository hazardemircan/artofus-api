const BitRepo = require("../../db/Repositories/BitRepo");
const MapRepo = require("../../db/Repositories/MapRepo");
const ColorRepo = require("../../db/Repositories/ColorRepo");

class bitMapService {
  constructor() {
    this._bitRepo = new BitRepo();
    this._mapRepo = new MapRepo();
    this._colorRepo = new ColorRepo();
  }
  async createMap(w, h) {
    var result = await this._mapRepo.createMap(w, h);
    return result;
  }
  async getInitialData() {
    var activeMap=await this._mapRepo.getActiveMap();
    var bitsOfActiveMap=await this._bitRepo.getBitsByMap(activeMap.id);
     //console.log(activeMap);

  //  var a= await bitsOfActiveMap.forEach((bit,index,arr)=>{arr[index].color=this._colorRepo.getColorHexById(arr[index].color)});
  //   console.log(bitsOfActiveMap);
    var colors = await this._colorRepo.getActiveColors();

    return {map:activeMap,bits:bitsOfActiveMap,colors:colors}
  }
  async getMap() {
    var map = await this._mapRepo.getActiveMap();
    var bitsOfMap = await this._bitRepo.getBitsByMap(map.id);
    return { map: map, bits: bitsOfMap};
  }
  async changeBitColor(id, color) {
    var bit = await this._bitRepo.getBitById(id);

    if (bit) {
      //   if (!bit.locked) {
      bit = await this._bitRepo.changeColorById(id, color);
      //   }

      return bit;
    }

    return null;
  }
}

module.exports = bitMapService;
