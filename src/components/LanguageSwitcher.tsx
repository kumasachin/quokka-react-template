import React from "react";
import { Box, Chip } from "@mui/material";
import { supportedLanguages } from "../i18n/config";

const LanguageSwitcher: React.FC = () => {
  // If only one language is supported, show a simple indicator
  if (supportedLanguages.length === 1) {
    const currentLang = supportedLanguages[0];
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Chip
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <span aria-hidden="true">{currentLang.flag}</span>
              <span>{currentLang.name}</span>
            </Box>
          }
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "background.paper" }}
          aria-label={`Current language: ${currentLang.name}`}
        />
      </Box>
    );
  }

  // This would be used if multiple languages were supported in the future
  return null;
};

export default LanguageSwitcher;
