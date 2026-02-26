document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    // 🔐 CEK REGISTER
    // =====================================
    const isRegistered = localStorage.getItem("isRegistered");

    if (!isRegistered) {
        window.location.href = "index.html";
        return;
    }

    // =====================================
    // 🔐 CEK BODY SCAN & SCOLIOMETER
    // =====================================
    const hasBodyScan = localStorage.getItem("hasBodyScan");
    const hasScoliometer = localStorage.getItem("hasScoliometer");

    if (!hasBodyScan || !hasScoliometer) {
        window.location.href = "bodyscan.html";
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

        startBtn.disabled = false;
        startBtn.textContent = "Mulai";
        dayItem.classList.remove("locked");

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
