import { RenderOptions, render } from "@testing-library/react";
import { ReactElement } from "react";
import { NotifyProvider } from "@/api/useNotify";
import { ApolloWrapper } from "@/api/client/apollo-wrapper";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloWrapper>
      <NotifyProvider>{children}</NotifyProvider>
    </ApolloWrapper>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
