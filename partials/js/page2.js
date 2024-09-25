const swipeButton = document.getElementById('swipeButton');
const formContainer = document.getElementById('formContainer');
const swipeMessage = document.getElementById('swipeMessage');

let isDragging = false;
let startX, currentX;

swipeButton.addEventListener('mousedown', startDrag);
swipeButton.addEventListener('touchstart', startDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

const photoInput = document.getElementById('photo');
const customPhotoButton = document.getElementById('customPhotoButton');

customPhotoButton.addEventListener('click', function(e) {
    e.preventDefault();
    photoInput.click(); // Trigger input file saat tombol kustom diklik
});

photoInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        customPhotoButton.textContent = 'Input Success';
    } else {
        customPhotoButton.textContent = 'Tolong masukkan foto';
    }
});

function startDrag(event) {
    isDragging = true;
    startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
}

function drag(event) {
    if (!isDragging) return;

    currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const distance = currentX - startX;

    // Menggerakkan tombol sesuai dengan jarak geser
    swipeButton.style.transform = `translateX(${distance}px)`;

    // Menampilkan form ketika tombol sudah geser cukup
    if (distance > 100) { // 100px adalah ambang batas untuk memunculkan form
        isDragging = false; // Hentikan drag lebih lanjut
        swipeButton.classList.add('swiped'); // Tambahkan kelas animasi

        setTimeout(() => {
            swipeButton.style.display = 'none'; // Hilangkan tombol
            formContainer.style.display = 'block'; // Tampilkan form
            swipeMessage.classList.add('visible'); // Tampilkan pesan berhasil
            document.body.classList.add('no-scroll'); // Tambahkan kelas untuk mengunci layar
        }, 300); // Tunggu hingga animasi selesai sebelum menampilkan form dan pesan
    }
}

function endDrag() {
    if (isDragging) {
        isDragging = false;
        swipeButton.style.transform = 'translateX(0)'; // Kembalikan ke posisi awal jika swipe tidak berhasil
    }
}

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman saat submit

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;
    const zodiac = document.getElementById('zodiac').value;
    const photoInput = document.getElementById('photo');
    const cardTemplate = document.getElementById('cardTemplate');

    let photoURL = "";

    // Ambil URL dari foto jika ada
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            photoURL = event.target.result;
            createCard(name, address, dob, zodiac, photoURL);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        createCard(name, address, dob, zodiac, photoURL);
    }

    // Fungsi untuk mengisi card dengan data
    function createCard(name, address, dob, zodiac, photoURL) {
        const cardContainer = document.querySelector('.card-container');
    
        // Hapus kartu yang sudah ada
        while (cardContainer.firstChild) {
            cardContainer.removeChild(cardContainer.firstChild);
        }
    
        const newCard = cardTemplate.cloneNode(true); // Clone template card
        newCard.style.display = 'block'; // Tampilkan card
    
        // Atur foto menjadi kotak dan kecilkan resolusinya
        const img = new Image();
        img.src = photoURL || '';
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Tentukan ukuran kotak dengan resolusi yang lebih tinggi
            const size = 300; // Ganti ini dengan ukuran yang Anda inginkan untuk kualitas yang lebih baik
            canvas.width = size;
            canvas.height = size;
    
            // Gambar foto ke dalam canvas
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size); // Menyesuaikan gambar untuk mengisi canvas
    
            // Set gambar dari canvas ke elemen kartu
            newCard.querySelector('#cardPhoto').src = canvas.toDataURL('image/png', 1.0); // Pastikan kualitas gambar diatur ke 1.0
        };
    
        newCard.querySelector('#cardName').textContent = name; // Set nama
        newCard.querySelector('#cardAddress').textContent = address; // Set alamat
        newCard.querySelector('#cardDOB').textContent = dob; // Set tanggal lahir
        newCard.querySelector('#cardZodiac').textContent = zodiac; // Set zodiak
    
        cardContainer.appendChild(newCard); // Tambahkan card ke cardContainer
    
        // Reset form setelah submit
        document.getElementById('userForm').reset();
        document.getElementById('customPhotoButton').textContent = 'Input Foto'; // Reset teks tombol foto
        
        // Sembunyikan form setelah data berhasil dikirim
        document.getElementById('formContainer').style.display = 'none';
    
        // Otomatis mendownload card sebagai PNG
        setTimeout(() => {
            downloadCardAsPNG(newCard);
        }, 500);
    }
    
});

// Fungsi untuk mendownload card sebagai PNG
function downloadCardAsPNG(cardElement) {
    // Increase the scale for better quality on mobile
    const scale = window.innerWidth < 600 ? 3 : 2; // Scale of 3 for mobile, 2 for larger screens
    html2canvas(cardElement, { scale: scale }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Creating a link to download the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'card.png'; // Name of the file to download
        link.click(); // Programmatically click the link to trigger download
    });
}

// Fungsi untuk memperbarui waktu
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString([], options);
    document.getElementById('currentTime').textContent = ` Pembuatan Kartu: ${timeString}`;
}

// Panggil fungsi untuk memperbarui waktu setiap detik
setInterval(updateTime, 1000);
updateTime();
