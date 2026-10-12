import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  name: string;
  children: ReactNode;
}
interface State {
  failed: boolean;
}

/** Isole une section : si elle échoue, le reste de la présentation reste consultable. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}]`, error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="section" data-tone="dark" role="alert">
          <div className="container">
            <p>La section « {this.props.name} » n’a pas pu s’afficher. Le reste de la présentation reste disponible.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
