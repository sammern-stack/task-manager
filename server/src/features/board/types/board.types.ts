import type { HydratedDocument, Model } from "mongoose";

export type BoardSchema = {
  name: string;
};

export type BoardDocument = HydratedDocument<BoardSchema>;

export interface BoardStatics {
  findByName(
    this: BoardModel,
    boardName: string,
  ): Promise<BoardDocument | null>;
}

export interface BoardModel extends Model<BoardSchema>, BoardStatics {}

export type BoardCreateBody = Partial<Pick<BoardSchema, "name">>;
export type BoardUpdateBody = Partial<Pick<BoardSchema, "name">>;
