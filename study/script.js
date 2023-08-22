
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

  //document.getElementById("txtSelect").innerText = selectedText;
  
  let test;
  speechSynthesis.getVoices().forEach( (iten)=>{
    test += iten.voiceURI+" | ";
  } );

  document.getElementById("txtSelect").innerText = test;

  // Para cancelar a reprodução
  speechSynthesis.cancel();

  const enUSVoice = speechSynthesis.getVoices().find(voice => voice.lang === "en-US");
  
  if (enUSVoice) {
    const audio = new SpeechSynthesisUtterance(selectedText);
    audio.rate = selectedSpeed;
    audio.voice = enUSVoice;
    
    const delayBetweenRepetitions = (audio.duration + audio.pauseAfter) * 1000;
    
    for (let i = 0; i < selectedRepetitions; i++) {
      setTimeout(() => {
        speechSynthesis.speak(audio);
      }, i * delayBetweenRepetitions);
    }
  } else {
    alert('Voice not found.');
  }
}