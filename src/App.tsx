import * as React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import "inter-ui/inter.css";

import MainLayout from "./components/MainLayout";
import { useThemeStore } from "./data/theme";

const queryClient = new QueryClient();

function Application() {
  const [value] = useThemeStore((state) => [state.theme]);

  return (
    <GeistProvider themeType={value}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GeistProvider>
  );
}

export default Application;
