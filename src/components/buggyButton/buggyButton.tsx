import React from 'react';
import Button from '../ui/button/Button';
import BugIcon from '../icons/bug';

interface BuggyButtonProps {}

interface BuggyButtonState {}

class BuggyButton extends React.Component<BuggyButtonProps, BuggyButtonState> {
  state = { throwError: false };

  handleClickBuggyButton = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Fake mistake!');
    }
    return (
      <Button isMain={false} onClick={this.handleClickBuggyButton}>
        <BugIcon />
      </Button>
    );
  }
}

export default BuggyButton;
