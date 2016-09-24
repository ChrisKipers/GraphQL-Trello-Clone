interface ApplicationState {
  isAddDialogOpen: boolean;
}

interface BoardState {
  boardList: any[],
  isLoadingBoardList: boolean,
  isCreatingBoard: boolean,
  isLoadingBoard: boolean,
  isUpdatingBoard: boolean,
  boardPropertiesById: any
}

interface CompleteState {
  appState: ApplicationState,
  board: BoardState
}
