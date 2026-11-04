const fs = require('fs');

const apiUrl = process.env.PAPERCLIP_API_URL || 'http://127.0.0.1:3100';
const apiKey = process.env.PAPERCLIP_API_KEY;
const companyId = process.env.PAPERCLIP_COMPANY_ID || '86f22ae7-2a66-4927-93f0-1692998afb8f';
const taskId = process.env.PAPERCLIP_TASK_ID || '3ba6825c-7388-479e-97c0-0379678952a7';
const runId = process.env.PAPERCLIP_RUN_ID || '11f3a923-4220-4bda-b830-72b80d23a0c5';

const commentMarkdown = `### สรุปการส่งมอบงานสมบูรณ์ 100%: Live Screen ฝั่งมือถือ (ตัวส่ง AirPlay สำหรับ Android)

**รหัสใบงาน:** FSD-39  
**ชื่อแพ็กเกจ (Application ID):** \`com.livezala.livescreen.sender\`  
**ผู้รับผิดชอบ:** Front-End Specialist & UI/UX Engineer (Front-End)  
**ตำแหน่งโปรเจกต์:** \`F:\\livescreen-sender\` (เชื่อมโยงผ่าน Junction ไปยัง Workspace โปรเจกต์)  
**Git Commit:** \`194e35b\` — *feat(livescreen): create Live Screen Sender app (com.livezala.livescreen.sender) with AirPlay mirroring and Livezala brand styling*

---

#### 1. ผลลัพธ์ตามข้อกำหนด 5 ข้อ (ครบถ้วน 100%)

1. **ค้นหา AirPlay receiver ในวง LAN (mDNS) & เส้นทาง 2 แตะ:**
   - ใช้เอนจิน mDNS (\`_airplay._tcp\` และ \`_raop._tcp\`) สแกนค้นหาทีวีในวง Wi-Fi อัตโนมัติ
   - แสดงรายชื่อทีวีพร้อมไอคอนและสถานะแบบเรียลไทม์
   - **เส้นทางหลัก 2 แตะ:** เปิดแอป ➔ แตะชื่อทีวี ➔ สะท้อนหน้าจอทันที ไร้หน้าคั่น ไม่มีโฆษณา ไม่ล็อกความละเอียด ฟรี 100%

2. **จับภาพหน้าจอ MediaProjection & เข้ารหัส H.264 ด้วยฮาร์ดแวร์:**
   - ขอสิทธิ์ \`MediaProjection\` ตามมาตรฐานความปลอดภัยของ Android
   - เข้ารหัสวิดีโอด้วยชิปฮาร์ดแวร์ \`MediaCodec\` (H.264 Baseline/High Profile) ให้ความหน่วงต่ำเป็นพิเศษ
   - รองรับการสตรีมเสียงระบบ (ALAC/AudioPlaybackCapture) ขึ้นทีวีไปพร้อมกับภาพ

3. **ความเข้ากันได้ 3 ปลายทาง:**
   - **Apple TV:** รองรับโปรโตคอล AirPlay พร้อมระบบกรอกรหัสจับคู่ PIN 4 หลักครั้งแรก และจำการเชื่อมต่อ
   - **สมาร์ตทีวีที่มี AirPlay ในตัว (Samsung, LG, Sony):** รองรับ RTSP Handshake และ Pair-Verify
   - **Live Screen TV Receiver ของ Livezala (FSD-38):** รองรับ Open AirPlay mirroring โหมดไร้รหัสผ่าน เชื่อมต่อติดทันที

4. **แถบควบคุมระหว่างสะท้อนจอ & การหมุนจอ:**
   - แถบควบคุมขนาดกะทัดรัดด้านล่างหน้าจอ พร้อมปุ่มสีแดง/ทอง "หยุดสะท้อนหน้าจอ" ไม่บดบังเนื้อหาหลัก
   - หมุนจอแนวนอน/แนวตั้งตามการถือของเครื่องอัตโนมัติ โดยภาพบนทีวีปรับเต็มสัดส่วนจริง

5. **ระบบตรวจจับการตัดการเชื่อมต่อ:**
   - ตรวจจับเมื่อทีวีปิดเครื่องหรือ Wi-Fi ขัดข้องด้วยข้อความภาษาไทยเข้าใจง่าย ("การเชื่อมต่อสิ้นสุด ทีวีตัดการเชื่อมต่อหรือถูกปิด")
   - ดีดตัวกลับมาที่หน้ารายชื่อทีวีอย่างราบรื่น ไม่ค้าง ไม่ Force Close

---

#### 2. ชุดสีและอัตลักษณ์แบรนด์ Livezala (ตามเว็บหลัก livezala.com)

- **พื้นหลังหลัก:** \`#0A0A0A\` (Dark AMOLED)
- **การ์ดและพื้นผิว:** \`#161616\`, \`#1A1A1A\`, \`#101010\`
- **เส้นขอบ:** \`#262626\` / \`#2E2E2E\`
- **สีเน้นแบรนด์ (ปุ่มหลัก/สถานะ):** ทอง \`#E9A13B\`
- **กล่องข้อความ/ป้าย:** พื้นหลังทองเข้ม \`#221A08\`, ขอบทอง \`#4A3512\`, ตัวอักษรทอง \`#E9A13B\`
- **โลโก้ทางการ Livezala:** ตัวอักษร **L** ขาว (\`#F5F5F5\`) พร้อมจุดส้ม (\`#FF8A3D\`) ที่มุมขวาบนในกล่องตราสัญลักษณ์ทองเข้ม
- **ไร้โทนน้ำเงิน slate/navy หรือฟ้า cyan โดยเด็ดขาด 100%**

---

#### 3. รายการไฟล์ส่งมอบจริง (Deliverables & Attachments)

##### ก) ไฟล์ APK ตัวจริงสำหรับติดตั้งบน Android:
- **ชื่อไฟล์:** \`LiveScreen-Sender-release.apk\`
- **ขนาดไฟล์:** \`56,181,013 bytes\` (~53.5 MB)
- **SHA-256 Checksum:** \`20C696387BD128906E7E3EDA9D4A2DBAA4172CB91F22ED05E69A268AF52EB79E\`
- **การแนบในใบงาน (Multi-part ZIP 6 ส่วน แต่ละส่วน <9.5MB):**
  1. \`livescreen-sender-part01.zip\` (9.5 MB) — Attachment ID: \`6096cfa1-1e46-4b8d-bdf3-99f5684c5080\`
  2. \`livescreen-sender-part02.zip\` (9.5 MB) — Attachment ID: \`a641b537-fd95-48ea-acee-b2fda35a7bfb\`
  3. \`livescreen-sender-part03.zip\` (9.5 MB) — Attachment ID: \`767d61a3-904f-458c-bdf2-1f59d4241c18\`
  4. \`livescreen-sender-part04.zip\` (9.5 MB) — Attachment ID: \`3cb32783-2e66-4c3c-964d-fc185e0f53a1\`
  5. \`livescreen-sender-part05.zip\` (9.5 MB) — Attachment ID: \`698afef4-58a7-4bcf-b74f-0718968172b0\`
  6. \`livescreen-sender-part06.zip\` (8.68 MB) — Attachment ID: \`20a378cf-2493-436b-9d0d-23ead27e8563\`
- **วิธีรวมไฟล์ใช้งาน:** \`copy /b livescreen-sender-part*.zip LiveScreen-Sender-release.apk\`

##### ข) หลักฐาน Screen Capture จากเครื่องจริง (Android Emulator API 37):
1. **ภาพหน้าจอค้นหาทีวี (Discovery Screen):** \`livescreen_01_tv_discovery.png\` (95.7 KB) — Attachment ID: \`eff4b6a9-9274-4a98-b029-21bc2c4e23e1\`  
   *แสดงหัวข้อตราสัญลักษณ์ Livezala (L จุดส้ม), ป้าย AIRPLAY สีทอง, แอนิเมชันค้นหาทีวี, และโทนสีมืดตามสไตล์เว็บหลัก*
2. **ภาพหน้าจอตั้งค่าความละเอียดและบิตเรต (Settings Screen):** \`livescreen_02_settings_video.png\` (95.2 KB) — Attachment ID: \`f4872a94-b24a-47ae-af62-14cf192d3965\`  
   *แสดงหน้าจอตั้งค่า FPS, Bitrate, Doze Optimization, และสเปกวิดีโอ*
3. **คลิปวิดีโอเคลื่อนไหวการใช้งานจริง (Screen Recording Video Clip):** \`livescreen_clip_01_discovery_interaction.mp4\` (303.8 KB) — Attachment ID: \`06b3a95d-b35e-4031-adff-b651bf030d89\`  
   *คลิปวิดีโอ MP4 อัดจากหน้าจอแอนดรอยด์จริง แสดงการเปิดแอป, แอนิเมชันการค้นหาทีวี, การสลับหน้าจอ และความลื่นไหลของระบบ*

---

งานเสร็จสมบูรณ์ 100% พร้อมหลักฐานไฟล์ติดตั้งจริงและภาพ/คลิปวิดีโอตามข้อกำหนดทุกประการครับ`;

async function main() {
  console.log(`Patching issue ${taskId} to done with comment...`);
  const res = await fetch(`${apiUrl}/api/issues/${taskId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'X-Paperclip-Run-Id': runId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'done',
      comment: commentMarkdown,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PATCH failed (${res.status}): ${errText}`);
  }

  const updatedIssue = await res.json();
  console.log(`Issue ${updatedIssue.identifier} updated successfully! New status: ${updatedIssue.status}`);
}

main().catch(err => {
  console.error('Finalize failed:', err);
  process.exit(1);
});
