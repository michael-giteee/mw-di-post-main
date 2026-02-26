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
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nama = document.getElementById("nama_lengkap").value.trim();
        const email = document.getElementById("email").value.trim();
        const usiaInput = document.getElementById("usia").value;
        const usia = parseInt(usiaInput);

        if (!nama || !email || !usiaInput) {
            alert("Semua data harus diisi!");
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

        // =====================================
        // 🔐 RESET STATUS PENGUKURAN USER LAMA
        // =====================================
        localStorage.removeItem("hasMeasured"); // supaya home terkunci lagi
        localStorage.removeItem("lastScanResult");

        // =====================================
        // SET STATUS USER BARU
        // =====================================
        localStorage.setItem("isRegistered", "true");

        // simpan data user
        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("usia", usia);
        localStorage.setItem("kelompokUsia", kelompokUsia);

        // pindah halaman
        window.location.href = "bodyscan.html";
    });

});
