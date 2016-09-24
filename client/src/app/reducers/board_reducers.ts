import {
  CREATE_BOARD, CREATE_BOARD_SUCCESS,
  LOAD_BOARD_LIST, LOAD_BOARD_LIST_SUCCESS,
  LOAD_BOARD, LOAD_BOARD_SUCCESS,
  MODIFY_BOARD, MODIFY_BOARD_SUCCESS
} from '../actions/board_action_enum';

const INITIAL_STATE = {
  boardList: [],
  isLoadingBoardList: false,
  isCreatingBoard: false,
  isLoadingBoard: false,
  boardPropertiesById: {}
};

export function board(state=INITIAL_STATE, action=null) {
  switch (action.type) {
    case LOAD_BOARD_LIST:
      return Object.assign({}, state, {
        isLoadingBoardList: true
      });
    case LOAD_BOARD_LIST_SUCCESS:
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
      const boardPropertiesById =
        Object.assign({}, state.boardPropertiesById, {
          [action.board.id]: {
            id: action.board.id,
            name: action.board.name
          }
        });

      return Object.assign({}, state, {
        isLoadingBoard: false,
        boardPropertiesById: boardPropertiesById
      });
    case MODIFY_BOARD:
      return Object.assign({}, state, {
        isModifyingBoard: true
      });
    case MODIFY_BOARD_SUCCESS:
      const newBoardList = state.boardList.map(board => {
        return board.id == action.board.id ? action.board : board;
      });
      return Object.assign({}, state, {
        isModifyingBoard: false,
        boardList: newBoardList,
        boardPropertiesById: Object.assign({}, state.boardPropertiesById, {
          [action.board.id]: action.board
        })
      });
    default:
      return state;
  }
}
