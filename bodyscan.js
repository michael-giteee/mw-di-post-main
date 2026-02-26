document.addEventListener("DOMContentLoaded", function () {

    // ====================================
    // 🔐 CEK AKSES (ANTI LOOP BUG)
    // ====================================
    const isRegistered = localStorage.getItem("isRegistered");

    if (!isRegistered) {
        window.location.href = "index.html";
    }

    // ====================================
    // SETUP AWAL
    // ====================================
    let isMeasuring = false;
    let intervalId = null;
    let lastValue = 0;

    const valueDisplay = document.getElementById('valueDisplay');
    const meterNeedle = document.getElementById('meterNeedle');
    const startStopBtn = document.getElementById('startStopBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    const resultPanel = document.getElementById('resultPanel');
    const finalAngle = document.getElementById('finalAngle');
    const resultStatus = document.getElementById('resultStatus');
    const closeResult = document.getElementById('closeResult');

    const MAX_ANGLE = 30;

    function mapValueToRotation(value) {
        const normalized = (value + MAX_ANGLE) / (2 * MAX_ANGLE);
        return normalized * 180;
    }

    function updateDisplay(newValue) {
        lastValue = Math.round(newValue);
        valueDisplay.textContent = lastValue;
        const rotation = mapValueToRotation(lastValue);
        meterNeedle.style.transform = `rotate(${rotation}deg)`;
    }

    function startMeasurement() {
        isMeasuring = true;
        startStopBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";

        intervalId = setInterval(() => {
            const newValue =
                Math.floor(Math.random() * (2 * MAX_ANGLE + 1)) - MAX_ANGLE;
            updateDisplay(newValue);
        }, 200);
    }

    function finishMeasurement() {
        isMeasuring = false;
        clearInterval(intervalId);

        pauseBtn.style.display = "none";
        startStopBtn.style.display = "inline-block";

        showResult(lastValue);

        // ✅ simpan status pengukuran
        localStorage.setItem("hasMeasured", "true");
        unlockHome();
        localStorage.setItem("lastScanResult", lastValue);
    }

    function showResult(value) {
        finalAngle.textContent = value + "°";

        let status = "";
        resultStatus.className = "result-status";

        if (Math.abs(value) <= 5) {
            status = "Normal ✅";
            resultStatus.classList.add("normal");
        } 
        else if (Math.abs(value) <= 15) {
            status = "Perlu Perhatian ⚠";
            resultStatus.classList.add("warning");
        } 
        else {
            status = "Risiko Tinggi ❗";
            resultStatus.classList.add("danger");
        }

        resultStatus.textContent = status;
        resultPanel.classList.add("show");
    }

    if (closeResult) {
        closeResult.addEventListener("click", () => {
            resultPanel.classList.remove("show");
        });
    }

    if (startStopBtn) {
        startStopBtn.addEventListener('click', startMeasurement);
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', finishMeasurement);
    }

    updateDisplay(0);

        const homeBtn = document.getElementById("homeBtn");
    const homeLabel = document.getElementById("homeLabel");

    // cek apakah sudah pernah scan
    if (localStorage.getItem("hasMeasured") === "true") {
        unlockHome();
    }

    function unlockHome() {
        homeBtn.classList.remove("locked");
        homeLabel.textContent = "Home";
    }

    // ketika selesai scan
    function unlockAfterScan() {
        localStorage.setItem("hasMeasured", "true");
        unlockHome();
    }

    // event klik home
    homeBtn.addEventListener("click", function(e) {
        e.preventDefault();

        if (localStorage.getItem("hasMeasured") === "true") {
            window.location.href = "dashboard.html";
        }
    });

});
