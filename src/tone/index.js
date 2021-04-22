import * as Tone from 'tone';

const freq = [40.5, 70, 65];
const freqAlt = [100, 70];
const notes = ['C5', 'A3', 'D4', 'G4'];
const notesSec = ['C4', 'A4', 'D3', 'G3'];
const notesThird = ['C3', 'F4', 'D4', 'G3'];

const groupSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 2,
    decay: 2,
    sustain: 1.0,
    release: 3,
  },
});

groupSynth.set({ detune: 200 });

const higherSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 2,
    decay: 0.2,
    sustain: 0.2,
    release: 0.5,
  },
});
higherSynth.volume.value = -20;

//TRANSPORT START
Tone.Transport.bpm.value = 85;
//TRANSPORT END

//SEQUENCE START
const drone = new Tone.Loop((time) => {
  groupSynth.triggerAttackRelease(notes, '4', time);
  groupSynth.triggerAttackRelease(notesSec, '4', time + 4);
  groupSynth.triggerAttackRelease(notesThird, '4', time + 8);
}, '16n');
drone.start(0);

console.log(drone.state);

//SEQUENCE END

//EFFECTS GROUP SYNTH
const lfo = new Tone.LFO('0.15hz', 230, 3000);
const distortion = new Tone.Distortion(0.005);
const reverb = new Tone.Reverb(2);
const compressor = new Tone.Compressor(-20, 4);
const pingPong = new Tone.PingPongDelay('16n', 0.4);
const multiband = new Tone.MultibandCompressor({
  lowFrequency: 200,
  highFrequency: 1300,
  low: {
    threshold: -2,
  },
  mid: {
    threshold: -5,
  },
  high: {
    threshold: -15,
  },
});
groupSynth.chain(
  reverb,
  compressor,
  distortion,
  multiband,
  pingPong,
  Tone.Destination
);
groupSynth.toFrequency(lfo);

//EFFECTS GROUP SYNTH
const distortionSaw = new Tone.Distortion(0.1);
const pingPongSaw = new Tone.PingPongDelay('16n', 0.4);
const multibandSaw = new Tone.MultibandCompressor({
  lowFrequency: 200,
  highFrequency: 1300,
  low: {
    threshold: -2,
  },
  mid: {
    threshold: -5,
  },
  high: {
    threshold: -15,
  },
});
higherSynth.chain(pingPongSaw, distortionSaw, multibandSaw, Tone.Destination);
//EFFECTS HIGHER SYNTH

const Start = () => {
  Tone.start();
  Tone.Transport.start();
  console.log('transport started');
};

const Stop = () => {
  Tone.Transport.stop();
  console.log('transport stopped');
};

const Thing = {
  Start,
  Stop,
};

export default Thing;
