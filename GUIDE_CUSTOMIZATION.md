# Apple.com Clone - Panduan Kustomisasi & Pemeliharaan

Panduan ini berisi langkah-langkah teknis untuk mengubah, memperbarui, dan memelihara codebase proyek Apple.com Clone ini.

---

## 1. Manajemen Gambar & Aset Visual
Semua gambar statis harus diletakkan di dalam direktori `public/images/`.

### Mengganti Gambar di Halaman Utama:
1.  Masukkan file gambar baru ke `public/images/`.
2.  Buka file `src/app/page.tsx`.
3.  Cari array `promos`.
4.  Ganti nilai `imageUrl` dengan path file baru Anda:
    ```tsx
    imageUrl: "/images/nama_file_anda.jpg"
    ```

### Mengganti Logo Produk:
Beberapa kartu produk menggunakan `logoUrl` (gambar PNG transparan) sebagai ganti teks. Ubah pada bagian `logoUrl` di file yang sama.

---

## 2. Mengubah Tulisan & Konten
Sebagian besar teks di halaman utama dikelola melalui "props" untuk memudahkan perubahan.

-   **Lokasi Utama:** `src/app/page.tsx`.
-   **Elemen yang bisa diubah:**
    -   `title`: Judul utama produk.
    -   `subtitle`: Teks deskripsi di bawah judul.
    -   `imageAlt`: Teks deskripsi gambar (penting untuk aksesibilitas/SEO).

---

## 3. Kustomisasi Menu Navigasi (GlobalNav)
Navigasi global dikelola di file `src/components/GlobalNav.tsx`.

### Mengubah Urutan atau Nama Menu Utama:
Cari array `navItems`. Anda bisa menambah, menghapus, atau mengganti urutan menu seperti "Store", "Mac", "iPhone", dll.

### Mengubah Isi Dropdown (Megamenu):
Cari objek `menuContent`. Setiap kategori memiliki properti:
-   `shop`: Daftar link besar di kolom pertama (teks tebal).
-   `quickLinks`: Daftar link di kolom kedua.
-   `special`: Daftar link di kolom ketiga (toko spesial).

### Pengaturan Ikon Pencarian & Tas Belanja:
-   Ikon ini bersifat **Click-to-Open** (klik untuk buka).
-   Animasi dikelola menggunakan `framer-motion` untuk efek *slide* dan *fade* yang halus.

---

## 4. Mengatur Ukuran, Jarak, & Warna (Styling)
Proyek ini menggunakan **Tailwind CSS** versi 4. Perubahan gaya dilakukan langsung pada atribut `className`.

### Ukuran Huruf (Font Size):
Cari kode seperti:
-   `text-[48px]`: Ukuran font 48 pixel.
-   `font-semibold` / `font-medium`: Ketebalan huruf.

### Jarak Antar Elemen (Spacing):
-   `gap-x-8`: Jarak horizontal antar kolom di navigasi.
-   `space-y-4`: Jarak vertikal antar baris teks.
-   `pt-12` / `pb-20`: Padding atas dan bawah (untuk mengatur posisi teks agar tidak menabrak gambar).

### Tema Warna:
Kartu produk memiliki properti `darkTheme`:
-   `darkTheme: true` -> Teks akan berwarna putih (untuk background gelap).
-   `darkTheme: false` -> Teks akan berwarna hitam (untuk background terang).

---

## 5. Struktur Folder Penting
-   `/src/app/`: File utama Next.js dan routing.
-   `/src/components/`: Kumpulan komponen UI (GlobalNav, HeroSection, PromoGrid, TvCarousel).
-   `/public/images/`: Gudang penyimpanan gambar dan logo.

---

## 6. Tips Pengembangan
-   **Build Proyek:** Jalankan `npm run build` secara berkala untuk memastikan tidak ada error pada kode sebelum di-deploy.
-   **Running Dev:** Selalu jalankan `npm run dev` saat mengedit agar perubahan terlihat langsung di `http://localhost:3000`.

---
*Dibuat oleh Antigravity AI - Panduan untuk Pemeliharaan Pixel Perfect.*
