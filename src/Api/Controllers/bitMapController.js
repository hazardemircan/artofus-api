const BitRepo = require("../../db/Repositories/BitRepo");
const MapRepo = require("../../db/Repositories/MapRepo");
const bitMapService = require("../Services/bitMapService");

exports.createMap = async (req, res) => {
  const map = new MapRepo();

  var result = await map.createMap(req.query["width"], req.query["height"]);

  res.send(result);
};
exports.getBitMap = async (req, res) => {
  const service = new bitMapService();
  var result = await service.getMap();
  res.send(result);
};
exports.changeColorOfBit = async (req, res) => {
  const bits = new BitRepo();

  var bit = await bits.getBitById(req.query["id"]);

  if (bit.locked) {
    res.send(false);
  }

  bit.color = req.query["color"];
  bit.updatedAt = Date.now();
  bit.save();
  res.send(true);
};
exports.isLocked = async (req, res) => {
  const bits = new BitRepo();
  var bit = await bit.getBitById(req.query["id"]);

  res.send(bit.locked);
};
exports.lockById = async (req, res) => {
  const bit = new BitRepo();
  var result = await bit.lockById(req.query["id"]);

  res.send(result);
};

exports.unlockById = async (req, res) => {
  const bit = new BitRepo();
  var result = await bit.unlockById(req.query["id"]);

  res.send(result);
};
