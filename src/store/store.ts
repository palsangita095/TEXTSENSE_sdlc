import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
  type PersistedState,
} from "redux-persist";

import adminSlice from "./slices/admin.slice";
import authSlice from "./slices/auth.slice";
import contentSlice from "./slices/content.slice";
import usersSlice from "./slices/users.slice";

const storage = {
  getItem: (key: string): Promise<string | null> => {
    try {
      if (typeof window === "undefined") return Promise.resolve(null);
      return Promise.resolve(window.localStorage.getItem(key));
    } catch {
      return Promise.resolve(null);
    }
  },
  setItem: (key: string, item: string): Promise<void> => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(key, item);
    } catch {
      
    }
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    try {
      if (typeof window !== "undefined") window.localStorage.removeItem(key);
    } catch {
     
    }
    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  admin: adminSlice,
  content: contentSlice,
});

type RootReducerState = ReturnType<typeof rootReducer>;

const authkeyPersistConfig: PersistConfig<RootReducerState> = {
  key: "auth",
  storage,
  // Transient list and analytics state must not be persisted.
  blacklist: ["users", "admin", "content"],

  migrate: (state: unknown): Promise<PersistedState> => {
    const raw = state as Record<string, unknown> | undefined;

    if (!raw || typeof raw !== "object") {
      return Promise.resolve(state as PersistedState);
    }

    const normalizeAuth = (auth: Record<string, unknown>) => {
      const { token, ...rest } = auth;
      void token;
      return { ...rest, isLoading: false, error: null, success: false };
    };

    if (
      !("auth" in raw) &&
      ("user" in raw || "token" in raw || "isLoading" in raw || "error" in raw)
    ) {
      const { _persist, ...flat } = raw;
      return Promise.resolve({
        _persist,
        auth: normalizeAuth(flat),
      } as PersistedState);
    }

    const auth = raw.auth;

    if (auth && typeof auth === "object") {
      return Promise.resolve({
        ...raw,
        auth: normalizeAuth(auth as Record<string, unknown>),
      } as unknown as PersistedState);
    }

    return Promise.resolve(state as PersistedState);
  },
};

if (typeof window !== "undefined") {
  window.localStorage.removeItem("tokens");
}

const persistedAuthReducer = persistReducer(authkeyPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
