/* eslint-disable jest/no-test-callback */
const { app, mongoose } = require('./app');
const request = require('supertest');
const bcrypt = require('bcrypt');

describe('app', () => {
   beforeEach(async () => {
      for (let collection in mongoose.connection.collections) {
         await mongoose.connection.collections[collection].deleteMany({});
      }
   });

   it('Should get all menus', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const menu = await mongoose.models.Menu.create({
            name: 'Menu 1',
            display: true,
            plates: [plate._id]
         });
         const response = await request(app).get('/menus');
         done();
         expect(response.status).toBe(200);
         expect(response.body[0].name).toBe(menu.name);
         expect(response.body[0].display).toBe(menu.display);
      } catch (error) {
         done(error);
      }
   });

   it('Should get one menu item', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const menu = await mongoose.models.Menu.create({
            name: 'Menu 1',
            display: true,
            plates: [plate._id]
         });
         const response = await request(app).get(`/menus/${menu._id}`);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should create a menu with a plate', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .post(`/menus/plates/${plate._id}`)
            .send({
               name: 'Menu 1',
               display: true,
               plates: []
            });
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should status 400 creating a menu', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .post(`/menus/plates/${plate._id}`)
            .send({
               display: true
            });
         done();
         expect(response.status).toBe(400);
      } catch (error) {
         done(error);
      }
   });

   it('Should update an existing menu ', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['New Arroz', 'Coco'],
            description: 'New Arroz con coco'
         });
         const menu = await mongoose.models.Menu.create({
            name: 'NEW Menu 1',
            display: true,
            plates: [plate._id]
         });
         const response = await request(app)
            .put(`/menus/${menu._id}`)
            .send({
               name: 'Actualized'
            });
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should delete an existing menu ', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const menu = await mongoose.models.Menu.create({
            name: 'Menu 1',
            display: true,
            plates: [plate._id]
         });
         const response = await request(app).delete(`/menus/${menu._id}`);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });
   it('should add a plate to a existing menu', async done => {
      try {
         const plateCoco = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const platePollo = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Pollo'],
            description: 'Arroz con pollo'
         });
         const menu = await mongoose.models.Menu.create({
            name: 'Menu 1',
            display: true,
            plates: [plateCoco._id]
         });
         const response = await request(app)
            .put(`/menus/${menu._id}/plates/${platePollo._id}`)
            .send({});
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should get existing plates', async done => {
      const response = await request(app).get('/plates');
      done();
      expect(response.status).toBe(200);
   });

   it('Should get an existing plate', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app).get(`/plates/${plate._id}`);
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe(plate.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should create a plate', async done => {
      try {
         const plate = {
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         };
         const response = await request(app)
            .post(`/plates`)
            .send(plate);
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe(plate.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should update an existing plate', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .put(`/plates/${plate._id}`)
            .send({ description: 'updated' });
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe('updated');
      } catch (error) {
         done(error);
      }
   });

   it('Should delete an existing plate', async done => {
      try {
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app).delete(`/plates/${plate._id}`);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });

   it('Should create a new user', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         const response = await request(app)
            .post('/users/signup')
            .send(user);
         done();
         expect(response.statusCode).toBe(200);
         expect(response.text).toMatch('created');
      } catch (error) {
         done(error);
      }
   });

   it('Should login a new user', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         const newUser = Object.assign({}, user);
         newUser.password = await bcrypt.hash(newUser.password, 8);
         await mongoose.models.User.create(newUser);
         const response = await request(app)
            .post('/users/login')
            .send(user);
         done();
         expect(response.statusCode).toBe(200);
      } catch (error) {
         done(error);
      }
   });
});
