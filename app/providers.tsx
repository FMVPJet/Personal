"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: {
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
  };
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ThemeProvider {...themeProps}>{children}</ThemeProvider>
  );
}
