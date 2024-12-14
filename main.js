
let pesertaCount = 1;

function tambahPeserta() {
  pesertaCount++;
  const container = document.getElementById('pesertaContainer');
  const div = document.createElement('div');
  div.classList.add('peserta');
  div.innerHTML = `
    <h3>Peserta ${pesertaCount}</h3>
    <label for="nama">Nama:</label>
    <input type="text" class="nama" placeholder="Nama Peserta" required>

    <label for="twk">TWK:</label>
    <input type="number" class="twk" placeholder="Nilai TWK" required>

    <label for="tiu">TIU:</label>
    <input type="number" class="tiu" placeholder="Nilai TIU" required>

    <label for="tkp">TKP:</label>
    <input type="number" class="tkp" placeholder="Nilai TKP" required>

    <label for="cat">CAT BKN:</label>
    <input type="number" class="cat" placeholder="Nilai CAT" required>

    <label for="ww">Wawancara:</label>
    <input type="number" class="ww" placeholder="Nilai Wawancara" required>

    <label for="mt">Microteaching:</label>
    <input type="number" class="mt" placeholder="Nilai Microteaching" required>
  `;
  container.appendChild(div);
}

function bandingkanNilai() {
const pesertaElements = document.querySelectorAll('.peserta');
const formasi = parseInt(document.getElementById('formasi').value) || 0; // Ambil jumlah formasi
const pesertaData = [];

pesertaElements.forEach((peserta) => {
const nama = peserta.querySelector('.nama').value;
const twk = parseFloat(peserta.querySelector('.twk').value) || 0;
const tiu = parseFloat(peserta.querySelector('.tiu').value) || 0;
const tkp = parseFloat(peserta.querySelector('.tkp').value) || 0;
const cat = parseFloat(peserta.querySelector('.cat').value) || 0;
const ww = parseFloat(peserta.querySelector('.ww').value) || 0;
const mt = parseFloat(peserta.querySelector('.mt').value) || 0;

const maxSKD = 550;
const maxCAT = 400;
const maxWW = 25;
const maxMT = 25;

const totalSKD = twk + tiu + tkp;
const skala100SKD = (totalSKD / maxSKD) * 100;
const skd40 = skala100SKD * 0.4;

const wwSkor = (ww / maxWW) * 10;
const mtSkor = (mt / maxMT) * 10;
const catSkor = (cat / maxCAT) * 80;
const totalSKB = wwSkor + mtSkor + catSkor;
const skb60 = totalSKB * 0.6;

const nilaiAkhir = skd40 + skb60;

pesertaData.push({
  nama,
  twk, tiu, tkp, cat, ww, mt,
  totalSKD,
  totalSKB,
  nilaiAkhir,
  status: 'Lulus', // Default "Lulus", akan diupdate berdasarkan formasi nanti
  gagal: mt < 12.5, // Tandai jika gagal karena nilai MT
});
});

// Urutkan peserta berdasarkan nilai akhir secara descending
pesertaData.sort((a, b) => b.nilaiAkhir - a.nilaiAkhir);

// Tandai peserta yang "Tidak Lulus" karena nilai MT
pesertaData.forEach((peserta) => {
if (peserta.gagal) {
  peserta.status = 'Tidak Lulus (MT < 12.5)';
}
});

// Perhatikan jumlah formasi
let lulusCount = 0;
pesertaData.forEach((peserta) => {
if (!peserta.gagal && lulusCount < formasi) {
  peserta.status = 'Lulus';
  lulusCount++;
} else if (!peserta.gagal) {
  peserta.status = 'Tidak Lulus (Di luar formasi)';
}
});

// Buat baris tabel untuk semua peserta
const pesertaLulus = pesertaData.map((peserta, index) => {
return `<tr>
  <td>${index + 1}</td>
  <td>${peserta.nama}</td>
  <td>${peserta.twk}</td>
  <td>${peserta.tiu}</td>
  <td>${peserta.tkp}</td>
  <td>${peserta.cat}</td>
  <td>${peserta.ww}</td>
  <td>${peserta.mt}</td>
  <td>${peserta.totalSKD.toFixed(2)}</td>
  <td>${peserta.totalSKB.toFixed(2)}</td>
  <td>${peserta.nilaiAkhir.toFixed(2)}</td>
  <td>${peserta.status}</td>
</tr>`;
}).join('');

// Tampilkan hasil dalam tabel
const outputDiv = document.getElementById('output');
outputDiv.style.display = 'block';
outputDiv.innerHTML = `
<h3>Hasil Perbandingan Nilai Peserta</h3>
<div class="table-container">
<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>No</th>
      <th>Nama</th>
      <th>TWK</th>
      <th>TIU</th>
      <th>TKP</th>
      <th>CAT BKN</th>
      <th>Wawancara</th>
      <th>Microteaching</th>
      <th>Total SKD</th>
      <th>Total SKB</th>
      <th>Nilai Akhir</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    ${pesertaLulus}
  </tbody>
</table>
</div>
`;
}

