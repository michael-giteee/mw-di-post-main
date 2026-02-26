document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    // 🔐 CEK LOGIN USER (BUKAN KELOMPOK / BUKAN SCAN)
    // =====================================
    const nama = localStorage.getItem("nama");

    if (!nama) {
        window.location.href = "index.html";
        return;
    }

    // =====================================
    // 🔧 FIX: pastikan unlockedDay selalu ada
    // =====================================
    if (!localStorage.getItem("unlockedDay")) {
        localStorage.setItem("unlockedDay", "2");
    }

    let unlockedDay = parseInt(localStorage.getItem("unlockedDay"));

    // =====================================
    // 🔒 SISTEM LOCK HARI BERURUTAN
    // =====================================

    const allDays = document.querySelectorAll(".day-item");
    const allStartBtns = document.querySelectorAll(".start-btn");

    allDays.forEach((dayItem) => {

        const dayNumber = parseInt(dayItem.getAttribute("data-day"));
        const startBtn = dayItem.querySelector(".start-btn");

        if (!startBtn) return;

        // reset dulu
        startBtn.disabled = false;
        startBtn.textContent = "Mulai";
        dayItem.classList.remove("locked");

        // lock kalau belum terbuka
        if (dayNumber > unlockedDay) {

            startBtn.disabled = true;
            startBtn.textContent = "🔒 Terkunci";
            dayItem.classList.add("locked");

        }

    });

    // =====================================
    // ▶️ EVENT CLICK
    // =====================================

    allStartBtns.forEach(button => {

        button.addEventListener('click', function(e) {

            e.preventDefault();

            const day = parseInt(this.getAttribute("data-day"));

            // extra safety
            if (!day) return;

            if (day > unlockedDay) {
                return;
            }

            // simpan hari aktif
            localStorage.setItem("currentDay", day.toString());

            // redirect ke halaman latihan
            window.location.href = "hari2.html";

        });

    });

});
