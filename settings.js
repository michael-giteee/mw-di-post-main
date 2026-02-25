// Mengambil elemen-elemen dari DOM
const postureToggle = document.getElementById('postureToggle');
const exerciseToggle = document.getElementById('exerciseToggle');
const frequencySelect = document.getElementById('frequencySelect');
const freqLabel = document.getElementById('freqLabel');

// Logika saat Posture Reminder diubah
postureToggle.addEventListener('change', () => {
    console.log("Posture Reminder aktif:", postureToggle.checked);
});

// Logika saat Frekuensi diubah
frequencySelect.addEventListener('change', (e) => {
    const value = e.target.value;
    freqLabel.textContent = `Setiap ${value} menit`;
    console.log("Frekuensi diubah menjadi:", value, "menit");
});

// Logika saat Latihan Harian diubah
exerciseToggle.addEventListener('change', () => {
    console.log("Latihan Harian aktif:", exerciseToggle.checked);
});