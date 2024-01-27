const BitRepo = require("../../db/Repositories/BitRepo");
const MapRepo = require("../../db/Repositories/MapRepo");

class bitMapService {
  constructor() {
    this.bitRepo = new BitRepo();
    this.mapRepo = new MapRepo();
  }
  async createMap(w,h){
    
  }
  async getMap() {
    var map = await this.mapRepo.getActiveMap();
    console.log(map.id);
    var bitsOfMap = await this.bitRepo.getBitsByMap(map.id);

    return { map: map, bits: bitsOfMap };
  }
  async changeBitColor(id, color) {
    var bit = await this.bitRepo.getBitById(id);

    if (bit) {
    //   if (!bit.locked) {
        bit = await this.bitRepo.changeColorById(id, color);
    //   }

      return bit;
    }

    return null;
  }
}

module.exports = bitMapService;
