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
        // -30 → -45°, 0 → 0°, +30 → +45°
        const maxDeg = 45;
        return (value / MAX_ANGLE) * maxDeg;
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

    // ✅ simpan SEMUA status supaya semua halaman sinkron
    localStorage.setItem("hasMeasured", "true");
    localStorage.setItem("hasBodyScan", "true");
    localStorage.setItem("hasScoliometer", "true");

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
    const lockIcon = document.getElementById("lockIcon");

    // cek saat halaman dibuka
    if (localStorage.getItem("hasMeasured") === "true") {
        unlockHomeInstant();
    }

        function unlockHome() {

        homeBtn.classList.remove("locked");

        // animasi buka gembok
        lockIcon.textContent = "🔓";
        lockIcon.classList.add("unlocking");

        setTimeout(() => {
            lockIcon.classList.add("fade-out");
        }, 300);

        setTimeout(() => {
            lockIcon.remove();
            homeBtn.classList.add("unlocked");
        }, 600);
    }

    function unlockHomeInstant() {
        homeBtn.classList.remove("locked");
        lockIcon.remove();
        homeBtn.classList.add("unlocked");
    }

    homeBtn.addEventListener("click", function(e) {
        e.preventDefault();

        if (localStorage.getItem("hasMeasured") === "true") {
            window.location.href = "dashboard.html";
        }
    });

});


