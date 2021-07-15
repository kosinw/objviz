import * as React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import "inter-ui/inter.css";

import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

function Application() {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GeistProvider>
  );
}

export default Application;
