/* eslint-disable jest/no-test-callback */
const { app, mongoose } = require('../app');
const request = require('supertest');
const bcrypt = require('bcrypt');

describe('plate.route', () => {
   beforeEach(async () => {
      for (let collection in mongoose.connection.collections) {
         await mongoose.connection.collections[collection].deleteMany({});
      }
   });

   afterAll(async () => {
      await mongoose.disconnect();
   });

   it('Should get existing plates', async done => {
      const user = {
         userName: 'username',
         name: 'Name',
         lastName: 'Last Name',
         type: 'Admin',
         password: 'password'
      };
      let newUser = Object.assign({}, user);
      newUser.password = await bcrypt.hash(newUser.password, 8);
      await mongoose.models.User.create(newUser);
      const token = await request(app)
         .post('/users/login')
         .send(user);
      const response = await request(app)
         .get('/plates')
         .set('authorization', token.body.token);
      done();
      expect(response.status).toBe(200);
   });

   it('Should get an existing plate', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         let newUser = Object.assign({}, user);
         newUser.password = await bcrypt.hash(newUser.password, 8);
         await mongoose.models.User.create(newUser);
         const token = await request(app)
            .post('/users/login')
            .send(user);
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .get(`/plates/${plate._id}`)
            .set('authorization', token.body.token);
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe(plate.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should create a plate', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         let newUser = Object.assign({}, user);
         newUser.password = await bcrypt.hash(newUser.password, 8);
         await mongoose.models.User.create(newUser);
         const token = await request(app)
            .post('/users/login')
            .send(user);
         const plate = {
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         };
         const response = await request(app)
            .post(`/plates`)
            .send(plate)
            .set('authorization', token.body.token);
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe(plate.description);
      } catch (error) {
         done(error);
      }
   });

   it('Should update an existing plate', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         let newUser = Object.assign({}, user);
         newUser.password = await bcrypt.hash(newUser.password, 8);
         await mongoose.models.User.create(newUser);
         const token = await request(app)
            .post('/users/login')
            .send(user);
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .put(`/plates/${plate._id}`)
            .send({ description: 'updated' })
            .set('authorization', token.body.token);
         done();
         expect(response.status).toBe(200);
         expect(response.body.description).toBe('updated');
      } catch (error) {
         done(error);
      }
   });

   it('Should delete an existing plate', async done => {
      try {
         const user = {
            userName: 'username',
            name: 'Name',
            lastName: 'Last Name',
            type: 'Admin',
            password: 'password'
         };
         let newUser = Object.assign({}, user);
         newUser.password = await bcrypt.hash(newUser.password, 8);
         await mongoose.models.User.create(newUser);
         const token = await request(app)
            .post('/users/login')
            .send(user);
         const plate = await mongoose.models.Plate.create({
            ingredients: ['Arroz', 'Coco'],
            description: 'Arroz con coco'
         });
         const response = await request(app)
            .delete(`/plates/${plate._id}`)
            .set('authorization', token.body.token);
         done();
         expect(response.status).toBe(200);
      } catch (error) {
         done(error);
      }
   });
});
