document.addEventListener('DOMContentLoaded', function() {

    // =====================================
    // 🔐 CEK AKSES (REGISTER & PENGUKURAN)
    // =====================================
    const isRegistered = localStorage.getItem("isRegistered");
    const hasMeasured = localStorage.getItem("hasMeasured");

    if (!isRegistered) {
        alert("Silakan isi data terlebih dahulu!");
        window.location.href = "index.html";
        return;
    }

    if (!hasMeasured) {
        alert("Silakan lakukan pengukuran terlebih dahulu!");
        window.location.href = "bodyscan.html";
        return;
    }

    // =====================================
    // 🔒 CEK KELOMPOK USIA
    // =====================================
    const kelompok = localStorage.getItem("kelompokUsia");

    if (!kelompok) {
        window.location.href = "index.html";
        return;
    }

    // Jika kelompok senior
    if (kelompok === "kelompok2") {

        const weekTitle = document.querySelector(".week-header h2");

        if (weekTitle) {
            weekTitle.textContent = "PROGRAM LATIHAN SENIOR";
        }

        document.querySelectorAll(".day-info").forEach(item => {
            if (!item.textContent.includes("Istirahat")) {
                item.textContent = "10 Latihan Ringan";
            }
        });
    }


    // =====================================
    // 🔒 SISTEM KUNCI BERURUTAN
    // =====================================

    // default mulai dari hari 1
    let currentDay = parseInt(localStorage.getItem("currentDay")) || 1;

    const allDays = document.querySelectorAll(".day-item");

    allDays.forEach(item => {

        const day = parseInt(item.dataset.day);
        const button = item.querySelector(".start-btn");

        if (!button) return;

        if (day > currentDay) {

            // 🔒 terkunci
            item.classList.remove("active", "completed");
            item.classList.add("locked");

            button.disabled = true;
            button.textContent = "Terkunci 🔒";

        } 
        else if (day === currentDay) {

            // 🔓 aktif
            item.classList.remove("locked", "completed");
            item.classList.add("active");

            button.disabled = false;
            button.textContent = "Mulai";

        } 
        else {

            // ✅ sudah selesai
            item.classList.remove("locked", "active");
            item.classList.add("completed");

            button.disabled = false;
            button.textContent = "Ulangi";

        }

    });


    // =====================================
    // HANDLE CLICK LATIHAN
    // =====================================

    const allStartBtns = document.querySelectorAll('.start-btn');

    allStartBtns.forEach(button => {

        button.addEventListener('click', function(e) {

            e.preventDefault();

            const day = parseInt(this.getAttribute('data-day'));

            if (this.classList.contains('rest-day-btn')) {

                alert(`Hari ${day}: Istirahat!`);
                return;

            }

            if (day <= currentDay) {

                // simpan hari aktif
                localStorage.setItem("selectedDay", day);

                // SEMUA menuju hari2.html
                window.location.href = "hari2.html";

            } 
            else {

                alert("Hari masih terkunci 🔒");

            }

        });

    });


    // =====================================
    // BACK BUTTON
    // =====================================
    const listBackBtn = document.querySelector('.list-back-btn');

    if (listBackBtn) {
        listBackBtn.href = 'dashboard.html';
    }

});
