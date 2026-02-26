document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    // 🔐 CEK REGISTER
    // =====================================
    const isRegistered = localStorage.getItem("isRegistered");

    if (!isRegistered) {
        alert("Silakan isi data terlebih dahulu!");
        window.location.href = "index.html";
        return;
    }

    // =====================================
    // 🔐 CEK BODY SCAN & SCOLIOMETER
    // =====================================
    const hasBodyScan = localStorage.getItem("hasBodyScan");
    const hasScoliometer = localStorage.getItem("hasScoliometer");

    if (!hasBodyScan || !hasScoliometer) {
        alert("Silakan lakukan Body Scan dan Scoliometer terlebih dahulu!");
        window.location.href = "bodyscan.html";
        return;
    }

    // =====================================
    // 🔒 SISTEM LOCK HARI BERURUTAN
    // =====================================

    const allDays = document.querySelectorAll(".day-item");
    const allStartBtns = document.querySelectorAll(".start-btn");

    // ambil progress terakhir (default hari 2 karena hari 1 sudah selesai)
    let unlockedDay = parseInt(localStorage.getItem("unlockedDay")) || 2;

    // loop semua hari
    allDays.forEach((dayItem) => {

        const dayNumber = parseInt(dayItem.getAttribute("data-day"));
        const startBtn = dayItem.querySelector(".start-btn");

        if (!startBtn) return;

        // reset dulu
        startBtn.disabled = false;
        startBtn.textContent = "Mulai";
        dayItem.classList.remove("locked");

        // kalau hari lebih besar dari unlockedDay → kunci
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

            // hanya boleh masuk kalau tidak terkunci
            if (day > unlockedDay) {

                alert("Selesaikan hari sebelumnya terlebih dahulu!");
                return;

            }

            // semua hari masuk ke hari2.html
            localStorage.setItem("currentDay", day);

            window.location.href = "hari2.html";

        });

    });

});
