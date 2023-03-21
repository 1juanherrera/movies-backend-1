const request = require('supertest')
const app = require('../app');
// require('../models')

let actorId;

test('POST /actor should create one artist', async() => {
    const newActor = {
        firstName: "Dwayne",
        lastName: "Johnson",
        nationality: "Estados Unidos",
        image: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTEpvaNuV1GBPcVY8iaFtGNKbXoEL7AYUvL2p2c-weTPf-QRNVLpvquxRw9P4RU5Wyp",
        birthday: "1972/05/02"
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor)
    actorId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newActor.name)
})

test('GET /actor should return all artists', async() => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('PUT /actors should return all actors', async() => {
    const body = { firstName: "updated" }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test('DELETE /actors/:id should return 204', async() => {
    const res = await request(app).delete(`/actors/${actorId}`)
    expect(res.status).toBe(204)
})

