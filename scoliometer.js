const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const measurementValue = document.getElementById('measurement-value');
const gaugeLine = document.getElementById('gauge-line');
const interpretationText = document.getElementById('interpretation-text');

let isMeasuring = false;
let zeroOffset = 0; // untuk kalibrasi

function updateGauge(angle) {

    const correctedAngle = angle - zeroOffset;

    const displayAngle = Math.min(Math.max(correctedAngle, -30), 30);

    gaugeLine.style.transform = `rotate(${displayAngle}deg)`;
    measurementValue.textContent = `${Math.abs(correctedAngle).toFixed(1)}°`;

    const absAngle = Math.abs(correctedAngle);

    if (absAngle >= 7) {
        gaugeLine.style.backgroundColor = 'red';
        interpretationText.style.color = 'red';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Waspada, disarankan konsultasi medis.`;
    } else if (absAngle >= 5) {
        gaugeLine.style.backgroundColor = 'orange';
        interpretationText.style.color = 'orange';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Perlu pemantauan rutin.`;
    } else {
        gaugeLine.style.backgroundColor = '#4863f7';
        interpretationText.style.color = '#666';
        interpretationText.textContent =
            `Rotasi: ${absAngle.toFixed(1)}°. Dalam batas normal.`;
    }
}

function handleOrientation(event) {
    if (!isMeasuring) return;

    let tilt = 0;

    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    if (isLandscape) {
        // Android landscape paling stabil pakai beta
        tilt = event.beta;
    } else {
        // Portrait pakai gamma
        tilt = event.gamma;
    }

    // Kadang Android kebalik arah
    tilt = -tilt;

    updateGauge(tilt);
}

function startMeasurement() {
    if (isMeasuring) return;

    isMeasuring = true;
    startButton.textContent = 'Mengukur...';
    startButton.disabled = true;

    // Untuk iPhone (harus minta izin)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    alert("Izin sensor ditolak.");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
}

function resetMeasurement() {
    isMeasuring = false;

    window.removeEventListener("deviceorientation", handleOrientation);

    zeroOffset = 0;
    updateGauge(0);

    startButton.textContent = 'Mulai Pengukuran';
    startButton.disabled = false;

    interpretationText.textContent =
        'Tekan "Mulai Pengukuran" untuk memulai proses.';
}

startButton.addEventListener('click', startMeasurement);
resetButton.addEventListener('click', resetMeasurement);


updateGauge(0);
