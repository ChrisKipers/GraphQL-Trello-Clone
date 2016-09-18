import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

const path = 'http://localhost:4000/graphql?';
const queryPath = path + 'query=';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}
  getBoards()  {
    const query =
      `query {
        boards {
          id
          name
        }
      }`;
    return this.makeQuery_(query, {});
  }

  createBoard(board) {
    const mutation =
      `mutation AddBoard($board: addBoardInput) {
        addBoardMutation(input: $board) {
          id
          name
        }
      }`;

    const variables = {board};

    return this.makeQuery_(mutation, variables);
  }

  makeQuery_(query, variables) {
    const requestPayload = {
      query,
      variables: JSON.stringify(variables)
    };
    const options = {headers: {'Content-Type': ['application/json']}};
    return this.http
      .post(path, JSON.stringify(requestPayload), options)
      .toPromise()
      .then(r => r.json().data);
  }
}
