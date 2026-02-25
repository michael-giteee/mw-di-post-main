const translations = {
    "id": {
        "tagline": "Perbaiki posturmu, perbaiki hidupmu",
        "label_nama": "Nama Lengkap",
        "label_email": "Email",
        "btn_submit": "Mulai Perjalanan Postur"
    },
    "en": {
        "tagline": "Improve your posture, improve your life",
        "label_nama": "Full Name",
        "label_email": "Email Address",
        "btn_submit": "Start Posture Journey"
    }
};

const languageSelect = document.getElementById('languageSelect');

languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

function changeLanguage(lang) {
    // Cari semua elemen yang punya atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Tombol navigasi Anda yang sudah ada
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const usiaInput = document.getElementById("usia").value;
        const usia = parseInt(usiaInput);

        if (!usiaInput) {
            alert("Silakan masukkan usia terlebih dahulu");
            return;
        }

        if (usia < 17) {
            alert("Maaf, usia tidak memenuhi syarat.");
            return;
        }

        let kelompokUsia = "";

        if (usia >= 17 && usia <= 55) {
            kelompokUsia = "kelompok1";
        } else {
            kelompokUsia = "kelompok2";
        }

        localStorage.setItem("kelompokUsia", kelompokUsia);
        localStorage.setItem("usia", usia);

        window.location.href = "bodyscan.html";
    });

});
