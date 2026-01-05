export interface ApiErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  details?: string[];
  field?: string;
}
