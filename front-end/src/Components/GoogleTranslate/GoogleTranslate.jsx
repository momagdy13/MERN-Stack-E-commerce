import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";

const GoogleTranslate = () => {
  const [showTranslate, setShowTranslate] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const handleToggle = () => {
    setShowTranslate(!showTranslate);
  };

  useEffect(() => {
    if (showTranslate) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showTranslate]);

  return (
    <div>
     
        <IconButton onClick={handleToggle}>
          <TranslateIcon />
        </IconButton>
      {showTranslate && (
        <div
          id="google_translate_element"
          style={{ display: showTranslate ? "block" : "none" }}
        ></div>
      )}
    </div>
  );
};

export default GoogleTranslate;
