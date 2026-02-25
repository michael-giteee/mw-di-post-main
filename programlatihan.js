document.addEventListener('DOMContentLoaded', function() {
    const allStartBtns = document.querySelectorAll('.start-btn');
    const activeDayNumber = 2; // Hari 2 adalah hari yang harus ditautkan ke detail
    const listBackBtn = document.querySelector('.list-back-btn');
    
    // --- 1. Logika Tombol Kembali (←) ---
    if (listBackBtn) {
        listBackBtn.href = 'dashboard.html'; 
        listBackBtn.style.visibility = 'visible';
    }
    
    // --- 2. Logika Tombol Mulai ---
    allStartBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const day = this.getAttribute('data-day');
            
            if (this.classList.contains('rest-day-btn')) {
                // Untuk Hari Istirahat
                alert(`Hari ${day}: Istirahat! Nikmati pemulihan Anda.`);
            } else if (parseInt(day) === activeDayNumber) {
                window.location.href = 'hari2.html'; 
            } else {
                alert(`Anda mengklik 'Mulai' untuk Hari ${day}. Anda dapat memulai hari ini kapan saja!`);
            }
        });
    });
    
});