const Plate = require('../models/plate.model');

module.exports = {
   async find(req, res) {
      try {
         const result = await Plate.find().populate({
            path: 'menus',
            select: '-plates'
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findById(req, res) {
      try {
         const id = req.params.id;
         const result = await Plate.findById(id).populate({
            path: 'menus',
            select: '-plates'
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async create(req, res) {
      try {
         const data = req.body;
         const result = await Plate.create(data);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async finByIdAndUpdate(req, res) {
      try {
         const id = req.params.id;
         const data = req.body;
         const result = await Plate.findByIdAndUpdate(id, data, {
            useFindAndModify: false,
            new: true
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findByIdAndDelete(req, res) {
      try {
         const id = req.params.id;
         const result = await Plate.findByIdAndDelete(id);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
