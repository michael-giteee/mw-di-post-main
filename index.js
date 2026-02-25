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
document.getElementById('startJourneyBtn').addEventListener('click', function() {
    window.location.href = 'bodyscan.html';
});