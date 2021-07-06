import * as React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import "inter-ui/inter.css";

import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function Application() {
  return (
    <React.StrictMode>
      <GeistProvider themeType="dark">
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <MainLayout />
        </QueryClientProvider>
      </GeistProvider>
    </React.StrictMode>
  );
}

export default Application;
