import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

//const path = 'http://localhost:4000/graphql?';
const path = 'https://service-dot-graphql-trello-clone.appspot.com/graphql?';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}
  getBoards()  {
    const query =
      `query {
        boards {
          id
          name
          isArchived
        }
      }`;
    return this.makeQuery_(query, {});
  }

  getBoard(boardId) {
    const query =
      `query {
        board(id: ${boardId}) {
          id
          name
          isArchived
          lists {
            edges {
              position
              node {
                id
                name
                tasks {
                  edges {
                    position
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }`;
    return this.makeQuery_(query, {});
  }

  createBoard(board) {
    const mutation =
      `mutation AddBoard($board: addBoardInput) {
        addBoard(input: $board) {
          id
          name
          isArchived
        }
      }`;

    const variables = {board};

    return this.makeQuery_(mutation, variables);
  }

  modifyBoard(id, boardProperties) {
    const mutation =
      `mutation ModifyBoard($board: modifyBoardInput) {
        modifyBoard(input: $board) {
          id
          name
          isArchived
        }
      }`;

    const variables = {
      board: Object.assign({}, boardProperties, {id})
    };

    return this.makeQuery_(mutation, variables);
  }

  createList(list) {
    const mutation =
      `mutation AddListBoard($list: addBoardListInput) {
        addBoardList(input: $list) {
          id
          name
          boardId
          position
        }
      }`;

    const variables = {list};

    return this.makeQuery_(mutation, variables);
  }

  createTask(task) {
    const mutation =
      `mutation AddTask($task: addTaskInput) {
        addTask(input: $task) {
          id
          name
          position
          boardListId
          status
        }
      }`;

    const variables = {task};

    return this.makeQuery_(mutation, variables);
  }

  makeQuery_(query, variables) {
    // Use x-www-form-urlencoded to avoid using custom content-type which would require an option request for every post
    // since the application is using CORS.
    const options = {headers: new Headers({'Content-Type': ['application/x-www-form-urlencoded']})};
    const variablesAsJsonString = JSON.stringify(variables);
    const body = `query=${query}&variables=${variablesAsJsonString}`;

    return this.http
      .post(path, body, options)
      .toPromise()
      .then(r => r.json().data);
  }
}
