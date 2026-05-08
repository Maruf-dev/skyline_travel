import { Component, type ReactNode, type ErrorInfo } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__inner">
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__msg">
              An unexpected error occurred. Please try again or return home.
            </p>
            {this.state.error?.message && (
              <pre className="error-boundary__detail">{this.state.error.message}</pre>
            )}
            <div className="error-boundary__actions">
              <button className="btn-primary" onClick={this.handleReset}>
                Try again
              </button>
              <a href="/" className="btn-outline">Back to home</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
