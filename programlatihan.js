document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    // 🔐 CEK REGISTER SAJA
    // =====================================
    const isRegistered = localStorage.getItem("isRegistered");

    if (!isRegistered) {
        window.location.href = "index.html";
        return;
    }

    // =====================================
    // 🔒 SISTEM LOCK HARI BERURUTAN
    // =====================================

    const allDays = document.querySelectorAll(".day-item");
    const allStartBtns = document.querySelectorAll(".start-btn");

    let unlockedDay = parseInt(localStorage.getItem("unlockedDay")) || 2;

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

            if (day > unlockedDay) {
                return;
            }

            localStorage.setItem("currentDay", day);

            window.location.href = "hari2.html";

        });

    });

});
