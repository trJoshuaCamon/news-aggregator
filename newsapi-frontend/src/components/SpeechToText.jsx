import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Box,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Mic, MicOff } from "@mui/icons-material";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // Initialize recognition only once
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      console.log("Speech recognition started...");
    };

    recognitionRef.current.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }

      // Append speech to the existing content in the input box
      setTranscript((prev) => `${prev} ${currentTranscript}`.trim());

      // Reset the silence timer on every detected speech
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = setTimeout(() => {
        console.log("Silence detected. Stopping recording...");
        stopListening();
      }, 3000); // 3 seconds timeout
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "no-speech" || event.error === "aborted") {
        stopListening();
      }
    };

    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended.");
      clearTimeout(silenceTimeoutRef.current);
    };

    return () => {
      recognitionRef.current?.stop();
      clearTimeout(silenceTimeoutRef.current);
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current?.start();
      setIsListening(true);

      // Start silence timer immediately on listening
      silenceTimeoutRef.current = setTimeout(() => {
        console.log("Silence detected. Stopping recording...");
        stopListening();
      }, 3000); // 3 seconds timeout
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    clearTimeout(silenceTimeoutRef.current);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTextChange = (event) => {
    setTranscript(event.target.value); // Allow manual typing
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: 3,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6">
        {isSupported
          ? "Click the mic and start speaking! You can also edit the text manually."
          : "Speech Recognition is not supported in this browser."}
      </Typography>

      <IconButton
        onClick={handleMicClick}
        color={isListening ? "primary" : "secondary"}
        sx={{ width: "80px", height: "80px" }}
      >
        {isListening ? <Mic fontSize="large" /> : <MicOff fontSize="large" />}
      </IconButton>

      {isListening && <CircularProgress />}

      <TextField
        label="Transcript"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={transcript}
        onChange={handleTextChange} // Allow manual editing
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 1,
        }}
      />
    </Box>
  );
};

export default SpeechToText;
