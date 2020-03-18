const Menu = require('../models/menu.model');
const Plate = require('../models/plate.model');

module.exports = {
   async find(req, res) {
      try {
         const result = await Menu.find();
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findById(req, res) {
      try {
         const id = req.params.id;
         const result = await Menu.findById(id).populate('plates');
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async create(req, res) {
      try {
         const idPlate = req.params.id;
         const menu = req.body;
         Menu.create(menu).then(menu => {
            Plate.findById(idPlate).then(plate => {
               menu.plates.push(plate);
               menu.save().then(menu => res.status(200).send(menu));
            });
         });
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
