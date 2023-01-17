import React, { Component } from 'react';

class Alert extends Component {
    state = {
        show: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
        }
    }

    handleDismiss = () => {
        this.setState({ show: false });
    }

    render() {
        const { message } = this.props;
        const { show } = this.state;
        if (show && message) {
            return (
                <div className="alert alert-success" role="alert" style={{ position: "fixed", top: "0", width: "100%" }}>
                    {message}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Alert;
