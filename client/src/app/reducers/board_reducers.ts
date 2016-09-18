import {CREATE_BOARD, CREATE_BOARD_SUCCESS, LOAD_BOARD_LIST, LOAD_BOARD_LIST_SUCCESS} from '../actions/board_action_enum';

const INITIAL_STATE = {
  boardList: [],
  isLoadingBoardList: false,
  isCreatingBoard: false
};

export function board(state=INITIAL_STATE, action) {
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
    default:
      return state;
  }
}
