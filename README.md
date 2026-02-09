# Service Platform JS

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir hizmet platformudur. Kullanıcıların hizmet (baskı, tasarım vb.) satın alabileceği, stüdyoların hizmet verebileceği pazar yeri sistemidir.

## 🚀 Teknolojiler

Bu proje **Monorepo** benzeri bir yapıda hem Backend hem Frontend'i içerir:

### Backend
*   **NestJS**: Node.js framework'ü (scalable server-side applications).
*   **Prisma**: Yeni nesil ORM (Veritabanı yönetimi).
*   **PostgreSQL**: Veritabanı.
*   **Passport.js**: Authentication (Google OAuth & JWT).
*   **Swipe**: API dokümantasyonu.

### Frontend
*   **React**: UI kütüphanesi.
*   **Vite**: Hızlı build aracı.
*   **TypeScript**: Tip güvenliği için hem backend hem frontend'de kullanıldı.
*   **CSS**: Özel modern tasarım (Django projesinden uyarlandı).

---

## 🛠️ Kurulum Rehberi

Projeyi bilgisayarınıza kurmak ve çalıştırmak için aşağıdaki adımları takip edin.

### Ön Hazırlıklar

*   [Node.js](https://nodejs.org/) (v16 veya üzeri)
*   [Git](https://git-scm.com/)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
cd service_platform_js
```

### 2. Backend Kurulumu

Backend klasörüne gidin ve bağımlılıkları yükleyin:

```bash
cd backend
npm install
```

#### Çevre Değişkenleri (.env)

`backend` klasörü içinde `.env` dosyası oluşturun ve aşağıdaki değerleri kendinize göre düzenleyin:

```env
# Veritabanı Bağlantısı (Örnek)
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/veritabani_adi?schema=public"

# Google OAuth (Google Cloud Console'dan alınacak)
GOOGLE_CLIENT_ID="google_client_id_buraya"
GOOGLE_CLIENT_SECRET="google_client_secret_buraya"

# JWT Gizli Anahtarı (Rastgele bir string)
JWT_SECRET="gizli_anahtarim"
```

> **Not:** `.env.example` dosyasına bakarak gerekli tüm değişkenleri görebilirsiniz.

#### Veritabanı Kurulumu

```bash
# Veritabanı şemasını oluştur ve uygula
npx prisma migrate dev --name init

# (Opsiyonel) Veritabanı görselleştiriciyi aç
npx prisma studio
```

#### Backend'i Başlatma

```bash
npm start
# veya geliştirme modunda (dosya değişimlerini izler):
npm run start:dev
```
Backend varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

### 3. Frontend Kurulumu

Yeni bir terminal açın ve root dizinden frontend klasörüne gidin:

```bash
cd frontend
npm install
```

#### Frontend'i Başlatma

```bash
npm run dev
```
Frontend varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

---

## 🌟 Özellikler

*   **Google ile Giriş (OAuth):** Kullanıcılar Google hesaplarıyla hızlıca giriş yapabilir.
*   **JWT Authentication:** Güvenli oturum yönetimi.
*   **Rol Yönetimi:** Müşteri ve Satıcı (Stüdyo) rolleri.
*   **Modern UI:** Özel tasarımlı, responsive arayüz.
*   **Harita Entegrasyonu:** Stüdyoları harita üzerinde görüntüleme.

## 🤝 Katkıda Bulunma

1.  Bu repoyu Fork'layın.
2.  Yeni bir Branch oluşturun (`git checkout -b ozellik/YeniOzellik`).
3.  Değişikliklerinizi Commit yapın (`git commit -m 'Yeni özellik eklendi'`).
4.  Branch'inizi Push yapın (`git push origin ozellik/YeniOzellik`).
5.  Bir Pull Request (PR) oluşturun.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
