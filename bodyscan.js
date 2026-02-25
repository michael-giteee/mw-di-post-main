let isMeasuring = false;
let intervalId = null;
const valueDisplay = document.getElementById('valueDisplay'); 
const meterNeedle = document.getElementById('meterNeedle');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const leftPauseBtn = document.getElementById('leftPauseBtn');
const rightPauseBtn = document.getElementById('rightPauseBtn');

const MAX_ANGLE = 30; // Sudut maksimum yang diukur (-30 hingga +30)

// --- Fungsi Penggerak Jarum ---

/**
 * Memetakan nilai sudut pengukuran (-30 hingga 30) ke derajat rotasi CSS (0deg hingga 180deg).
 * -30 derajat (kiri) -> 0 derajat rotasi CSS
 * 0 derajat (tengah) -> 90 derajat rotasi CSS
 * 30 derajat (kanan) -> 180 derajat rotasi CSS
 * @param {number} value - Nilai sudut yang diukur (-30 hingga 30)
 * @returns {number} Sudut rotasi CSS (0 hingga 180)
 */
function mapValueToRotation(value) {
    const normalized = (value + MAX_ANGLE) / (2 * MAX_ANGLE);
    return normalized * 180;
}


function updateDisplay(newValue) {

    const displayValue = Math.round(newValue);
    
    valueDisplay.textContent = displayValue;
    const rotation = mapValueToRotation(displayValue);
    
    meterNeedle.style.transform = `rotate(${rotation}deg)`;
}


// --- Logika Pengukuran dan Tombol ---

function toggleMeasuring() {
    isMeasuring = !isMeasuring;

    if (isMeasuring) {
        startStopBtn.textContent = 'JEDA PENGUKURAN';
        
        // Mulai interval pengukuran
        intervalId = setInterval(() => {
            // Nilai random antara -30 dan 30 (simulasi sensor)
            const newValue = Math.floor(Math.random() * (2 * MAX_ANGLE + 1)) - MAX_ANGLE; 
            updateDisplay(newValue);
        }, 200); 
        
    } else {
        startStopBtn.textContent = 'LANJUTKAN PENGUKURAN';
        // Hentikan interval
        clearInterval(intervalId);
    }
}

function resetMeasurement() {
    isMeasuring = false;
    clearInterval(intervalId);
    intervalId = null;
    startStopBtn.textContent = 'MULAI PENGUKURAN';
    updateDisplay(0); // Reset nilai ke 0
}

// --- Event Listeners ---

// Tombol Mulai/Jeda Utama
startStopBtn.addEventListener('click', toggleMeasuring);

// Tombol Reset
resetBtn.addEventListener('click', resetMeasurement);

// Tombol JEDA Kiri/Kanan
leftPauseBtn.addEventListener('click', () => {
    if (isMeasuring) {
        toggleMeasuring();
    }
});

rightPauseBtn.addEventListener('click', () => {
    if (isMeasuring) {
        toggleMeasuring();
    }
});

// Inisialisasi tampilan awal
updateDisplay(0);