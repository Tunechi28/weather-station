import { weatherStation } from "../Weather Station/weather-station-service";

const Redis = require("ioredis");
const { promisify } = require("util");

const client = new Redis();
const asyncGet = promisify(client.get).bind(client);
const asyncDel = promisify(client.del).bind(client);

describe("weatherStation", () => {
    // close the Redis connection after all tests are done
    afterAll(() => {
        client.disconnect();
    });
    beforeEach(async () => {
        await asyncDel("test");
    });

    afterEach(async () => {
        await asyncDel("test");
    });

    it("should return an empty array if no matching records are found", async () => {
        const result = await weatherStation("qwerty");
        expect(result).toEqual([]);
    });

    it("should fetch and return all matching records", async () => {
        const result = await weatherStation("Altay City");
        expect(result).toEqual(["cached"]);
    });

    it("should cache the results in Redis", async () => {
        await weatherStation("Altay City");
        const cachedResult = await asyncGet("Altay City");
        expect(cachedResult).not.toBeNull();
    });

    it("should return the cached results if available", async () => {
        await client.set("Altay City", JSON.stringify(["cached"]));
        const result = await weatherStation("Altay City");
        expect(result).toEqual(["cached"]);
    });
});
