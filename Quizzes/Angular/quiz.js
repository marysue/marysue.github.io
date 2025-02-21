const gotIt = [];
const hiddenSections = [];
let isTablet = false;
const SHOW_BUTTON = 'SHOW';
const HIDE_BUTTON = 'HIDE';

function setQuestionDisplay(hide, questionElt) {
    if (questionElt) {
        questionElt.style= hide ? "none" : "block";
        questionElt.display = hide ? "none" : "block";
    } else {
        const elts = getElementByClassName("hideButtonClass");
        for (let i = 0; i < elts?.length; i++) {
            elts[i].display = hide ? "none" : "inline-block";
            elts[i].style = hide ? "display: none" : "display: inline-block";
        }
    }
}

function setSectionLabels(buttonLabel, sectionDiv) {
    
    if (sectionDiv) {
            sectionDiv.previousElementSibling.firstElementChild.innerHTML = buttonLabel;
            // sectionElt.innerText = hide ? "SHOW" : "HIDE";
    } else {
        const sectionElts = document.getElementsByClassName("section");

        for (let i=0; i < sectionElts?.length; i++) {
            button = sectionElts[i].previousElementSibling.firstElementChild; 
            button.innerHTML = buttonLabel;
            // sectionElts[i].innerText = hide ? "SHOW" : "HIDE";
        }
    }
}

function setSectionDisplay(hide, sectionElt) {

    if (sectionElt) {
        sectionElt.style= hide ? "display: none" : "display: inline-block";
        sectionElt.display = hide ? "none" : "inline-block"
    } else {
        const sectionElts = getElementsByClassName("section");
        for (let i = 0; i < sectionElts?.length; i++) {
            sectionElts[i].style = hide ? "display:none" : "display : inline-block";
            sectionElts[i].display = hide ? "none" : "inline-block";
        }
    }
}

function removeFromStorage(key, value) {
    if (isTablet) {
        origStorage = JSON.parse(sessionStorage.getItem(key));
        newStorageArray = origStorage.filter(x => x !== value);
        if (newStorageArray?.length > 0) {
            sessionStorage.setItem(key, JSON.stringify(newStorageArray));
        } else {
            sessionStorage.removeItem(key);
        }
        
    } else {
        origStorage = JSON.parse(localStorage.getItem(key));
        newStorageArray = origStorage?.filter(x => x !== value);
        if (newStorageArray?.length > 0) {
            localStorage.setItem(key, JSON.stringify(newStorageArray));
        } else {
            localStorage.removeItem(key);
        }
     } 
}

function clearStorage(key) {
    if (isTablet) {
        sessionStorage.removeItem(key);
    } else {
        localStorage.removeItem(key);
    }
}

function addToStorage(key, value) {
    let origStorage= undefined;
    let newStorageArray=[];

    if (isTablet) {
        origStorage = JSON.parse(sessionStorage.getItem(key));
    } else {
        origStorage = JSON.parse(localStorage.getItem(key));
    }
   

    console.log(`origStorage:  `, origStorage);
    if (!origStorage || origStorage.length === 0) {
        // if no items in orig storage, add key/value
        newStorageArray.push(value);
    } else if (origStorage.length > 0 && !origStorage.includes(value)) {
        // origStorage has values, but does not include the value, add it.
        newStorageArray = [...origStorage, value];
    } else {
        // origStorage has values AND includes the value just make newStorage = origStorage do nothing
        return 
    }

    
    if (isTablet) {
        sessionStorage.setItem(key, JSON.stringify(newStorageArray));
    } else {
        localStorage.setItem(key, JSON.stringify(newStorageArray));
    }
   
}

function getItemsFromStorage(key) {
    if (isTablet) {
        const storage = JSON.parse(sessionStorage.getItem(key));
        console.log(`storage: `, storage, `as ${typeof storage}`);
        return JSON.parse(sessionStorage.getItem(key));
    } else {
        const storage = JSON.parse(localStorage.getItem(key));
        console.log(`storage: `, storage, `as ${typeof storage}`);
        return JSON.parse(localStorage.getItem(key));
    }
}

function refresh() {
    let hiddenQuestions = getItemsFromStorage("gotIt");
    let showSects = getItemsFromStorage("showSections");

        // get from local storage and set questions and sections
    // as indicated
    setQuestionDisplay(hide=false);
    setSectionDisplay(hide=true);
    setSectionLabels(SHOW_BUTTON);


    for (let i = 0; i < hiddenQuestions; i++) {
        // questionDiv display = "none"
        setQuestionDisplay(hide=true, hiddenQuestions[i]);
    }
    const sectionButtons = document.getElementsByClassName("sectionButton");
    for (let i =0;i < showSects; i++) {
        const currElt = getElementById(showSects[i]);
        setSectionDisplay(hide=false, currElt);
        setSectionLabels(HIDE_BUTTON, currElt);
    }

}

function reset() {
    // set all sections to hide
    setSectionDisplay(hide=true);
    setSectionLabels(SHOW_BUTTON);

    // set all questions to show
    setQuestionDisplay(hide=false);
    
    // remove all local storage
    clearStorage("gotIt");
    clearStorage("showSections")
}

function hideAnswers() {
  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList?.length; i++) {
      elList[i].style.display = "none";
  }

}
function showAnswers() {
  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList?.length; i++) {
      elList[i].style.display = "block";
  }
}
function hideQuestion(event) {
    //console.log(event.target.id);
    let question = document.getElementById(event.target.id);

    question.style.display = "none";
}
function showQuestions() {
    const hidden = getItemsFromStorage("gotIt");
    
    if (hidden != null) {
        console.log("HiddenQuestions:  ", hidden);
        for (let i = 0; i < hidden?.length; i++) {
            let question = document.getElementById(hidden[i]);
            //console.log("Setting ", hiddenQuestionsArr[i], " to display=none");
            question.style.display = "none";
        }
    }
}

function hideSections() {
    sectionElts = document.getElementsByClassName('section');
    const hideSection = true;
    const showSection = false;
    let showSections;
    
    if (isTablet) {
        showSections = sessionStorage.getItem("showSections");       
    } else {
        showSections = localStorage.getItem("showSections");
    }
    console.log(`showSections: `, showSections);
    for (let i = 0; i < sectionElts.length; i++) {
        if (showSections?.includes(sectionElts[i].id)) {
            setSectionDisplay(showSection, sectionElts[i]);
            setSectionLabels(HIDE_BUTTON, sectionElts[i]);
        } else {
            setSectionDisplay(hideSection, sectionElts[i]);
            setSectionLabels(SHOW_BUTTON, sectionElts[i]);
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const userAgent = navigator.userAgent.toLowerCase();
    isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    //console.log(isTablet)

    let resetBtn = document.getElementById("resetButton");
    resetBtn.addEventListener("click", () => {
        console.log(`reset quiz selected. calling reset()`);
        reset();
    });

    hideAnswers();
    showQuestions();
    hideSections();


    function addQuestionEventListeners( ) {

        let hideQuestions = document.getElementsByClassName("hideButtonClass")
        for (let i = 0; i < hideQuestions?.length; i++) {
            hideQuestions[i].addEventListener("click", (event) => {
                //console.log("Target id:  ", event.target.id);
                let parentID = event.target.parentElement.id;
                parentDiv = document.getElementById(parentID);
                parentDiv.style.display = "none";
                gotIt.push(parentID);
                localStorage.setItem("gotIt", JSON.stringify(gotIt));
            });
        }


        let myQuestions = document.getElementsByClassName("buttonClass");

        for (let i = 0; i < myQuestions?.length; i++) {
            myQuestions[i].addEventListener( "click", (event) => {
                answerDiv = event.target.parentElement.getElementsByClassName("answer")[0];
                if (answerDiv !== undefined && answerDiv.style.display === "none") {
                    answerDiv.style.display="block";
                    event.target.innerHTML = "HIDE";
                } else if (answerDiv !== undefined ) {
                    answerDiv.style.display="none";
                    event.target.innerHTML ="SHOW";
                }
            });
         }
    }
    addQuestionEventListeners();

    function addSectionEventListeners() {
        const sectionButtons = document.getElementsByClassName("sectionButton");
        
        for (let i = 0; i < sectionButtons?.length; i++) {
            button = sectionButtons[i]; 
            button.addEventListener("click", (event) => {
                const button = event.target;
                const headingDiv = button.parentNode;
                const sectionDiv = headingDiv.nextElementSibling;

                if (button.innerHTML === 'HIDE') {
                    // set button === 'SHOW'
                    setSectionDisplay(hide=true, sectionDiv);
                    setSectionLabels(SHOW_BUTTON, sectionDiv);
                    removeFromStorage("showSections", button.id)
                    // set display
                } else {
                    // set button === 'HIDE'
                    setSectionDisplay(hide=false, sectionDiv);
                    setSectionLabels(HIDE_BUTTON, sectionDiv);
                    addToStorage("showSections", button.id);
                    // 
                }
            });

        }
    };
    addSectionEventListeners();

});    



