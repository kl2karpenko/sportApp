import React, { useState } from "react";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "../store/main"

import createTheme from "../theme";
import { SportAppContext } from "./SportAppContext";
import { IDialogProps } from "../interfaces/IDialogProps";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export default function SportAppProviders({ children }: { children: React.ReactNode }) {
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const theme = createTheme(mode);

  return (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <SportAppContext.Provider
            value={{
              dialogProps,
              setDialogProps,
              setMode
            }}
          >
            {children}
          </SportAppContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
