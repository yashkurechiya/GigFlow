import { configDotenv } from 'dotenv';
import { createClient } from 'redis';

configDotenv();

const redisClient = createClient({
    url : process.env.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Redis connected ");
})

redisClient.on("error",(err) =>{
    console.error("Redis error: ",err);
});

await redisClient.connect();

export default redisClient;
