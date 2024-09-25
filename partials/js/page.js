let currentModal = 0;
const data = {};

function showModal(event) {
    event.preventDefault();
    data.name = document.getElementById('name').value;
    data.tanggal = document.getElementById('tanggal').value;
    data.bulan = document.getElementById('bulan').value;
    data.harapan = document.getElementById('harapan').value;
    data.zodiak = document.getElementById('zodiak').value;

    currentModal = 0; // Reset modal
    openModal();
    nextModal();
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    currentModal = 0; // Reset for next use
}

function typeText(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ''; // Kosongkan elemen sebelumnya
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback(); // Panggil callback setelah selesai
        }
    }
    type();
}

function nextModal() {
    const modalBody = document.getElementById('modal-body');
    const nextButton = document.getElementById('next-button');

    nextButton.style.display = 'none'; // Sembunyikan tombol di awal

    switch (currentModal) {
        case 0:
            typeText(modalBody, `Hai ${data.name}, sungguh sebuah nama yang indah.`, 50, () => {
                nextButton.style.display = 'block'; // Tampilkan tombol setelah teks selesai
            });
            break;
        case 1:
            typeText(modalBody, `Kamu Berulang tahun pada tanggal ${data.tanggal} ${data.bulan}, sungguh waktu yang baik!`, 50, () => {
                nextButton.style.display = 'block';
            });
            break;
        case 2:
            typeText(modalBody, `Harapan kamu adalah ${data.harapan}. Itu adalah harapan yang bagus, semoga harapan kamu bisa cepat terkabul ya.`, 50, () => {
                nextButton.style.display = 'block';
            });
            break;
        case 3:
            typeText(modalBody, `Okei untuk zodiak kamu itu adalah ${data.zodiak}, aku punya ramalan buat kamu:`, 60, () => {
                modalBody.innerHTML += `
                    <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr style="background-color: #FF90BC; color: white;">
                                <th style="padding: 10px; border: 1px solid #ddd;">Aspek</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">Ramalan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">Profil</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${getRandomProfile(data.zodiak)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">Kesehatan</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${getRandomHealth(data.zodiak)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;">Cinta</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${getRandomLove(data.zodiak)}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
                nextButton.style.display = 'block'; // Tampilkan tombol setelah tabel
            });
            break;
        case 4:
            modalBody.innerHTML = `
                <p>Ini adalah ringkasan data yang kamu masukkan:</p>
                <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #FF90BC; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Field</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;">Nama</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;">Tanggal</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.tanggal} ${data.bulan}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;">Harapan</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.harapan}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;">Zodiak</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${data.zodiak}</td>
                        </tr>
                    </tbody>
                </table>`;
                nextButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8.293l-2.646-2.646a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L12.293 8.5H4a.5.5 0 0 1-.5-.5z"/>
                </svg>`;
            nextButton.setAttribute('onclick', 'window.location.href = "/page/page1.html";');
            nextButton.style.display = 'block'; // Tampilkan tombol setelah tabel
            
            break;
        default:
            closeModal();
            return;
    }

    currentModal++;
}

function getRandomPrediction(zodiac) {
    const predictions = zodiacPredictions[zodiac];
    const randomIndex = Math.floor(Math.random() * predictions.length);
    return predictions[randomIndex];
}

function getRandomProfile(zodiac) {
    const profiles = {
        Aries: [
            "Kamu adalah pemimpin alami, berani dan penuh semangat.",
            "Kamu memiliki energi yang tinggi dan selalu siap untuk tantangan baru.",
            "Keberanianmu membuatmu dicintai oleh banyak orang.",
            "Sifat kompetitifmu mendorongmu untuk mencapai yang terbaik.",
            "Kamu mudah beradaptasi dan cepat belajar.",
            "Kamu suka tantangan dan tidak takut untuk mengambil risiko.",
        ],
        Taurus: [
            "Kamu memiliki ketahanan dan cinta terhadap kenyamanan.",
            "Sifat praktismu membantu dalam membuat keputusan yang baik.",
            "Kamu adalah teman yang setia dan selalu siap membantu.",
            "Kamu menghargai keindahan dan seni dalam hidupmu.",
            "Kamu menyukai kenyamanan dan stabilitas dalam hubungan.",
            "Sifat sabar membuatmu dapat menghadapi tantangan dengan tenang.",
        ],
        Gemini: [
            "Kamu adalah komunikator yang hebat, selalu ingin belajar.",
            "Sifatmu yang adaptif membuatmu mudah bergaul dengan siapa saja.",
            "Kamu memiliki pikiran yang kreatif dan imajinatif.",
            "Kamu cepat berubah dan tidak mudah bosan.",
            "Sifat penasaran membuatmu selalu mencari pengetahuan baru.",
            "Kamu memiliki kemampuan untuk melihat berbagai sisi suatu masalah.",
        ],
        Cancer: [
            "Kamu sangat intuitif dan peduli terhadap orang lain.",
            "Sifat empati membuatmu menjadi teman yang baik.",
            "Kamu menghargai keluarga dan hubungan emosional.",
            "Kamu bisa menjadi pelindung bagi orang-orang terdekatmu.",
            "Sifat sensitifmu membuatmu peka terhadap perasaan orang lain.",
            "Kamu memiliki kemampuan untuk menciptakan suasana hangat di sekitarmu.",
        ],
        Leo: [
            "Kamu memiliki karisma dan daya tarik yang luar biasa.",
            "Kepercayaan dirimu membuatmu bersinar di keramaian.",
            "Kamu suka menjadi pusat perhatian dan memimpin.",
            "Sifat loyalitasmu terhadap teman-teman sangat kuat.",
            "Kamu selalu berusaha untuk membuat orang lain merasa istimewa.",
            "Kreativitasmu dapat membuatmu menonjol dalam berbagai hal.",
        ],
        Virgo: [
            "Kamu teliti dan sangat perhatian terhadap detail.",
            "Sifat analitis membuatmu hebat dalam memecahkan masalah.",
            "Kamu selalu berusaha untuk mencapai kesempurnaan.",
            "Kamu cenderung praktis dan efisien dalam segala hal.",
            "Sifat kritismu membantu meningkatkan kualitas di sekitarmu.",
            "Kamu suka membantu orang lain dengan cara yang konkret.",
        ],
        Libra: [
            "Kamu mencari keseimbangan dan harmoni dalam hidup.",
            "Sifat sosialmu membuatmu mudah bergaul dengan orang lain.",
            "Kamu adalah mediator yang baik dalam konflik.",
            "Kamu menghargai keadilan dan persahabatan.",
            "Sifat diplomatismu membuatmu disukai banyak orang.",
            "Kamu memiliki selera estetika yang tinggi.",
        ],
        Scorpio: [
            "Kamu sangat intens dan penuh gairah.",
            "Keberanianmu membuatmu tidak takut menghadapi kebenaran.",
            "Sifat misteriusmu menarik perhatian orang lain.",
            "Kamu memiliki ketajaman intuitif yang luar biasa.",
            "Sifat loyalitasmu membuatmu menjadi teman sejati.",
            "Kamu mampu memahami emosi orang lain dengan mendalam.",
        ],
        Sagittarius: [
            "Kamu adalah petualang sejati, suka menjelajah.",
            "Sifat optimis membuatmu selalu melihat sisi positif.",
            "Kamu menghargai kebebasan dan kemandirian.",
            "Kamu memiliki semangat untuk belajar dan tumbuh.",
            "Sifat ceria membuatmu mudah didekati oleh orang lain.",
            "Kamu suka berbagi pengalaman dengan orang lain.",
        ],
        Capricorn: [
            "Kamu sangat disiplin dan pekerja keras.",
            "Sifat ambisius membuatmu selalu berusaha mencapai tujuan.",
            "Kamu adalah pengatur yang baik dan bertanggung jawab.",
            "Kamu memiliki pandangan jangka panjang yang jelas.",
            "Sifat praktis dan realistis membuatmu sukses dalam pekerjaan.",
            "Kamu suka membantu orang lain mencapai impian mereka.",
        ],
        Aquarius: [
            "Kamu inovatif dan suka berpikir di luar kotak.",
            "Sifat independen membuatmu tidak terikat oleh norma-norma sosial.",
            "Kamu peduli pada isu-isu kemanusiaan.",
            "Kamu memiliki ide-ide unik yang menginspirasi orang lain.",
            "Sifat eksentrikmu membuatmu berbeda dari yang lain.",
            "Kamu menyukai kebebasan untuk mengekspresikan dirimu.",
        ],
        Pisces: [
            "Kamu sangat kreatif dan penuh imajinasi.",
            "Sifat empatik membuatmu sensitif terhadap perasaan orang lain.",
            "Kamu memiliki daya tarik spiritual dan artistik.",
            "Kamu cenderung melamun dan berpikir jauh.",
            "Sifat intuitifmu membantumu memahami orang lain.",
            "Kamu suka berbagi kreativitas melalui seni.",
        ],
    };
    return profiles[zodiac][Math.floor(Math.random() * profiles[zodiac].length)];
}

function getRandomHealth(zodiac) {
    const healthTips = {
        Aries: [
            "Jaga kesehatan mentalmu, cobalah meditasi.",
            "Olahraga secara teratur akan menjaga energimu tetap tinggi.",
            "Hindari stres dengan menghabiskan waktu di alam.",
            "Pastikan untuk tidur yang cukup agar tetap bugar.",
            "Cobalah untuk minum cukup air setiap hari.",
            "Perhatikan pola makanmu untuk energi yang seimbang.",
        ],
        Taurus: [
            "Fokus pada pola makan sehat, terutama sayuran dan buah-buahan.",
            "Jaga kesehatanmu dengan tidur cukup.",
            "Cobalah yoga untuk relaksasi.",
            "Luangkan waktu untuk berjalan-jalan di alam.",
            "Hindari kebiasaan buruk yang bisa merugikan kesehatan.",
            "Buat jadwal rutin untuk pemeriksaan kesehatan.",
        ],
        Gemini: [
            "Aktivitas fisik yang menyenangkan akan membantumu.",
            "Jaga keseimbangan antara kerja dan istirahat.",
            "Bicaralah dengan teman untuk menjaga kesehatan mental.",
            "Cobalah untuk mengatur waktu dengan baik.",
            "Luangkan waktu untuk beristirahat agar tidak kelelahan.",
            "Penting untuk tetap terhidrasi sepanjang hari.",
        ],
        Cancer: [
            "Perhatikan kesehatan emosionalmu, berbicaralah jika perlu.",
            "Luangkan waktu untuk diri sendiri agar lebih tenang.",
            "Berikan perhatian pada pola tidurmu.",
            "Cobalah terapi atau konseling jika diperlukan.",
            "Jaga hubungan baik dengan orang terdekat untuk dukungan.",
            "Praktikkan teknik relaksasi seperti pernapasan dalam.",
        ],
        Leo: [
            "Olahraga teratur bisa meningkatkan mood.",
            "Jaga pola makan dengan nutrisi seimbang.",
            "Cobalah aktivitas sosial untuk menjaga kebahagiaan.",
            "Luangkan waktu untuk melakukan hal yang kamu cintai.",
            "Penting untuk menjaga kesehatan mental dengan bersosialisasi.",
            "Tetap aktif dengan mengikuti kelas atau hobi baru.",
        ],
        Virgo: [
            "Pastikan untuk cukup tidur dan istirahat.",
            "Lakukan pemeriksaan kesehatan rutin.",
            "Atur waktu dengan baik untuk menghindari stres.",
            "Cobalah untuk makan dengan porsi kecil namun sering.",
            "Luangkan waktu untuk berolahraga agar tetap bugar.",
            "Fokus pada kesehatan mental dan fisik secara seimbang.",
        ],
        Libra: [
            "Hindari stres dengan aktivitas relaksasi.",
            "Jaga keseimbangan emosional dengan meditasi.",
            "Cobalah untuk menjadwalkan waktu untuk diri sendiri.",
            "Pertahankan rutinitas olahraga yang menyenangkan.",
            "Perhatikan pola makan agar tetap sehat.",
            "Buat waktu untuk hobi yang menyenangkan.",
        ],
        Scorpio: [
            "Jaga kesehatan jantung dengan olahraga.",
            "Perhatikan pola makan, hindari makanan berlemak.",
            "Luangkan waktu untuk meditasi dan refleksi.",
            "Cobalah untuk mengurangi kebiasaan buruk.",
            "Tetap terhidrasi dengan cukup air.",
            "Jaga kesehatan mental dengan berbagi perasaan.",
        ],
        Sagittarius: [
            "Cobalah aktivitas luar ruangan untuk kesehatan yang lebih baik.",
            "Jaga kebugaran dengan berolahraga secara teratur.",
            "Pertimbangkan untuk melakukan perjalanan untuk menyegarkan pikiran.",
            "Luangkan waktu untuk bersantai di alam.",
            "Pastikan untuk menjaga hubungan sosial yang sehat.",
            "Cobalah olahraga baru untuk menjaga semangat.",
        ],
        Capricorn: [
            "Jaga kesehatan dengan diet seimbang.",
            "Luangkan waktu untuk berolahraga secara teratur.",
            "Penting untuk menjaga kesehatan mentalmu dengan relaksasi.",
            "Buat rencana kesehatan yang realistis dan teratur.",
            "Jaga keseimbangan antara pekerjaan dan waktu pribadi.",
            "Fokus pada pencapaian tujuan kesehatan jangka panjang.",
        ],
        Aquarius: [
            "Inovasi dalam gaya hidup sehat akan membantumu.",
            "Cobalah aktivitas baru yang menantang fisik.",
            "Pastikan untuk bersosialisasi untuk menjaga kesehatan mental.",
            "Luangkan waktu untuk melakukan hobi yang kamu cintai.",
            "Tetap aktif dengan bergabung dalam komunitas.",
            "Cobalah untuk mengikuti rutinitas olahraga yang bervariasi.",
        ],
        Pisces: [
            "Temukan hobi baru untuk meredakan stres.",
            "Jaga kesehatan dengan berolahraga secara teratur.",
            "Luangkan waktu untuk berkreativitas dan bersantai.",
            "Berikan perhatian pada kesehatan emosionalmu.",
            "Cobalah meditasi untuk meningkatkan ketenangan pikiran.",
            "Penting untuk menjaga hubungan yang positif dengan orang lain.",
        ],
    };
    return healthTips[zodiac][Math.floor(Math.random() * healthTips[zodiac].length)];
}

function getRandomLove(zodiac) {
    const lovePredictions = {
        Aries: [
            "Cinta akan datang dari seseorang yang berani.",
            "Jadilah lebih terbuka dalam perasaanmu.",
            "Petualangan cinta baru menantimu.",
            "Komunikasi adalah kunci untuk hubungan yang sehat.",
            "Cobalah untuk lebih mendengarkan pasanganmu.",
            "Keberanianmu akan mengundang cinta yang baru.",
        ],
        Taurus: [
            "Hubunganmu akan semakin kuat dan stabil.",
            "Cobalah untuk lebih romantis dengan pasangan.",
            "Waktu yang berkualitas akan memperkuat hubungan.",
            "Kesabaranmu akan membawa hasil dalam cinta.",
            "Cinta akan tumbuh dari kepercayaan yang dibangun.",
            "Sifat praktismu akan membantu dalam merawat hubungan.",
        ],
        Gemini: [
            "Komunikasi yang baik adalah kunci dalam cinta.",
            "Buka diri terhadap ide-ide baru dalam hubungan.",
            "Cinta bisa muncul dari pertemanan yang sudah ada.",
            "Jangan ragu untuk berbagi perasaanmu.",
            "Kreativitasmu akan membawa kesenangan dalam hubungan.",
            "Jadilah fleksibel dalam menghadapi tantangan cinta.",
        ],
        Cancer: [
            "Cobalah lebih terbuka dalam hubunganmu.",
            "Perhatian dan kasih sayang akan membuat hubungan semakin kuat.",
            "Saling mendukung satu sama lain adalah kunci kebahagiaan.",
            "Kamu akan menemukan cinta sejati dalam kehangatan.",
            "Luangkan waktu untuk mengenal pasangan lebih dalam.",
            "Cinta akan berkembang melalui pengertian dan kasih sayang.",
        ],
        Leo: [
            "Pesonamu akan menarik perhatian orang baru.",
            "Jadilah lebih percaya diri dalam menunjukkan perasaan.",
            "Cinta akan hadir saat kamu tidak mengharapkannya.",
            "Kreativitasmu dalam cinta akan membuat hubungan menarik.",
            "Jadilah penggembira bagi pasanganmu.",
            "Perhatianmu terhadap detail akan membawa kebahagiaan.",
        ],
        Virgo: [
            "Detail kecil dalam hubunganmu akan membuat perbedaan.",
            "Berkat perhatianmu, hubunganmu akan semakin harmonis.",
            "Jangan takut untuk menunjukkan kelembutanmu.",
            "Komunikasi terbuka akan memperkuat cinta.",
            "Kesederhanaan dalam cinta akan membawa kebahagiaan.",
            "Luangkan waktu untuk menikmati momen bersama pasangan.",
        ],
        Libra: [
            "Usahakan untuk menemukan keseimbangan dalam cinta.",
            "Cinta yang tulus akan membawa kebahagiaan.",
            "Penting untuk saling menghormati dalam hubungan.",
            "Jadilah pendengar yang baik untuk pasanganmu.",
            "Sifat sosialmu akan membantu dalam memperluas jaringan cinta.",
            "Cobalah untuk menciptakan momen romantis secara teratur.",
        ],
        Scorpio: [
            "Cinta akan membawa kedalaman emosional.",
            "Jangan takut untuk menunjukkan kerentananmu.",
            "Hubungan yang kuat akan berkembang seiring waktu.",
            "Kamu akan menemukan keintiman yang lebih dalam.",
            "Perasaan yang kuat akan membawa kebahagiaan.",
            "Cobalah untuk lebih terbuka dalam berbagi perasaan.",
        ],
        Sagittarius: [
            "Petualangan baru dalam cinta menantimu.",
            "Jadilah terbuka untuk kemungkinan baru dalam cinta.",
            "Cinta bisa ditemukan di tempat yang tak terduga.",
            "Jadilah optimis dalam mencari cinta.",
            "Luangkan waktu untuk menjelajahi bersama pasangan.",
            "Kemandirianmu akan menarik pasangan yang tepat.",
        ],
        Capricorn: [
            "Keseriusan dalam hubungan akan membuahkan hasil.",
            "Kamu dan pasangan akan saling mendukung dalam mencapai tujuan.",
            "Cinta yang stabil membawa kebahagiaan sejati.",
            "Jaga komitmen dan tanggung jawab dalam hubungan.",
            "Luangkan waktu untuk merencanakan masa depan bersama.",
            "Cobalah untuk lebih romantis dalam rutinitas sehari-hari.",
        ],
        Aquarius: [
            "Kemandirianmu akan menarik pasangan yang tepat.",
            "Cinta yang bebas dan tanpa batasan akan membuatmu bahagia.",
            "Jadilah diri sendiri dalam hubungan.",
            "Sifat unikmu akan membuat hubunganmu menarik.",
            "Cobalah untuk lebih terbuka terhadap ide-ide baru dalam cinta.",
            "Luangkan waktu untuk berbagi visi dan mimpi dengan pasangan.",
        ],
        Pisces: [
            "Kreativitasmu akan membuat hubunganmu lebih menarik.",
            "Cinta bisa datang dari hubungan yang sudah ada.",
            "Perasaan yang dalam akan membawa kebahagiaan.",
            "Sifat empatikmu akan membuat pasangan merasa dicintai.",
            "Luangkan waktu untuk berbagi momen romantis.",
            "Cobalah untuk lebih terbuka dalam berbagi perasaanmu.",
        ],
    };
    return lovePredictions[zodiac][Math.floor(Math.random() * lovePredictions[zodiac].length)];
}
