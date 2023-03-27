import { WeatherApiResponse, WeatherRecord } from "./weather-station-interface";
import { getRedisInstance } from "../../lib/redis";
import axios from "axios";
import { InternalServerError } from "../../utils";

const redisClient = getRedisInstance();

export async function weatherStation(keyword: string): Promise<string[]> {

  try{
  let allRecords: WeatherRecord[] = [];

  // Check if the results are cached in Redis
  const cachedResult = await redisClient.get(keyword);
  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  // Fetch all the records from the API
  const firstPageUrl = new URL("https://jsonmock.hackerrank.com/api/weather/search");
  firstPageUrl.searchParams.set("name", keyword);
  firstPageUrl.searchParams.set("page", "1");
  const firstPageResponse = await axios.get<WeatherApiResponse>(firstPageUrl.toString());
  const firstPageData = firstPageResponse.data;
  allRecords = firstPageData.data;

  if (firstPageData.total_pages > 1) {
    const promises: Promise<any>[] = [];
    for (let page = 2; page <= firstPageData.total_pages; page++) {
      const url = new URL("https://jsonmock.hackerrank.com/api/weather/search");
      url.searchParams.set("name", keyword);
      url.searchParams.set("page", page.toString());
      promises.push(axios.get<WeatherApiResponse>(url.toString()));
    }
    const responses = await Promise.all(promises);
    const results = responses.map(response => response.data);
    allRecords = allRecords.concat(results.flatMap(result => result.data));
  }

  const filteredRecords = allRecords.filter(record => record.name.toLowerCase().includes(keyword.toLowerCase()));

  const result = filteredRecords.reduce<string[]>((acc, record) => {
    const cityName = record.name;
    const temperature = record.weather.replace(/[^0-9-]/g, '');
    const wind = record.status[0].replace(/[^0-9]/g, '');
    const humidity = record.status[1].replace(/[^0-9]/g, '');

    const recordString = `${cityName},${temperature},${wind},${humidity}`;
    acc.push(recordString);

    return acc;
  }, []);

  result.sort();

  if (result.length > 0) {
    const pipeline = redisClient.pipeline();
    pipeline.set(keyword, JSON.stringify(result));
    pipeline.expire(keyword, 3600);
    await pipeline.exec();
  }

  return result;
}catch(err){
  throw new InternalServerError(err)
}
}