// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 让服务在应用中全局可用
})
export class HttpClientService {
  private apiUrl = 'http://example.com'; // 替换为你的 API 地址

  constructor(private http: HttpClient) {}

  // GET 请求
  get(params: { [key: string]: any } = {}): Observable<any> {

    const httpParams = new HttpParams({ fromObject: params }); // 将对象转化为 HttpParams
    return this.http.get(this.apiUrl, { params: httpParams });
  }

  // POST 请求
  post(
    requestBody: any,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ): Observable<any> {
    const httpHeaders = new HttpHeaders(headers); // 设置请求头
    return this.http.post(this.apiUrl, requestBody, { headers: httpHeaders });
  }
}
