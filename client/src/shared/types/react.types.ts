import type { ChangeEvent, Dispatch, SetStateAction, SubmitEvent } from "react";

export type FormSubmitEvent = SubmitEvent<HTMLFormElement>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type ReactSetState<T> = Dispatch<SetStateAction<T | null>>;
