import {OPEN_ADD_DIALOG, CLOSE_ADD_DIALOG} from '../actions/app_state_action_enum';

const INITIAL_STATE = {
  isAddDialogOpen: false
};

export function appState(state = INITIAL_STATE, action = null) {
  switch (action.type) {
    case OPEN_ADD_DIALOG:
      return Object.assign({}, state, {
        isAddDialogOpen: true
      });
    case CLOSE_ADD_DIALOG:
      return Object.assign({}, state, {
        isAddDialogOpen: false
      });
    default:
      return state;
  }
}
