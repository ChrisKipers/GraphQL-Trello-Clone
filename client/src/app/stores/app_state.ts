export interface ApplicationState {
  isAddDialogOpen: boolean;
};

export interface BoardProperties {
  id: string;
  name: string;
};

export interface BoardListRelationship {
  listId: string;
  position: number;
};

export interface List {
  id: string;
  boardId: string;
  name: string;
};

export interface TaskListRelationship {
  taskId: string;
  position: number;
};

export interface Task {
  id: string;
  listId: string;
  name: string;
};

export interface BoardState {
  boardList: any[];
  isLoadingBoardList: boolean;
  isCreatingBoard: boolean;
  isLoadingBoard: boolean;
  isUpdatingBoard: boolean;
  boardPropertiesById: { [key: string]: BoardProperties };
  boardListRelationshipByBoardId: {[key: string]: BoardListRelationship[] };
  listsById: {[key: string]: List};
  taskListRelationshipByListId: {[key: string]: TaskListRelationship[]};
  taskById: {[key: string]: Task};
};

export interface CompleteState {
  appState: ApplicationState;
  board: BoardState;
};
