async function test() {
  const Redis = require('ioredis')

  const redis = new Redis({
    port: 6378,
    // host: '127.0.0.1',
    // family: 4,
    password: 123456
    // db: 0
  })

  // await redis.setex('b', 10, 123)
  const keys = await redis.keys('*')
  console.log(await redis.get('b'))
}

test()
