// domain
export type User = {
  user_id?: number;
  email: string;
  password: string;
};

export type Board = {
  board_id?: number;
  board_name: string;
  user_id: number;
  tiles?: Tile[];
};

export type Tile = {
  tile_id?: number;
  tile_name: string;
  tile_order: number;
  board_id: number;
  cards?: Card[];
};

export type Card = {
  card_id?: number;
  card_name: string;
  card_order: number;
  tile_id?: number;
};

// reducer store and actions
export type BoardsStore = {
  boards: Board[];
};
export type BoardsAction = {
  type: string;
  board: Board;
};