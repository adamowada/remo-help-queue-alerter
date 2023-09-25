function beep(duration, frequency, volume) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine'; // This creates a sine wave beep
    oscillator.frequency.setValueAtTime(frequency, context.currentTime); // Frequency in Hz
    gain.gain.setValueAtTime(volume, context.currentTime);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
}

// Select the <a> element you want to observe
const targetNode = document.getElementsByClassName("navbar-brand")[0];

// Options for the observer (which mutations to observe)
const config = {
  childList: true,    // Observes direct child additions or removals
  subtree: true,      // Observes all descendant additions or removals
  characterData: true // Observes changes to text content
};

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            beep(0.5, 440, 1); // Beep for 0.5 seconds with 440Hz frequency at maximum volume
            alert('Text content changed!');
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
