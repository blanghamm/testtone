import * as Tone from 'tone';

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
}).toDestination();

const synth = new Tone.Oscillator(140.5, 'sine').toDestination();
const synth1 = new Tone.Oscillator(70, 'sine').toDestination();
const synth2 = new Tone.Oscillator(65, 'sine').toDestination();

const distortion = new Tone.Distortion(0.1);
const reverb = new Tone.Reverb(2);
const pingPong = new Tone.PingPongDelay('16n', 0.4);
synth.chain(reverb, pingPong, distortion, Tone.Destination);

const Start = () => {
  synth.start();
  synth1.start();
  synth2.start();
};

const Stop = () => {
  synth.stop();
  synth1.stop();
  synth2.stop();
};

Tone.start();

const Thing = {
  Start,
  Stop,
};

export default Thing;
