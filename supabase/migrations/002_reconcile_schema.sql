-- ============================================================
-- KUYKUY GROUP — Migration 002: Reconcile schema with app code
-- Jalankan SELURUH file ini di Supabase SQL Editor (sekali jalan)
--
-- Tujuan: kode halaman (Layanan, Cabang, Beranda, Booking) butuh kolom
-- price_idr, duration_minutes, sort_order, slug, icon (services) dan
-- map_url, sort_order (branches). Migration ini menambahkan kolom tsb,
-- mengisi (backfill) dari kolom lama, lalu menambahkan 5 cabang baru.
-- Aman dijalankan ulang (idempotent).
-- ============================================================

-- ── SERVICES: tambah kolom yang dibutuhkan kode ────────────────────────────
alter table services add column if not exists slug             text;
alter table services add column if not exists price_idr        integer;
alter table services add column if not exists duration_minutes integer;
alter table services add column if not exists icon             text;
alter table services add column if not exists sort_order       integer default 0;

-- Backfill price_idr dari kolom lama "price" bila masih kosong
update services set price_idr = price where price_idr is null;

-- Isi atribut tampilan per layanan (berdasarkan nama seed migration 001)
update services set slug = 'pijat-aromaterapi',   icon = 'leaf',     duration_minutes = 60, sort_order = 1 where name = 'Pijat Aromaterapi';
update services set slug = 'pijat-batu-panas',    icon = 'flame',    duration_minutes = 90, sort_order = 2 where name = 'Pijat Batu Panas';
update services set slug = 'pijat-premium-wajah', icon = 'sparkles', duration_minutes = 60, sort_order = 3 where name = 'Pijat Premium Wajah';
update services set slug = 'manikur-pedikur',     icon = 'hand',     duration_minutes = 60, sort_order = 4 where name = 'Manikur & Pedikur';

-- Default aman untuk baris lain yang belum terisi
update services set duration_minutes = 60 where duration_minutes is null;
update services set icon = 'leaf'         where icon is null;

-- ── BRANCHES: tambah kolom map_url + sort_order ────────────────────────────
alter table branches add column if not exists map_url    text;
alter table branches add column if not exists sort_order integer default 0;

-- Backfill map_url dari kolom lama "maps_url"
update branches set map_url = maps_url where map_url is null;

-- Urutan tampilan 6 cabang awal
update branches set sort_order = 1 where name = 'KUY BM';
update branches set sort_order = 2 where name = 'KUY BETOS';
update branches set sort_order = 3 where name = 'CRYSTAL KUY';
update branches set sort_order = 4 where name = 'KUY STORY';
update branches set sort_order = 5 where name = 'XI-KUY';
update branches set sort_order = 6 where name = 'Strawberry Spa & Therapy';

-- ── BRANCHES: 5 cabang baru (hanya insert bila belum ada) ──────────────────
insert into branches (name, address, maps_url, map_url, phone, sort_order, active)
select * from (values
  ('V PHOENIX',   'Plaza Amsterdam, Jl. MH. Thamrin No.57 Blok A.21, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16710',                     'https://maps.app.goo.gl/4z7PPgg5myAM4TCE7', 'https://maps.app.goo.gl/4z7PPgg5myAM4TCE7', null, 7,  true),
  ('SIERRA',      'Ruko Podium, Jl. Mataram Blok B.1 & B.2, Cibatu, Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530',                                    'https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7', 'https://maps.app.goo.gl/m6dRvP9BxcfGB1pT7', null, 8,  true),
  ('VIERZHEN',    'Jl. Niaga Raya Ruko CBD Jababeka Kav AA3 Blok A88, Pasirsari, Kec. Cikarang Selatan, Kabupaten Bekasi, Jawa Barat 17530',                   'https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8', 'https://maps.app.goo.gl/Dw31k7BnjPSJ8Xuw8', null, 9,  true),
  ('MIRACLE KUY', 'Ruko Cibinong Center, Blok E No.7, Pakansari, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16915',                                          'https://maps.app.goo.gl/TfF55aGh7N4TPEXC6', 'https://maps.app.goo.gl/TfF55aGh7N4TPEXC6', null, 10, true),
  ('INFINITY',    'Ruko Plaza Amsterdam City, Blok C8, Sentul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810',                                       'https://maps.app.goo.gl/fYaPmGRKddJkLjbg8', 'https://maps.app.goo.gl/fYaPmGRKddJkLjbg8', null, 11, true)
) as v(name, address, maps_url, map_url, phone, sort_order, active)
where not exists (select 1 from branches b where b.name = v.name);
