import {
  CREATE_BOARD, CREATE_BOARD_SUCCESS,
  BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS,
  LOAD_BOARD, LOAD_BOARD_SUCCESS,
  MODIFY_BOARD, MODIFY_BOARD_SUCCESS,
  CREATE_LIST_REQUEST_SUCCESS
} from '../actions/board_action_enum';

const INITIAL_STATE = {
  boardList: [],
  isLoadingBoardList: false,
  isCreatingBoard: false,
  isLoadingBoard: false,
  boardPropertiesById: {},
  boardListRelationshipByBoardId: {},
  listsById: {},
  taskListRelationshipByListId: {},
  taskById: {}
};


export function board(state = INITIAL_STATE, action =null) {
  switch (action.type) {
    case BOARD_LIST_REQUEST:
      return Object.assign({}, state, {
        isLoadingBoardList: true
      });
    case BOARD_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoadingBoardList: false,
        boardList: action.boards
      });
    case CREATE_BOARD:
      return Object.assign({}, state, {
        isCreatingBoard: true
      });
    case CREATE_BOARD_SUCCESS:
      return Object.assign({}, state, {
        isCreatingBoard: false,
        boardList: [...state.boardList, action.board]
      });
    case LOAD_BOARD:
      return Object.assign({}, state, {
        isLoadingBoard: true,
      });
    case LOAD_BOARD_SUCCESS:
      return handleLoadBoardSuccess(state, action);
    case MODIFY_BOARD:
      return Object.assign({}, state, {
        isModifyingBoard: true
      });
    case MODIFY_BOARD_SUCCESS:
      const newBoardList = state.boardList.map(board => {
        return board.id === action.board.id ? action.board : board;
      });
      return Object.assign({}, state, {
        isModifyingBoard: false,
        boardList: newBoardList,
        boardPropertiesById: Object.assign({}, state.boardPropertiesById, {
          [action.board.id]: action.board
        })
      });
    case CREATE_LIST_REQUEST_SUCCESS:
      return handleCreateListRequestSuccess(state, action);
    default:
      return state;
  }
}

function sortByPosition(item1, item2) {
  return item1.position - item2.position;
}

function handleLoadBoardSuccess(state, action) {
  const boardPropertiesById =
    Object.assign({}, state.boardPropertiesById, {
      [action.board.id]: {
        id: action.board.id,
        name: action.board.name
      }
    });

  const boardListRelations =
    action.board.lists.edges.map(edge => ({position: edge.position, listId: edge.node.id}));
  boardListRelations.sort(sortByPosition);

  const boardListRelationshipByBoardId =
    Object.assign({}, state.boardListRelationshipByBoardId, {
      [action.board.id]: boardListRelations
    });

  const listsByIdForBoard = action.board.lists.edges.reduce((agg, edge) => {
    const listEntry = {id: edge.node.id, boardId: action.board.id, name: edge.node.name};
    agg[listEntry.id] = listEntry;
    return agg;
  }, {});

  const listsById =
    Object.assign({}, state.listsById, listsByIdForBoard);

  const newTaskListRelationsByListId = action.board.lists.edges.reduce((agg, edge) => {
    const relations = edge.node.tasks.edges.map(t => ({position: t.position, taskId: t.node.id}));
    relations.sort(sortByPosition);
    agg[edge.node.id] = relations;
    return agg;
  }, {});

  const taskListRelationshipByListId =
    Object.assign({}, state.taskListRelationshipByListId, newTaskListRelationsByListId);

  const newTasksById =
    action.board.lists.edges.reduce((agg, listEdge) => {
      listEdge.node.tasks.edges.forEach(taskEdge => {
        agg[taskEdge.node.id] = {
          id: taskEdge.node.id,
          name: taskEdge.node.name,
          listId: listEdge.node.id
        };
      });
      return agg;
    }, {});

  const taskById = Object.assign({}, state.taskById, newTasksById);

  return Object.assign({}, state, {
    isLoadingBoard: false,
    boardPropertiesById,
    boardListRelationshipByBoardId,
    listsById,
    taskListRelationshipByListId,
    taskById
  });
}

function handleCreateListRequestSuccess(state, action) {
  const newRelation = {listId: action.list.id, position: action.list.position};
  const relationsForBoard = [...state.boardListRelationshipByBoardId[action.list.boardId], newRelation];
  relationsForBoard.sort(sortByPosition);

  const boardListRelationshipByBoardId =
    Object.assign({}, state.boardListRelationshipByBoardId, {
      [action.list.boardId]: relationsForBoard
    });
  const newList = {id: action.list.id, name: action.list.name, boardId: action.list.boardId};
  const listsById =
    Object.assign({}, state.listsById, {
      [action.list.id]: newList
    });
  return Object.assign({}, state, {
    boardListRelationshipByBoardId,
    listsById
  });
}
