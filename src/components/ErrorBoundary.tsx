import React, { Component, ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { Typography, Button, Card } from "../design-system/components";
import { ErrorOutline, Refresh } from "@mui/icons-material";

interface ErrorBoundaryProps {
  children: ReactNode;
  customFallbackUI?: ReactNode;
}

interface ErrorBoundaryState {
  hasEncounteredError: boolean;
  capturedError?: Error;
  errorDetails?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasEncounteredError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasEncounteredError: true, capturedError: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorDetails: errorInfo });
  }

  resetErrorState = () => {
    this.setState({
      hasEncounteredError: false,
      capturedError: undefined,
      errorDetails: undefined,
    });
  };

  render() {
    if (this.state.hasEncounteredError) {
      if (this.props.customFallbackUI) {
        return this.props.customFallbackUI;
      }

      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card sx={{ p: 4, textAlign: "center" }}>
            <Box sx={{ mb: 3 }}>
              <ErrorOutline
                sx={{
                  fontSize: 64,
                  color: "error.main",
                  mb: 2,
                }}
              />
              <Typography variant="h4" gutterBottom>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={this.resetErrorState}
              >
                <Refresh sx={{ mr: 1 }} />
                Try Again
              </Button>
            </Box>

            {process.env.NODE_ENV === "development" &&
              this.state.capturedError && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "grey.100",
                    borderRadius: 1,
                    textAlign: "left",
                  }}
                >
                  <Typography variant="caption" color="error" gutterBottom>
                    Error Details (Development Mode):
                  </Typography>
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{
                      fontSize: "12px",
                      overflow: "auto",
                      maxHeight: "200px",
                      display: "block",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {this.state.capturedError.toString()}
                    {this.state.errorDetails?.componentStack}
                  </Typography>
                </Box>
              )}
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
