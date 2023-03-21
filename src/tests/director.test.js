const request = require('supertest')
const app = require('../app');

let directorId;

test('POST /directors should create one album', async() => {
    const newDirector = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "Canada",
        image: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSPjpuh0M7w-PIgr0hDaeq_A8KTCI-I4dTrPddwxclo0GRNjqKkGpZaB_4vw8SU4A4X",
        birthday: "1954/08/16"
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector)
    directorId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newDirector.name)
})

test('GET / directors should return all directors', async() => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1) 
})

test('PUT /directors/:id should update one director', async() => {
    const body = { firstName: "updated" }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test('DELETE /directors/:id should return 204', async() => {
    const res = await request(app).delete(`/directors/${directorId}`)
    expect(res.status).toBe(204)
})