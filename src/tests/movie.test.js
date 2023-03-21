const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let movieId;

test('POST /movies should create one movie', async() => {
    const newMovie = {
        name: "Avatar 2",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSX0NNA56fZmz4v50L5HENXgm93TevQ59iLczKYc-rRXZiA9ImM",
        synopsis: "Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.",
        releaseYear: 2022
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie)
    movieId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newMovie.name)
})

test('GET /movies should return all movies', async() => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('PUT /movies/:id should update one movies', async() => {
    const body = { name: "updated" }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test('POST /movies/:id/actors should set the movies actors', async() => {
    const actor = await Actor.create({
        firstName: "Stephen",
        lastName: "Lang",
        nationality: "Estados Unidos",
        image: "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR1q4WXPF7k0gccerOrWQR4RtnyJnBO2GrO59oegrJmT_qqiYV9iV7krRM7MwOvg1YW",
        birthday: "1952/07/11"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('POST /movies/:id/directors should set the movies directors', async() => {
    const director = await Director.create({
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "Estados Unidos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlTrJvdxqSMBYf90USQe0qXEaMhXdy35FJOpUlEZ5PGl4wIBI",
        birthday: "1963/03/27"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('POST /movies/:id/genres should set the movies genres', async() => {
    const genre = await Genre.create({
        name: "Fantasia"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('DELETE /movies/:id should return 204', async() => {
    const res = await request(app).delete(`/movies/${movieId}`)
    expect(res.status).toBe(204)
})