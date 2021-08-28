import React from 'react';

interface HandlerToken {
  index: number;
  component: React.ComponentType<ModalProps>;
}

interface ModalProps {
  token: HandlerToken;
}

interface Modal {
  status: boolean;
  component: React.ComponentType<ModalProps>;
}

interface Props {
  allowMultiInstance?: boolean;
}

interface State {
  children: Array<Modal>;
}

class ModalHandler extends React.Component<Props, State> {
  static instance: ModalHandler | undefined;

  constructor(props: any) {
    super(props);
    const { allowMultiInstance } = this.props;
    if (ModalHandler.instance && !allowMultiInstance) {
      throw new Error(
        'IllegalInstanciation : Attempting to spawn multiple instances of ModalHandler.'
      );
    } else {
      this.state = {
        children: [],
      };
      ModalHandler.instance = this;
    }
  }

  static push(modal: React.ComponentType<ModalProps>): HandlerToken {
    if (!ModalHandler.instance) {
      throw new Error(
        "MissingInstanciation : Attempting to call method 'push' while ModalHandler has not been instanciated yet."
      );
    }
    const { children } = ModalHandler.instance.state;
    children.push({
      status: false,
      component: modal,
    });
    ModalHandler.instance.setState({ children });
    return {
      index: children.length - 1,
      component: modal,
    };
  }

  private static set(token: HandlerToken, value: boolean) {
    if (!ModalHandler.instance) {
      throw new Error(
        "MissingInstanciation : Attempting to call method 'set' while ModalHandler has not been instanciated yet."
      );
    }
    const { children } = ModalHandler.instance.state;
    if (token.component !== children[token.index].component) {
      throw new Error(
        `Invalid token : component at index ${token.index} didn't match token content.`
      );
    }
    children[token.index].status = value;
    ModalHandler.instance.setState({ children });
  }

  static enable(token: HandlerToken) {
    this.set(token, true);
  }

  static disable(token: HandlerToken) {
    this.set(token, false);
  }

  componentWillUnmount() {
    ModalHandler.instance = undefined;
  }

  render() {
    const { children } = this.state;
    return (
      <div className="modal-handler">
        {children.map(
          (child, i) =>
            child.status && (
              <div className="modal-handler-child" key={`modal-${i}`}>
                <child.component
                  token={{ index: i, component: child.component }}
                />
              </div>
            )
        )}
      </div>
    );
  }
}

export default ModalHandler;
export { HandlerToken, ModalHandler };
