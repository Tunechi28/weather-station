import * as weatherStationService from "./weather-station-service";

export const weatherStation = async (params: any) => {
    const data = await weatherStationService.weatherStation(params.keyword)
    return data
};


