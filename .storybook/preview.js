import React from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "../src/design-system/theme";

export const decorators = [
  (Story) => {
    return React.createElement(
      MuiThemeProvider,
      { theme },
      React.createElement(
        StyledThemeProvider,
        { theme },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(CssBaseline),
          React.createElement(Story)
        )
      )
    );
  },
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
