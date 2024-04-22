import React from "react";
import 'react-native-gesture-handler'
import Navigator from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from 'react-native-toast-message';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
      <Toast />
    </QueryClientProvider>
  );
}
