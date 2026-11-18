"use client";

import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "../../../store/store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" theme="dark" richColors duration={5000} />
      {children}
    </Provider>
  );
};

export default ReduxProvider;