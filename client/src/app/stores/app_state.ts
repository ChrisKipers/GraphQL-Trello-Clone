export interface ApplicationState {
  isAddDialogOpen: boolean;
};

export interface BoardProperties {
  id: string;
  name: string;
};

export interface BoardState {
  boardList: any[];
  isLoadingBoardList: boolean;
  isCreatingBoard: boolean;
  isLoadingBoard: boolean;
  isUpdatingBoard: boolean;
  boardPropertiesById: { [key: string]: BoardProperties };
};

export interface CompleteState {
  appState: ApplicationState;
  board: BoardState;
};
