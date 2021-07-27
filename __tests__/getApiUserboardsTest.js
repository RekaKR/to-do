const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)
const { startServer, stopServer, deleteAll } = require('./util/inMemDb')
const UserBoard = require('../models/userBoardModel')


describe('GET - api/userboards tests', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await startServer("getApiUserboards")
  })

  afterAll(async () => {
    await stopServer(mongoServer)
  })

  afterEach(async () => {
    await deleteAll([UserBoard])
  })

  it("should return 401 /wo x-user-id header", async () => {
    //given
    //app has started

    //when
    const res = await request.get('/api/userboards')

    //then
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("x-user-id missing")
  })

  it("should return 200 /w x-user-id header", async () => {
    //given
    //app has started

    //when
    const res = await request.get('/api/userboards').set("X-USER-ID", "1")

    //then
    expect(res.status).toBe(200)
  })
})