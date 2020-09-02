const leaderboard = document.querySelector(".leaderData");
var data = [];

function readFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);

  // var req = new XMLHttpRequest();
  // req.open("GET", file, true);
  // req.send();
  // req.onload = function () {
  //   const data = JSON.parse(req.responseText);
  //   callback(data);
  // };
}

readFile("./score.json", (text) => {
  data = [...JSON.parse(text)];
  writeLeader(data);
});

function writeLeader(data) {
  data.sort((leader1, leader2) => leader2.score - leader1.score);

  let leaderHtml = data
    .map((leader, i) => {
      return `<div class="leader">
    <div class="name" key=${i + 1}>${i + 1}. ${leader.name} ${
        i == 0 ? "🏆" : ""
      }</div>
    <div class="score">${leader.score}</div>
  </div>`;
    })
    .join("");

  leaderboard.innerHTML = leaderHtml;
  //   console.log(leaderHtml);
}

function updateData(data) {
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "./score.json", true);
  // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && xhr.readyState === 201) {
  //     const serverResponse = JSON.parse(xhr.response);
  //     console.log(serverRespose);
  //   }
  // };
  // xhr.send(JSON.stringify(data));

  var data = "data=" + data;
  var xmlhttp = new XMLHttpRequest();
  if ("withCredentials" in xmlhttp) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log("Done!!!");
      }
    };
    xmlhttp.open("POST", "save.json", true);
    //Must add this request header to XMLHttpRequest request for POST
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(data);
  }
}

function handleHit(score) {
  let leader;
  if (!window.localStorage.leader) {
    let name = prompt("Enter Your name ->", "Funsuk Wangdu");
    leader = {
      id: data.length,
      name: name,
      score: score,
    };
  } else {
    leader = JSON.parse(window.localStorage.leader);
    leader.score = score;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.id == leader.id) {
        data.splice(i, 1);
        break;
      }
    }
  }
  console.log("DATA Before: ", data);
  data = [...data, leader];
  console.log("DATA After: ", data);
  console.log(leader);
  window.localStorage.leader = JSON.stringify(leader);
  writeLeader(data);
  updateData(data);
}
