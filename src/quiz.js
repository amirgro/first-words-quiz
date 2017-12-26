import React from "react";
import annyang from "annyang";

import { data } from "./data"

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  getInitialState() {
    const selected = Math.floor(Math.random() * data.length)
    return {
      text: "try",
      play: null,
      img: data[selected].img,
      nameToSay: data[selected].name,
      showMic: false
    };
  }

  componentDidMount() {
    console.log(annyang.setLanguage)
    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        '*tag': (speech) => {
          this.setState({ listening: false })
          if (speech === this.state.nameToSay) {
            this.setState({
              play: 'success',
              img: 'https://media.giphy.com/media/Rgn6cUfaN5zW/giphy.gif'
            })
          } else {
            this.setState({
              play: 'fail',
              img: 'https://media.giphy.com/media/l2Sq8wyY1Zfndp6Lu/giphy.gif'
            })
          }
          // setTimeout(() => this.setState(this.getInitialState()), 5000)
        }
      };
      annyang.addCommands(commands)
      annyang.setLanguage("he")
      annyang.addCallback('soundstart', () => this.setState({showMic: true}))
      annyang.addCallback('result', () => this.setState({ showMic: false }))
      annyang.start()
      // for test:
      // setInterval(() => annyang.trigger('דהדה'), 2000)
      // setInterval(() => annyang.trigger('אוטו'), 2000)
      // setInterval(() => annyang.trigger(this.state.nameToSay), 3000)
    }
  }

  render() {
    const { play, img, listening } = this.state
    const micStyle = {
      width: '45px',
      height: '45px',
      padding: '5px',
      display: this.state.showMic ? 'block' : 'none'
    }

    const audioSrc = play === 'success' ? "http://www.pacdv.com/sounds/people_sound_effects/applause-4.mp3" : "http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3"
    const audioComponent = <audio controls autoPlay style={{ display: "none" }}>
      <source src={audioSrc} type="audio/mpeg" />
    </audio>
    return (
      <div>
        {play ? audioComponent : null}
        <div><img src={img} alt="pic" width="200" height="200" /></div>
        <div>
          <img alt="mic" style={micStyle} src={'https://media.giphy.com/media/AheiBsf6UlLqw/source.gif'} />
        </div>
      </div>
    );
  }
}

export default Quiz;