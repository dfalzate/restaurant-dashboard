/* eslint-disable jest/no-test-callback */
const { app, mongoose } = require('../app');
const request = require('supertest');
const bcrypt = require('bcrypt');

describe('user.route', () => {
   beforeEach(async () => {
      for (let collection in mongoose.connection.collections) {
         await mongoose.connection.collections[collection].deleteMany({});
      }
   });

   afterAll(async () => {
      await mongoose.disconnect();
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
