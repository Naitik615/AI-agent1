const startButton = document.getElementById('btn');
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
let isRecording = false;
let recognition;
let text_spoken = ''; // Variable to store the spoken text

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        voice.style.display="block"
        btn.style.display="none";
        isRecording = true;
    };

    recognition.onspeechend = function () {
        isRecording = false;
        
        recognition.stop();
    };
    
    
        // Store the spoken text in the variable
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            content.innerText=transcript;
            text_spoken = transcript; 
            voice.style.display="none"
            btn.style.display="flex"
            const message = { text: text_spoken };
        async function givedata(){
            try {
                const response = await fetch("http://localhost:3000/send-text", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(message),
                });
            
                if (response.ok) {
                  console.log("Text sent successfully!");
                } else {
                  console.error("Failed to send text.");
                }
              } catch (error) {
                console.error("Error:", error);
              }
        }
        givedata();
        
      
    };

    recognition.onerror = function (event) {
        statusText.textContent = 'Error occurred: ' + event.error;
    };
} else {
    statusText.textContent = 'Speech Recognition is not supported in this browser.';
}

startButton.addEventListener('click', () => {
    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
    }
});