const country = {
    "af-ZA": "Afrikaans",
    "bn-BD": "Bengali",
    "en-IN": "English",
    "es-CL": "Spanish",
    "fr-BE": "French",
    "hi-IN": "Hindi"
};

const select = document.querySelectorAll('select'),
    translateBtn = document.querySelector('button'),
    toTxt = document.querySelector('.to-text'),
    exchange = document.querySelector('.exchange'),
    icons = document.querySelectorAll('.row i'),
    fromtxt = document.querySelector('.form-text');



select.forEach((tag, id) => {
    for (const code in country) {
        let selected;
        if (id == 0 && code == 'en-IN') {
            selected = 'selected'
        }
        else if (id == 1 && code == 'hi-IN') {
            selected = 'selected'
        }
        let option = ` <option value="${code}"${selected}>${country[code]}</option>`
        tag.insertAdjacentHTML('beforeend', option)
    }
});

exchange.addEventListener('click', () => {
    let tempTxt = fromtxt.value,
        tempLang = select[0].value;

    fromtxt.value = toTxt.value;
    select[0].value - select[1].value;

    toTxt.value = tempTxt;
    select[1].value = tempLang;

})


translateBtn.addEventListener('click', () => {
    let text = fromtxt.value;
    let translateFrom = select[0].value;
    let translateTo = select[1].value;
    console.log(text,translateFrom,translateTo);
    //if(!text)
    //console.log("write something")
    //return ;

    let URL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(URL)
        .then((response) => { return response.json(); })
        .then((data) => {
            console.log(data);
            toTxt.value = data.responseData.translatedText;
        });

});

icons.forEach(icon => {
    icon.addEventListener('click', ({ target }) => {
        // console.log(target)
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromtxt.value)
            }
            else {
                navigator.clipboard.writeText(toTxt.value)
            }
        }
        else {
            let utterence;
            if (target.id == "to") {
                // utterence = new SpeechSynthesisUtterance(fromtxt.value);
                // console.log("from voice")
                // utterence.lang = select[0].value;
                utterence = new SpeechSynthesisUtterance(toTxt.value);
                console.log("to voice");
                utterence.lang=select[1].value;
            }
            else {
                

                utterence = new SpeechSynthesisUtterance(fromtxt.value);
                console.log("from voice")
                utterence.lang = select[0].value;

            }
            speechSynthesis.speak(utterence);
        }
    });
});