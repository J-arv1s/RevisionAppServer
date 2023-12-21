// const request = require('supertest')
// const app = require('../../app')

// describe('quizController', () => {

//     it('should get a quiz by its Name', async () => {
//         const newQuiz = await request(app)
//           .post('/quizzes')
//           .send({ quizName: 'testQuiz' });
    
//         const response = await request(app).get(`/quizzes/${newQuiz.quizName}`);
    
//         expect(response.statusCode).toBe(200);
//       });
// })