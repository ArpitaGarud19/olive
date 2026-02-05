const ACCESS_CODE = "ARMY123";
let userRole = "";
let map;
let currentPos = null;
let userName = "Unit-" + Math.floor(Math.random()*100);

function login() {
  const code = document.getElementById("code").value;
  if (code !== ACCESS_CODE) {
    alert("Wrong Access Code");
    return;
  }
  userRole = document.getElementById("role").value;
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("userInfo").innerText = userRole + " | " + userName;
  initMap();
}

function initMap() {
  map = L.map("map").setView([20, 78], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  let drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  let drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems }
  });
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.addLayer(e.layer);
    saveLog("Shape drawn");
  });

  db.ref("markers").on("child_added", snap => {
    let d = snap.val();
    L.circleMarker([d.lat, d.lng], {
      radius: 8,
      color: d.color
    }).addTo(map);
    addLog(d.text);
  });
}

function captureLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    currentPos = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };
    alert("Location Captured");
  });
}

function addMarker(type) {
  if (!currentPos) {
    alert("Capture GPS first");
    return;
  }

  let color = type === "enemy" ? "red" :
              type === "friendly" ? "blue" : "green";

  let text = `${userName} marked ${type}`;

  db.ref("markers").push({
    lat: currentPos.lat,
    lng: currentPos.lng,
    color: color,
    text: text
  });
}

function addLog(text) {
  let li = document.createElement("li");
  li.innerText = text;
  document.getElementById("logList").appendChild(li);
}

function saveLog(text) {
  addLog(userName + ": " + text);
}
