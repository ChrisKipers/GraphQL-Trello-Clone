import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

const path = 'http://localhost:4000/graphql';
const queryPath = path + '?query=';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}
  getUsers()  {
    const query =
      `query {
        users {
          id
          name
        }
      }`;
    return this.http.get(queryPath + query).map(r => r.json());
  }
}
