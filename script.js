// Cek apakah user sudah login
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (username === "admin" && password === "1234") {
                localStorage.setItem("loggedIn", "true"); // Simpan status login
                window.location.href = "index.html"; // Arahkan ke halaman utama
            } else {
                alert("Username atau password salah!");
            }
        });
    }

    // Cek status login di halaman selain login
    if (window.location.pathname !== "/login.html" && localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html"; // Redirect ke login jika belum login
    }

    // Fungsi logout
    let logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedIn"); // Hapus status login
            window.location.href = "login.html"; // Kembali ke halaman login
        });
    }
});

// Fungsi Menghitung Emisi Karbon
document.addEventListener("DOMContentLoaded", function () {
    const carbonCalculator = document.getElementById("carbonCalculator");

    if (carbonCalculator) {
        carbonCalculator.addEventListener("submit", function (e) {
            e.preventDefault();

            let transport = parseFloat(document.getElementById("transport").value) || 0;
            let electricity = parseFloat(document.getElementById("electricity").value) || 0;
            let diet = parseFloat(document.getElementById("diet").value) || 0;

            let totalEmisi = (transport * 0.21) + (electricity * 0.5) + (diet * 2.5);
            document.getElementById("result").innerText = `${totalEmisi.toFixed(2)} kg CO₂`;

            // Simpan hasil ke localStorage untuk ditampilkan di grafik
            let data = JSON.parse(localStorage.getItem("carbonData")) || [];
            data.push({ date: new Date().toLocaleDateString(), total: totalEmisi });
            localStorage.setItem("carbonData", JSON.stringify(data));
        });
    }
});

// Fungsi Menampilkan Grafik
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("carbonChart")) {
        let data = JSON.parse(localStorage.getItem("carbonData")) || [];
        let labels = data.map(d => d.date);
        let values = data.map(d => d.total);

        let ctx = document.getElementById("carbonChart").getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Emisi Karbon (kg CO₂)',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        });
    }
});

// Fungsi Menampilkan Detail Emisi
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("detailTable")) {
        let data = JSON.parse(localStorage.getItem("carbonData")) || [];
        let detailTable = document.getElementById("detailTable");

        detailTable.innerHTML = data.map(d => `
            <tr>
                <td>${d.date}</td>
                <td>${d.total} kg CO₂</td>
            </tr>
        `).join("");
    }
});