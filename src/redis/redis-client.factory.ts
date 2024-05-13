import { FactoryProvider } from "@nestjs/common";
import { RedisClient, REDIS_CLIENT } from "./redis-client.type";
import { createClient } from "redis";

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
    provide: REDIS_CLIENT,
    
    useFactory: async () => {
        const client = createClient({ url: 'redis://default:CNWfz3kfmqnGjlfpTCKH2pQ6Bsz9Uq9l@redis-13717.c135.eu-central-1-1.ec2.redns.redis-cloud.com:13717' });
        
        await client.connect();
        return client;
    }
}