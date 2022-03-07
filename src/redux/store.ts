import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk,promiseMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
