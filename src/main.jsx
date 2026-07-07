import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { config } from "./config/wagmi";
import "./styles/App.css";
import "./styles/theme.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);