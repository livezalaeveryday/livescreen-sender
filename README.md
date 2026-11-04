# Live Screen (Android) — ตัวส่ง AirPlay & สตรีมหน้าจอ

แอปพลิเคชันสะท้อนหน้าจอมือถือขึ้นทีวี ฟรี 100% ไม่มีโฆษณา ไม่จำกัดเวลา ไม่ล็อกความละเอียด ตามอัตลักษณ์แบรนด์ **Livezala Platform**

- **Package Name (Universal ID):** `com.livezala.livescreen`
- **Architecture:** Android Native (Kotlin 2.3+, Jetpack Compose, Material 3, Android 10+ / API 29-37)
- **AirPlay Protocol:** Screen Mirroring + RAOP + mDNS Discovery + Hardware MediaCodec H.264 + ALAC System Audio

---

## 1. จุดเด่นและการทำงาน (Features)

1. **เส้นทาง 2 แตะ (2-Tap Flow):**
   - เปิดแอป ➔ ระบบสแกนหาทีวีในวง Wi-Fi ด้วย mDNS (`_airplay._tcp`, `_raop._tcp`) อัตโนมัติ
   - แตะชื่อทีวี ➔ เริ่มสะท้อนหน้าจอทันที ไร้หน้าคั่น ไม่มีโฆษณาคั่น
2. **การเข้ารหัสระดับฮาร์ดแวร์ (Hardware MediaCodec):**
   - ดึงหน้าจอผ่าน Android `MediaProjection` API
   - ส่งตรงเข้า `VirtualDisplay` ที่ผูกกับฮาร์ดแวร์ `MediaCodec` (H.264) ให้ความหน่วงต่ำ (<150ms)
3. **รองรับ 3 ปลายทางหลัก:**
   - Apple TV (AirPlay 1 / 2 พร้อมระบบ PIN pairing)
   - Smart TVs (Samsung, LG, Sony ฯลฯ ที่มี AirPlay ในตัว)
   - Live Screen TV Receiver (`com.livezala.livescreen` บน Android TV / Google TV / Fire TV)
4. **ชุดสีและอัตลักษณ์ Livezala Brand:**
   - พื้นหลังหลัก: `#0A0A0A`
   - การ์ด/พื้นผิว: `#161616` / `#1A1A1A` / `#101010`
   - เส้นขอบ: `#262626` / `#2E2E2E`
   - สีทองเน้นแบรนด์: `#E9A13B` (พร้อมกล่องทองเข้ม `#221A08` ขอบ `#4A3512`)
   - จุดส้มโลโก้: `#FF8A3D`

---

## 2. โครงสร้างโมดูล (Module Structure)

- `:app` — หน้าจอ UI Jetpack Compose, Discovery, Settings, Device Mode Detection, Quick Settings Tile, Foreground Service
- `:airplay` — เอนจินโปรโตคอล AirPlay (mDNS, RTSP, Pair-Setup, Pair-Verify, FairPlay, ChaCha20-Poly1305, SRP6a, Plist)
- `:capture` — ระบบแคปเจอร์ภาพหน้าจอ MediaProjection, MediaCodec H.264 Encoder, ALAC Audio Encoder

---

## 3. คำสั่ง Build ซ้ำได้ (Reproducible Build)

```powershell
$env:JAVA_HOME = "C:\Users\araws\.gradle\jdks\eclipse_adoptium-17-amd64-windows.2"
$env:ANDROID_HOME = "C:\Users\araws\AppData\Local\Android\Sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"

cd "F:\livescreen-sender"
.\gradlew.bat :app:assembleRelease
```

ไฟล์ผลลัพธ์:
`F:\livescreen-sender\app\build\outputs\apk\release\app-release.apk`
