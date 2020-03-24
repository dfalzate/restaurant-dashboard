const Menu = require('../models/menu.model');
const Plate = require('../models/plate.model');

module.exports = {
   async find(req, res) {
      try {
         const result = await Menu.find().populate({
            path: 'plates',
            select: '-menus'
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findById(req, res) {
      try {
         const idMenu = req.params.idMenu;
         const result = await Menu.findById(idMenu).populate({
            path: 'plates',
            select: '-menus'
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async create(req, res) {
      try {
         const idPlate = req.params.idPlate;
         let menu = req.body;
         menu.plates.push(idPlate);
         const newMenu = await Menu.create(menu);
         let plate = await Plate.findById(idPlate);
         plate.menus.push(newMenu._id);
         const newPlate = await plate.save();
         res.status(200).send(menu);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findByIdAndUpdate(req, res) {
      try {
         const idMenu = req.params.idMenu;
         const menu = req.body;
         const result = await Menu.findByIdAndUpdate(idMenu, menu, {
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
         const idMenu = req.params.idMenu;
         const result = await Menu.findByIdAndDelete(idMenu);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async addPlate(req, res) {
      try {
         const idMenu = req.params.idMenu;
         const idPlate = req.params.idPlate;
         const menu = await Menu.findById(idMenu);
         menu.plates.push(idPlate);
         await menu.save();
         res.status(200).send(menu);
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
