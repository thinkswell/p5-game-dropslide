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

  const fragment = document.createDocumentFragment();
  data.forEach((leader, i) => {
    const leaderDiv = document.createElement("div");
    leaderDiv.className = "leader";

    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.innerHTML = `${i + 1}. ${leader.name} ${i === 0 ? "🏆" : ""}`;

    const scoreDiv = document.createElement("div");
    scoreDiv.className = "score";
    scoreDiv.textContent = leader.score;

    leaderDiv.appendChild(nameDiv);
    leaderDiv.appendChild(scoreDiv);
    fragment.appendChild(leaderDiv);
  });

  leaderboard.innerHTML = ""; // Clear existing content
  leaderboard.appendChild(fragment);
}

function updateData(data) {
  const payload = "data=" + JSON.stringify(data);
  const xmlhttp = new XMLHttpRequest();

  if ("withCredentials" in xmlhttp) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log("Data successfully updated!");
      }
    };
    xmlhttp.open("POST", "save.json", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(payload);
  }
}

function handleHit(score) {
  try {
    let leader;
    if (!window.localStorage.leader) {
      const name = prompt("Enter Your Name ->", "Funsuk Wangdu");
      leader = {
        id: data.length,
        name: name,
        score: score,
      };
    } else {
      leader = JSON.parse(window.localStorage.leader);
      leader.score = score;

      data = data.filter((item) => item.id !== leader.id);
    }

    data.push(leader);
    window.localStorage.leader = JSON.stringify(leader);
    writeLeader(data);
    updateData(data);
  } catch (error) {
    console.error("Error handling hit:", error);
  }
}
