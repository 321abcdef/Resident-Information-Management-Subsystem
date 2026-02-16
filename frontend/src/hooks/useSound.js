// src/hooks/useSound.js
export const useSound = () => {
  const playFeedback = (type = 'light') => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const gain = context.createGain();
      const now = context.currentTime;

      const createTone = (freq, start, duration, vol) => {
        const osc = context.createOscillator();
        const g = context.createGain();
        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(freq, start);
        g.gain.setValueAtTime(vol, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(g);
        g.connect(context.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      if (type === 'notify') {

        createTone(880, now, 0.2, 0.1);     
        createTone(1100, now + 0.08, 0.2, 0.1); 
      } 
      else if (type === 'success') {
        // "Victory" upward slide
        createTone(440, now, 0.3, 0.1);
        createTone(880, now + 0.1, 0.4, 0.1);
      } 
      else if (type === 'error') {
        createTone(150, now, 0.3, 0.1); // Low thud
      } 
      else {
        // Standard "Pop"
        createTone(600, now, 0.1, 0.05);
      }

    } catch (e) {
      console.log("Audio Error:", e);
    }
  };

  return { playFeedback };
};