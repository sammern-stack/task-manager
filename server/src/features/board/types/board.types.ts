import type { Document, HydratedDocument, Model } from "mongoose";

export type BoardSchema = {
  name: string;
};

export type BoardDocument = HydratedDocument<BoardSchema>;

export interface BoardModel extends Model<BoardSchema> {
  findByName(boardName: string): Promise<BoardDocument | null>;
}

// export type BoardSchema = {
//   name: string;
// } & Document;

export type BoardCreateBody = Partial<Pick<BoardSchema, "name">>;
export type BoardUpdateBody = Partial<Pick<BoardSchema, "name">>;
