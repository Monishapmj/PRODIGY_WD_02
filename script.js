let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
let laps = [];


document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});


function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}


function stopStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
}


function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00.00";
    document.getElementById("laps").innerHTML = "";
    laps = [];
    document.getElementById("download-btn").disabled = true;
}


function updateTime() {
    elapsedTime = Date.now() - startTime;
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    document.getElementById("display").textContent =
        `${hours.toString().padStart(2, '0')}:
         ${minutes.toString().padStart(2, '0')}:
         ${seconds.toString().padStart(2, '0')}.
         ${milliseconds.toString().padStart(2, '0')}`;
}


function lapStopwatch() {
    if (isRunning) {
        let lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${laps.length + 1}: ${document.getElementById("display").textContent}`;
        document.getElementById("laps").appendChild(lapTime);
        laps.push(lapTime.textContent);
        document.getElementById("download-btn").disabled = false;
    }
}


function downloadLaps() {
    if (laps.length > 0) {
        let csvContent = "Lap Times\n" + laps.join("\n");
        let blob = new Blob([csvContent], { type: "text/csv" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "lap_times.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

document.getElementById("start-btn").addEventListener("click", startStopwatch);
document.getElementById("stop-btn").addEventListener("click", stopStopwatch);
document.getElementById("lap-btn").addEventListener("click", lapStopwatch);
document.getElementById("reset-btn").addEventListener("click", resetStopwatch);
document.getElementById("download-btn").addEventListener("click", downloadLaps);
