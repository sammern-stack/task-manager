import { Types } from "mongoose";

export const isMongooseId = (id: string) => Types.ObjectId.isValid(id);
