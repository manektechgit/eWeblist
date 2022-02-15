export interface SiteTotalChartDataRequest {
  FilterBy: 'week' | 'month';
  UserId?: number;
}
export interface SiteTotalClicksResponse {
  DateData: string;
  TotalCount: number;
}
