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
    const count = await UserBoard.countDocuments()
    expect(count).toBe(1)

    const userBoardInDB = await UserBoard.findOne()

    expect(userBoardInDB.user_id).toBe("1")

    const _id = userBoardInDB._id
    expect(_id).toBeDefined()

    expect(res.status).toBe(200)
    expect(res.body).not.toBeNull()
    expect(res.body.user_id).toBe("1")
    expect(res.body._id).toBe(_id.toString())
  })

  it("should not recreate userboards", async () => {
    //given
    await request.get('/api/userboards').set("X-USER-ID", "1")
    const userBoardInDB = await UserBoard.findOne()
    const id = userBoardInDB._id

    //when
    const res = await request.get('/api/userboards').set("X-USER-ID", "1")

    //then
    const count = await UserBoard.countDocuments()
    expect(count).toBe(1)

    const userBoardInDB2 = await UserBoard.findOne()
    const id2 = userBoardInDB2._id
    expect(id).toEqual(id2)
  })
})