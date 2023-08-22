//const voicesSelect = document.getElementById("voice-select");


const jsonUrl = 'data.json';
var textOptions = [];
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      // Aqui você pode trabalhar com os dados do JSON
      textOptions = data;
      populateTitleOptions();
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });


function populateTitleOptions() {
  //console.log(data.map( exercicios=>exercicios))
  const titleSelect = document.getElementById('title-select');
  
  textOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.title;
    optionElement.textContent = option.title;
    titleSelect.appendChild(optionElement);
  });
}

function playText() {
  const titleSelect = document.getElementById('title-select');
  const selectedOption = titleSelect.options[titleSelect.selectedIndex];
  const selectedTitle = selectedOption.value;
  const selectedTextObj = textOptions.find(option => option.title === selectedTitle);
  const selectedText = selectedTextObj.text;
  const speedSelect = document.getElementById('speed-select');
  const selectedSpeed = parseFloat(speedSelect.value);
  const repetitionsSelect = document.getElementById('repetitions-select');
  const selectedRepetitions = parseInt(repetitionsSelect.value);

  document.getElementById("txtSelect").innerText = selectedText;

  //document.getElementById("txtSelect").innerText = test;

  const enUSVoice = speechSynthesis.getVoices().find(voice =>  voice.lang === "en_US" || voice.lang === "en-US"  );
  if(enUSVoice){
    const audio = new SpeechSynthesisUtterance(selectedText);
    audio.rate = selectedSpeed;
    audio.voice = enUSVoice;
    //let index = document.getElementById("voice-select").value;
    //audio.voice = window.speechSynthesis.getVoices()[index];

    const delayBetweenRepetitions = (audio.duration + audio.pauseAfter) * 1000;
    
    if( window.speechSynthesis.speaking == false ){
      for (let i = 0; i < selectedRepetitions; i++) {
        setTimeout(() => {
          window.speechSynthesis.speak(audio);
        }, i * delayBetweenRepetitions);
      }
    }else{
        // Para cancelar a reprodução
        window.speechSynthesis.cancel();
    }

  }else{
    alert("carregando voz\ntente novamente");
  }
}

/*
// Popula o select com as vozes disponíveis
function populateVoices() {
  const voices = window.speechSynthesis.getVoices();

  voicesSelect.innerHTML = '<option value="-1">Select a Voice</option>';

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;

    voicesSelect.appendChild(option);
  });
}
*/

// Atualiza as vozes quando as vozes estão prontas
window.speechSynthesis.onvoiceschanged = () => {
  //populateVoices();
};

// Chamada inicial para carregar as vozes
//populateVoices();

