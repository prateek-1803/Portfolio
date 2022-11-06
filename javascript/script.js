const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//------------//

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");
burger.addEventListener("click", () => {
    ul.classList.toggle("show");
});

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);
//------------//
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click",() =>{
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll",() =>{
    if(document.querySelector(".style-switcher").classList.toggle("open")){
        document.querySelector(".style-switcher").classList.remove("open")
    }
})

const alternateStyles= document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true");
        }
    })
}

//------------//

const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})
window.addEventListener("load" , ()=>{
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
    }else{
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})

//------------//
let rankMap = new Map([
    ["newbie", "grey"],
    ["pupil", "green"],
    ["specialist", "darkcyan"],
    ["expert", "blue"],
    ["candidate master", "purple"],
    ["master", "orange"],
    ["international master", "orange"],
    ["grandmaster", "red"],
    ["international grandmaster", "red"],
    ["legendary grandmaster", "rgb(150,0,0)"],
]);

var rating = document.getElementById("rating");
var maxRating = document.getElementById("max-rating");
var rank = document.getElementById("rank");
var maxRank = document.getElementById("max-rank");
var profileLink = document.getElementById("profile-link");
var curClass = document.getElementsByClassName("cf-stats-cur");
var maxClass = document.getElementsByClassName("cf-stats-max");
var cpInputField = document.getElementById("cp-input-field");
var cpButton = document.getElementById("cp-btn");

function updateCPSection(handle_name) {
    function work(data) {
        console.log(data.result.length);
        if (data.result[0].rank == undefined) {
            var cfRankCur = data.result[0].rank;
            var cfRankMax = data.result[0].maxRank;
            var cfRatingCur = data.result[0].rating;
            var cfRatingMax = data.result[0].maxRating;
            var profileName = data.result[0].handle;

            rating.innerText = "Current Rating : Unrated";
            maxRating.innerText = "Max Rating : Unrated";
            rank.innerText = "Current Rank : - ";
            maxRank.innerText = "Max Rank : - ";
            profileLink.innerText = profileName;
            profileLink.href = "https://codeforces.com/profile/" + profileName;
            profileLink.style.backgroundColor = "black";

            for (var i = 0; i < curClass.length; i++) {
                curClass[i].style.color = "black";
            }

            for (var i = 0; i < maxClass.length; i++) {
                maxClass[i].style.color = "black";
            }
        } else {
            var cfRankCur = data.result[0].rank;
            var cfRankMax = data.result[0].maxRank;
            var cfRatingCur = data.result[0].rating;
            var cfRatingMax = data.result[0].maxRating;
            var profileName = data.result[0].handle;

            rating.innerText = "Current Rating : " + cfRatingCur;
            maxRating.innerText = "Max Rating : " + cfRatingMax;
            rank.innerText = "Current Rank : " + cfRankCur;
            maxRank.innerText = "Max Rank : " + cfRankMax;
            profileLink.innerText = profileName;
            profileLink.href = "https://codeforces.com/profile/" + profileName;
            profileLink.style.backgroundColor = rankMap.get(cfRankCur);

            for (var i = 0; i < curClass.length; i++) {
                curClass[i].style.color = rankMap.get(cfRankCur);
            }

            for (var i = 0; i < maxClass.length; i++) {
                maxClass[i].style.color = rankMap.get(cfRankMax);
            }
        }

        // console.log(data);
    }

    $.ajax({
        url: "https://codeforces.com/api/user.info?handles=" + handle_name,
        method: "GET",
        success: work,
        error:() => {
            alert("User Not Found!");
        }
    });
}

cpInputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        updateCPSection(cpInputField.value);
    }
});

cpButton.addEventListener("click", () => {
    updateCPSection(cpInputField.value);
});

updateCPSection("sarvjot");
