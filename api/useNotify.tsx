import React, { createContext, useContext } from "react";

import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

type TContextProps = {
  notify: NotificationInstance;
  contextHolder: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  > | null;
};

type TProps = {
  children?: React.ReactNode;
};

/* istanbul ignore next */
const NotifyContext = () =>
  /* istanbul ignore next */
  createContext<TContextProps>({
    notify: {
      success: () => {
        //
      },
      error: () => {
        //
      },
      info: () => {
        //
      },
      warning: () => {
        //
      },
      open: () => {
        //
      },
      destroy: () => {
        //
      },
    },
    contextHolder: null,
  });

const Context = NotifyContext();

export const NotifyProvider: React.FC<TProps> = ({ children }) => {
  const [notify, contextHolder] = notification.useNotification();

  return (
    <Context.Provider
      value={{
        notify,
        contextHolder,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useNotify = () => {
  return useContext(Context);
};
