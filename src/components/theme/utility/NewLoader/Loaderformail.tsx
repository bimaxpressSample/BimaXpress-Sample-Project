import React from 'react';
import { Animate } from 'react-move';

class AnimatedProgressProvider extends React.Component {
  interval = undefined;

  state = {
    isAnimated: false,
  };

  static defaultProps = {
    valueStart: 0,
  };

  componentDidMount() {
    //@ts-ignore
    if (this.props.repeat) {
      //@ts-ignore
      this.interval = window.setInterval(() => {
        this.setState({
          isAnimated: !this.state.isAnimated,
        });
        //@ts-ignore
      }, this.props.duration * 1000);
    } else {
      this.setState({
        isAnimated: !this.state.isAnimated,
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div
        style={{ width: '15%', position: 'absolute', top: '40%', left: '45%' }}
      >
        <Animate
          start={() => ({
            //@ts-ignore
            value: this.props.valueStart,
          })}
          update={() => ({
            value: [
              this.state.isAnimated
                ? //@ts-ignore
                  this?.props?.valueEnd
                : //@ts-ignore
                  this?.props?.valueStart,
            ],
            timing: {
              //@ts-ignore
              duration: this.props.duration * 1000,
              //@ts-ignore
              ease: this.props.easingFunction,
            },
          })}
        >
          {({ value }) =>
            //@ts-ignore
            this.props.children(value)
          }
        </Animate>
      </div>
    );
  }
}

export default AnimatedProgressProvider;
