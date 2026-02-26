// =====================================
// 🌐 TRANSLATION SYSTEM
// =====================================
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

if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
}

function changeLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}


// =====================================
// FORM REGISTER / LOGIN SYSTEM
// =====================================
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    if (!form) return;

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


        // =====================================
        // CEK DATA LAMA
        // =====================================
        const savedNama = localStorage.getItem("nama");
        const savedEmail = localStorage.getItem("email");
        const savedUsia = localStorage.getItem("usia");
        const hasMeasured = localStorage.getItem("hasMeasured");


        // =====================================
        // JIKA USER SUDAH PERNAH REGISTER & SCAN
        // =====================================
        if (
            savedNama === nama &&
            savedEmail === email &&
            savedUsia === usiaInput &&
            hasMeasured === "true"
        ) {

            // login sukses → dashboard
            window.location.href = "dashboard.html";
            return;
        }


        // =====================================
        // USER BARU
        // =====================================
        let kelompokUsia = "";

        if (usia >= 17 && usia <= 55) {
            kelompokUsia = "kelompok1";
        } else {
            kelompokUsia = "kelompok2";
        }

        localStorage.setItem("nama", nama);
        localStorage.setItem("email", email);
        localStorage.setItem("usia", usia);
        localStorage.setItem("kelompokUsia", kelompokUsia);

        localStorage.setItem("hasMeasured", "false");

        // ke bodyscan
        window.location.href = "bodyscan.html";

    });

});
