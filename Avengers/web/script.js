let index = 0;

let middleColumn = document.getElementById("middle-column");

function generatePost(kep, nev, uzenet) {
  return `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
        <img src="${kep}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
        <span class="w3-right w3-opacity">1 min</span>
        <h4>${nev}</h4><br>
        <hr class="w3-clear">
        <p>${uzenet}</p>
          <div class="w3-row-padding" style="margin:0 -16px">
        </div>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button> 
        <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> 
      </div>`;
}

function refresh() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:8000/api/uzenet", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      for (; index < result.length; index++) {
        middleColumn.innerHTML += generatePost(
          result[index].kep,
          result[index].kuldo,
          result[index].uzenet
        );
      }
    })
    .catch((error) => console.log("error", error));
}

function add() {
  let newPostText = document.getElementById("new-post-text").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    kep: "profile.jpg",
    kuldo: "Tony Stark",
    uzenet: newPostText,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8000/api/uzenet", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        refresh()
    })
    .catch((error) => console.log("error", error));
}

refresh();
