export type BoardSchema = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type BoardCreateBody = Partial<Pick<BoardSchema, "name">>;
// export type BoardCreateBody = Pick<BoardSchema, "name">;
