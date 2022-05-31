const searchName = document.querySelector(".searchInput");
const searchResults = document.querySelector(".results");
const alertMsg = document.querySelector(".alertMsg");
const check = document.querySelectorAll("#btn");
const resultsCol = document.querySelector(".resultsCol");
const resultSec = document.querySelector(".resultSec");
const theme = document.querySelector(".theme");
const body = document.querySelector("body");
const apklink = document.querySelector(".apkLinks");
const img = document.querySelector("img");
const secLink = document.querySelector(".secLink");
const nextArrow = document.querySelector(".fa-circle-arrow-right");
const prevArrow = document.querySelector(".fa-circle-arrow-left");

const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

searchName.addEventListener("keyup", function (e) {
  const searchValue = searchName.value;
  if (e.keyCode === 13) {
    getResult(searchValue);
  }
});

function err() {
  console.log("initiated");
  resultSec.style.display = "block";
  resultsCol.style.display = "none";
  alertMsg.style.display = "block";
  alertMsg.innerHTML = "Invalid search, Please enter another search term.";
  searchName.value = "";
}

let row = 10;
let pageNo = 0;
let count = 0;
console.log(pageNo);
async function getResult(searchVal) {
  console.log(searchVal);
  const response = await fetch(apiURL + searchVal);
  const results = await response.json();
  console.log(results);
  if (results.query.search.length == 0) {
    return err();
  } else {
    displayResults(results, pageNo);
  }
}

var color;
if (count == 0) {
  (body.classList = "theme1"), "theme1img";
  theme.classList = "themechng";
  searchName.classList = "theme1input";
}

theme.addEventListener("click", function () {
  count++;
  if (count == 1) {
    console.log(count);
    img.style.boxShadow = "2px 2px 30px   #F39309";
    searchName.style.border = "2px solid #F39309";
    theme.style.boxShadow = "0px 0px 8px  #F39309";
    prevArrow.style.boxShadow = "0px 0px 40px inset #F39309";
    nextArrow.style.boxShadow = "0px 0px 40px inset #F39309";
    color = "#F39309";
  } else if (count == 2) {
    img.style.boxShadow = "2px 2px 30px   #87CEFA";
    searchName.style.border = "2px solid #87CEFA";
    theme.style.boxShadow = "0px 0px 8px  #87CEFA";
    prevArrow.style.boxShadow = "0px 0px 40px inset #87CEFA";
    nextArrow.style.boxShadow = "0px 0px 40px inset #87CEFA";

    color = "#87CEFA";
    count = 0;
  }

  if (searchName.value != "") {
    getResult(searchName.value);
  }
});

function displayResults(results, pageNo) {
  a = results.query.search;
  const resUrl = `https://en.wikipedia.org/?curid=`;
  resultSec.style.display = "block";
  resultsCol.style.display = "block";
  alertMsg.style.display = "none";
  let searchRes;
  resultsCol.innerHTML = "";
  for (var i = row * pageNo; i < row * pageNo + row; i++) {
    searchRes = `<div class="resultOne">
      <a class="topLink" href="${resUrl + a[i].pageid} " target="_blank">${
      a[i].title
    } </a> <br>
      <a class="secLink" style="color:${color}" href="${
      resUrl + a[i].pageid
    }" target="_blank">${resUrl + a[i].pageid}</a>
      <div class="searchContent" id="searchedFont"> ${
        a[i].snippet
      } <span class="contentSpan">...</span> </div>
      </div>`;
    resultsCol.innerHTML += searchRes;
  }
  // searchName.value = "";
  apklink.style.display = "none";
}

nextArrow.addEventListener("click", () => {
  console.log("next arrrow clicked");
  pageNo++;
  if (pageNo <= 1) {
    getResult(searchName.value);
  } else {
    alert("You reached last page.");
  }
});

prevArrow.addEventListener("click", () => {
  pageNo--;
  if (pageNo >= 0) {
    getResult(searchName.value);
  } else {
    alert("No previous page available");
  }
});
