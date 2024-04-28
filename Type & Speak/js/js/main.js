// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

//Init Voice Array
let voices = []
const getVoices = () => {
    voices = synth.getVoices()

// Loop through voices and create an option for each one
    voices.forEach(voice => {

        // create Option element
        const option = document.createElement('option')

        // Fill option with voices and languages
        option.textContent = voice.name + `(${voice.lang})`

        // Set needed option attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    })
}

getVoices()

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {

//     Check if speaking
    if (synth.speaking) {
        console.error("Already Speaking..")
        return
    }
    if (textInput.value !== '') {
        body.style.background = '#141414 url(img/wave.gif)'
        body.style.backgroundRepeat = 'repeat-x'
        body.style.backgroundSize = '100% 100%'
        //     Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)

        //     Speak End
        speakText.onend = e => {
            console.log("Done Speaking..")
             body.style.background = '#141414'
        }

        // Speak error
        speakText.onerror = e => {
            console.log("Something went wrong!")
        }

        // Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        // Loop Through Voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

    // Set Pitch and Speed
        speakText.rate = rate.value
        speakText.pitch = pitch.value
    // Speak
        synth.speak(speakText)
    }
};

// Event Listeners

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault()
    speak()
    textInput.blur()
});


// Rate Value change
rate.addEventListener('change',
        e => rateValue.textContent = rate.value)

// Pitch Value change
pitch.addEventListener('change',
        e => pitchValue.textContent = pitch.value)

// Voice Select change
voiceSelect.addEventListener('change', e=>speak())