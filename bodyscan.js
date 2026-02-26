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
    const resetBtn = document.getElementById('resetBtn');

    const resultPanel = document.getElementById('resultPanel');
    const finalAngle = document.getElementById('finalAngle');
    const resultStatus = document.getElementById('resultStatus');
    const closeResult = document.getElementById('closeResult');

    const MAX_ANGLE = 30;

    // ====================================
    // 🔄 ROTASI JARUM (0 BENAR-BENAR TENGAH)
    // ====================================
    function mapValueToRotation(value) {
        // -30 → -45°, 0 → 0°, +30 → +45°
        const maxDeg = 45;
        return (value / MAX_ANGLE) * maxDeg;
    }

    function updateDisplay(newValue) {
        lastValue = Math.round(newValue);
        valueDisplay.textContent = lastValue;
        const rotation = mapValueToRotation(lastValue);
        meterNeedle.style.transform = `rotate(${rotation + 180}deg)`;
    }

    // ====================================
    // ▶️ MULAI PENGUKURAN
    // ====================================
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

    // ====================================
    // ⏹️ SELESAI PENGUKURAN
    // ====================================
    function finishMeasurement() {
        isMeasuring = false;
        clearInterval(intervalId);

        pauseBtn.style.display = "none";
        startStopBtn.style.display = "inline-block";

        showResult(lastValue);

        // ✅ simpan status (TIDAK DIUBAH)
        localStorage.setItem("hasMeasured", "true");
        localStorage.setItem("hasBodyScan", "true");
        localStorage.setItem("hasScoliometer", "true");

        unlockHome();

        localStorage.setItem("lastScanResult", lastValue);
    }

    // ====================================
    // 📊 HASIL ANALISIS
    // ====================================
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

    // ====================================
    // ❌ TUTUP PANEL HASIL
    // ====================================
    if (closeResult) {
        closeResult.addEventListener("click", () => {
            resultPanel.classList.remove("show");
        });
    }

    // ====================================
    // 🎛️ EVENT BUTTON
    // ====================================
    if (startStopBtn) {
        startStopBtn.addEventListener('click', startMeasurement);
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', finishMeasurement);
    }

    // 🔄 RESET (VISUAL SAJA, AMAN)
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (isMeasuring) return; // tidak ganggu saat ukur
            updateDisplay(0);
        });
    }

    // ====================================
    // INIT AWAL (0 TENGAH)
    // ====================================
    updateDisplay(0);

    // ====================================
    // 🔓 HOME + GEMBOK (TIDAK DIUBAH)
    // ====================================
    const homeBtn = document.getElementById("homeBtn");
    const lockIcon = document.getElementById("lockIcon");

    if (localStorage.getItem("hasMeasured") === "true") {
        unlockHomeInstant();
    }

    function unlockHome() {
        homeBtn.classList.remove("locked");

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

