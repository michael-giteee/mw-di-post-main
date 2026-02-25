document.addEventListener('DOMContentLoaded', function() {

    // 🔒 CEK KELOMPOK USIA
    const kelompok = localStorage.getItem("kelompokUsia");

    if (!kelompok) {
        window.location.href = "index.html";
        return;
    }

    // 🧠 Jika Kelompok 2 (55+)
    if (kelompok === "kelompok2") {

        // Ubah judul program
        const weekTitle = document.querySelector(".week-header h2");
        if (weekTitle) {
            weekTitle.textContent = "PROGRAM LATIHAN SENIOR";
        }

        // Ubah jumlah latihan jadi lebih ringan
        document.querySelectorAll(".day-info").forEach(item => {
            if (!item.textContent.includes("Istirahat")) {
                item.textContent = "10 Latihan Ringan";
            }
        });

    }

    // ================================
    // KODE LAMA KAMU (TETAP DIPERTAHANKAN)
    // ================================

    const allStartBtns = document.querySelectorAll('.start-btn');
    const activeDayNumber = 2;
    const listBackBtn = document.querySelector('.list-back-btn');
    
    if (listBackBtn) {
        listBackBtn.href = 'dashboard.html';
        listBackBtn.style.visibility = 'visible';
    }
    
    allStartBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const day = this.getAttribute('data-day');
            
            if (this.classList.contains('rest-day-btn')) {
                alert(`Hari ${day}: Istirahat! Nikmati pemulihan Anda.`);
            } 
            else if (parseInt(day) === activeDayNumber) {
                
                // 🔐 Kalau Kelompok 2, arahkan ke versi senior
                window.location.href = 'hari2.html';
            } 
            else {
                alert(`Anda mengklik 'Mulai' untuk Hari ${day}. Anda dapat memulai hari ini kapan saja!`);
            }
        });
    });

});
