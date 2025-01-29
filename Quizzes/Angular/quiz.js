const gotIt = [];
const hiddenSections = [];
let isTablet = false;

function reset() {
    let hidden;
    let hiddenSects;

    if (isTablet) {
        hidden = sessionStorage.getItem("gotIt");
        hiddenSects = sessionStorage.getItem("hiddenSections");
    } else {
      hidden = localStorage.getItem("gotIt");
      hiddenSects = localStorage.getItem("hiddenSections");
    }
    
    if (hidden) {
        let hiddenElts = JSON.parse(hidden);

        for (let i=0; i < hiddenElts.length; i++) {
            let elt = document.getElementById(hiddenElts[i]);
            elt.style.display="block";
        }
        if (isTablet) {
            sessionStorage.removeItem("gotIt");
        } else {
            localStorage.removeItem("gotIt");
        }
    }
    if (hiddenSects?.length > 0) {
        console.log(`We have hiddenSections to reset: `, hiddenSects);
        // set everything to style  = display: inline-block for all sections
        let sectionShowHideLabels = document.getElementsByClassName("sectionButton");
        for (let i = 0; i < sectionShowHideLabels.length; i++) {
            sectionShowHideLabels[i].innerHTML = "HIDE";
            sectionShowHideLabels[i].innerText = "HIDE";
        }

        let sections = document.getElementsByClassName("section");
        for (let i = 0; i < sections?.length; i++) {
            sections[i].style="display: inline-block";
            sections[i].display = "inline-block";
        }
        localStorage.removeItem("hiddenSections");
    } 
}

function hideAnswers() {

  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList.length; i++) {
      elList[i].style.display = "none";
  }

}
function showAnswers() {
  let elList = document.getElementsByClassName("answer");
  for (i = 0; i < elList.length; i++) {
      elList[i].style.display = "block";
  }
}

function hideQuestion(event) {
    //console.log(event.target.id);
    let question = document.getElementById(event.target.id);

    question.style.display = "none";
}

function showQuestions() {
    let hidden;
    if (isTablet) {
         hidden = sessionStorage.getItem("gotIt");
    } else {
         hidden = localStorage.getItem("gotIt");
    }
    if (hidden != null) {
        hiddenQuestionsArr = JSON.parse(hidden);
        //console.log("HiddenQuestions:  ", hiddenQuestionsArr);
        for (let i = 0; i < hiddenQuestionsArr.length; i++) {
            let question = document.getElementById(hiddenQuestionsArr[i]);
            //console.log("Setting ", hiddenQuestionsArr[i], " to display=none");
            question.style.display = "none";
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    let quizBtn = document.getElementsByClassName("quizNbr")[0];

    //console.log("Quiz btn:  ", quizBtn.id);
    if (localStorage.getItem(quizBtn.id)) {
        quizBtn.style.display = "none"
        let quiz = document.getElementById("quiz");
        quiz.style.display = "inline-block";
    }

    //quizBtn.style.display = "inline-block";
    quizBtn.addEventListener("click", (event) => {
        quiz = event.target.id;
        if (localStorage.getItem(quiz) === null) {
            let thisQuizNbr = parseInt(quiz.slice(4));
            cleanLocalStorage(thisQuizNbr);
            reset();
            localStorage.setItem(quiz, "started");
            quizBtn.style.display = "none";
            let myQuiz = document.getElementById("quiz");
            myQuiz.style.display = "inline-block";
        };

    });


    const userAgent = navigator.userAgent.toLowerCase();
    isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    //console.log(isTablet)

    let resetBtn = document.getElementById("resetButton");
    resetBtn.addEventListener("click", reset);

    hideAnswers();

    showQuestions();

    function addQuestionEventListeners( ) {

        let hideQuestions = document.getElementsByClassName("hideButtonClass")
        for (let i = 0; i < hideQuestions.length; i++) {
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

        for (let i = 0; i < myQuestions.length; i++) {
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

             // For each button clicked, we have the button element
    // 1.  get the hiddenSections from local storage
    // 2.  get the next sibling for the button.
    // 3.  if next sibling.id is in localStorage
    //         remove sibling.id from local storage
    //         change this elements inner html to "HIDE"
    //         change the section (sibling.id) style="inline-block";
    // 4.  else
    //         put sibling.id into localStorage
    //         change this element's innerHtml to "SHOW"
    //         change the sibling.id.style="none"

    function addSectionEventListeners() {
        const sectionButtons = document.getElementsByClassName("sectionButton");
       
        
        for (let i = 0; i < sectionButtons.length; i++) {
            button = sectionButtons[i]; 
            button.addEventListener("click", (event) => {
                // const sectionDiv = event.target.parentNode;
               
                const button = event.target;
                const headingDiv = button.parentNode;
                const sectionDiv = headingDiv.nextElementSibling;

                const sectionIsHidden = localStorage.getItem("hiddenSections")?.includes(sectionDiv.id);

                if (sectionIsHidden) {
                    event.target.innerHTML = "HIDE";
                    event.target.innerText = "HIDE";
                    sectionDiv.style="display:inline-block";

                    const idx = hiddenSections.indexOf(sectionDiv.id);
                    hiddenSections.splice(idx, 1);
                   
                } else {
                    event.target.innerHTML = "SHOW";
                    event.target.innerText = "SHOW";
                    sectionDiv.style="display:none";

                    hiddenSections.push(sectionDiv.id);
                
                }
                localStorage.setItem("hiddenSections", hiddenSections);
            });

        }
    };
    addSectionEventListeners();

});    

function cleanLocalStorage(currQuizNbr) {
    for (let i = 1; i < currQuizNbr; i++) {
            let lastQuizId = "quiz" + i;
            //console.log("removing ", lastQuizId, " from local storage...");
            localStorage.removeItem(lastQuizId);
    }
}


