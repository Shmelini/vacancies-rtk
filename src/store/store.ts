import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vacancies from "../reducers/vacanciesReducer";

const rootReducer = combineReducers({ vacancies });
export const store = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
