import * as React from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import "inter-ui/inter.css";

import MainLayout from "./components/MainLayout";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       suspense: true,
//     },
//   },
// });
const queryClient = new QueryClient();

function Application() {
  return (
    // <React.StrictMode>
      <GeistProvider themeType="dark">
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <MainLayout />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </GeistProvider>
    // </React.StrictMode>
  );
}

export default Application;
