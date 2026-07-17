import type { Request } from "express";

export type GetAllRequest<T = any> = Request<{}, {}, {}, T>;
export type GetOneRequest = Request<{ id?: string }>;
export type CreateRequest<T = any> = Request<{}, {}, T>;
export type UpdateRequest<T = any> = Request<{ id?: string }, {}, T>;
export type DeleteRequest = Request<{ id?: string }>;
