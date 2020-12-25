import React, {ReactNode} from 'react';

interface IProps {
    children?: ReactNode
}

interface IState {
    hasError: boolean
}

export default class ErrorWrapper extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hasError: false }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        if (error) this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}