let audioContext: AudioContext | null = null;

const initAudioContext = async (): Promise<void> => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
};

export const playChime = async (): Promise<void> => {
  try {
    await initAudioContext();
    if (!audioContext) return;

    const notes = [
      {freq: 392.0, start: 0.0, duration: 0.15},
      {freq: 523.25, start: 0.08, duration: 0.2},
    ];

    const now = audioContext.currentTime;

    notes.forEach((note) => {
      const oscillator = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();

      oscillator.frequency.setValueAtTime(note.freq, now + note.start);
      oscillator.type = "sine";

      oscillator.connect(gainNode);
      gainNode.connect(audioContext!.destination);

      gainNode.gain.setValueAtTime(0, now + note.start);
      gainNode.gain.linearRampToValueAtTime(0.15, now + note.start + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        now + note.start + note.duration
      );

      oscillator.start(now + note.start);
      oscillator.stop(now + note.start + note.duration);
    });
  } catch (error) {
    console.warn("Failed to play chime:", error);
  }
};

export const playFancyChime = async (): Promise<void> => {
  try {
    await initAudioContext();
    if (!audioContext) return;

    const notes = [
      {freq: 523.25, start: 0.0, duration: 0.3},
      {freq: 659.25, start: 0.15, duration: 0.3},
      {freq: 783.99, start: 0.3, duration: 0.4},
      {freq: 1046.5, start: 0.5, duration: 0.6},
    ];

    const now = audioContext.currentTime;

    notes.forEach((note) => {
      const oscillator = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();

      oscillator.frequency.setValueAtTime(note.freq, now + note.start);
      oscillator.type = "sine";

      oscillator.connect(gainNode);
      gainNode.connect(audioContext!.destination);

      gainNode.gain.setValueAtTime(0, now + note.start);
      gainNode.gain.linearRampToValueAtTime(0.12, now + note.start + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        now + note.start + note.duration
      );

      oscillator.start(now + note.start);
      oscillator.stop(now + note.start + note.duration);
    });
  } catch (error) {
    console.warn("Failed to play fancy chime:", error);
  }
};
