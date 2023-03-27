
export interface WeatherRecord {
    name: string;
    weather: string;
    status: string[];
  }

export interface WeatherApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: WeatherRecord[];
  }
export interface ApiQueryParams {
    keyword: string
}