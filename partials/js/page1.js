const texts = [
    "Haii Kamu!!", 
    "Iya Kamu!!", 
    "Happy Birthday!!", 
    "Semoga", 
    "Harapan Yang Kamu Buat",
    "Aku Harap", 
    "Bisa Terkabul", 
    "Dan Semua Keinginan Kamu", 
    "Dapat Terealisasikan", 
    "Dan Terimakasih", 
    "Sudah Bertahan", 
    "Sampai Sekarang", 
    "Dan Untuk Seterusnya Juga :)", 
    "Aku Harap Kamu",
    "Selalu Bahagia", 
    "Dan", 
    "Menjadi Seseorang", 
    "Yang Selalu Menolong", 
    "Wish U All The Best"
];

const newTexts = [
    "Teks Baru Pertama", 
    "Teks Baru Kedua", 
    "Teks Baru Ketiga", 
    "Teks Baru Keempat", 
    "Teks Baru Kelima"
];

let index = 0;
let textPart = 0;

function mulai() {
    document.getElementById('startButton').style.display = 'none'; // Sembunyikan tombol
    const music = document.getElementById('backgroundMusic');
    music.play(); // Memulai musik
    tampilkanTeks(); // Mulai menampilkan teks
}

// Panggil fungsi untuk menampilkan teks pertama saat tombol diklik
document.getElementById('startButton').onclick = mulai;

function tampilkanTeks() {
    const currentTexts = textPart === 0 ? texts : newTexts;
    const textContainer = document.getElementById('text-container');
    
    if (index < currentTexts.length) {
        textContainer.innerHTML = '';
        textContainer.classList.remove('erasing');

        // Animasi typing
        let charIndex = 0;
        const text = currentTexts[index];
        
        function type() {
            if (charIndex < text.length) {
                textContainer.innerHTML += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Delay antar karakter
            } else {
                // Delay sebelum mulai menghapus
                setTimeout(() => {
                    textContainer.classList.add('erasing');
                    hapusTeks();
                }, 2000);
            }
        }
        
        type();
    } else {
        if (textPart < 1) {
            document.getElementById('buttons').style.display = 'block';
        } else {
            // Tampilkan tombol untuk melanjutkan setelah semua teks ditampilkan
            document.getElementById('continueButton').style.display = 'block';
        }
    }
}

function hapusTeks() {
    const textContainer = document.getElementById('text-container');
    const currentTexts = textPart === 0 ? texts : newTexts;
    let charIndex = currentTexts[index].length;

    function erase() {
        if (charIndex > 0) {
            textContainer.innerHTML = currentTexts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50); // Delay antar karakter hapus
        } else {
            index++;
            tampilkanTeks(); // Tampilkan teks berikutnya
        }
    }

    erase();
}

function lanjut() {
    if (index >= texts.length) {
        textPart++;
        index = 0;
        document.getElementById('buttons').style.display = 'none';
        tampilkanTeks(); 
    }
}

function lanjutKePageBaru() {
    window.location.href = '/page/page2.html'; // Ganti dengan URL halaman baru
}

function berhenti() {
    const btn = document.getElementById('berhentiBtn');
    let count = 0;

    const moveButton = setInterval(() => {
        if (count < 1) { // Pindah 10 kali
            const randomX = Math.random() * (window.innerWidth - btn.offsetWidth);
            const randomY = Math.random() * (window.innerHeight - btn.offsetHeight);
            btn.style.position = 'absolute';
            btn.style.left = randomX + 'px';
            btn.style.top = randomY + 'px';
            count++;
        } else {
            clearInterval(moveButton);
        }
    }, 300); // Delay antar gerakan
}

// Panggil fungsi untuk menampilkan teks pertama saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    textContainer.innerHTML = ''; // Pastikan kontainer kosong saat halaman dimuat
});
