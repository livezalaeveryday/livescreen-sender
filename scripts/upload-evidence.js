const fs = require('fs');
const path = require('path');

const apiUrl = process.env.PAPERCLIP_API_URL || 'http://127.0.0.1:3100';
const apiKey = process.env.PAPERCLIP_API_KEY;
const companyId = process.env.PAPERCLIP_COMPANY_ID || '86f22ae7-2a66-4927-93f0-1692998afb8f';
const taskId = process.env.PAPERCLIP_TASK_ID || '3ba6825c-7388-479e-97c0-0379678952a7';
const runId = process.env.PAPERCLIP_ACTIVE_RUN_ID || '6a94b35f-5d64-4bb0-a99d-97154e47c3a5';

if (!apiKey) {
  console.error('Missing PAPERCLIP_API_KEY');
  process.exit(1);
}

const deliverablesDir = 'F:\\PaperClip\\deliverables';

async function uploadAttachment(filePath, contentType) {
  const fileName = path.basename(filePath);
  const fileBytes = fs.readFileSync(filePath);
  const blob = new Blob([fileBytes], { type: contentType });

  const formData = new FormData();
  formData.append('file', blob, fileName);

  console.log(`Uploading ${fileName} (${fileBytes.length} bytes)...`);
  const res = await fetch(`${apiUrl}/api/companies/${companyId}/issues/${taskId}/attachments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'X-Paperclip-Run-Id': runId,
    },
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed for ${fileName} (${res.status}): ${errText}`);
  }

  const attachment = await res.json();
  console.log(`Uploaded attachment ${fileName}: ID = ${attachment.id}`);
  return attachment;
}

async function createWorkProduct(attachmentId, title, summary, isPrimary = false) {
  const payload = {
    type: 'artifact',
    provider: 'paperclip',
    title,
    status: 'ready_for_review',
    reviewState: 'needs_board_review',
    isPrimary,
    summary,
    metadata: { attachmentId },
  };

  const res = await fetch(`${apiUrl}/api/issues/${taskId}/work-products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'X-Paperclip-Run-Id': runId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Create work product failed (${res.status}): ${errText}`);
  }

  const wp = await res.json();
  console.log(`Created work product: ${wp.id} - ${title}`);
  return wp;
}

async function main() {
  console.log('>>> Starting deliverables upload to task FSD-39...');

  const manifest = [];

  // 1. Upload APK Parts (6 parts)
  for (let i = 1; i <= 6; i++) {
    const partNum = String(i).padStart(2, '0');
    const partFileName = `livescreen-sender-part${partNum}.zip`;
    const partFilePath = path.join(deliverablesDir, partFileName);
    if (fs.existsSync(partFilePath)) {
      const stats = fs.statSync(partFilePath);
      const att = await uploadAttachment(partFilePath, 'application/zip');
      const wp = await createWorkProduct(
        att.id,
        `Live Screen Sender Release APK - ส่วนที่ ${i}/6 (${partFileName})`,
        `ไฟล์ติดตั้ง APK ส่วนที่ ${i}/6 (ขนาด ${(stats.size / 1024 / 1024).toFixed(2)} MB) รวมไฟล์ด้วยคำสั่ง: copy /b livescreen-sender-part*.zip LiveScreen-Sender-release.apk`,
        i === 1
      );
      manifest.push({ type: 'apk_part', part: i, file: partFileName, size: stats.size, attachmentId: att.id, workProductId: wp.id });
    }
  }

  // 2. Upload Screenshots
  const screenshots = [
    { file: 'livescreen_01_tv_discovery.png', title: 'Live Screen — หน้าค้นหาและรายชื่อทีวี AirPlay (Discovery Screen)' },
    { file: 'livescreen_02_settings_video.png', title: 'Live Screen — หน้าจอตั้งค่าความละเอียดและบิตเรต (Settings Screen)' },
  ];

  for (const s of screenshots) {
    const filePath = path.join(deliverablesDir, s.file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const att = await uploadAttachment(filePath, 'image/png');
      const wp = await createWorkProduct(att.id, s.title, `ภาพหน้าจอตัวจริงจาก Android Emulator (API 37): ${s.title}`);
      manifest.push({ type: 'screenshot', file: s.file, size: stats.size, attachmentId: att.id, workProductId: wp.id });
    }
  }

  // 3. Upload Video Clip
  const clipFile = 'livescreen_clip_01_discovery_interaction.mp4';
  const clipPath = path.join(deliverablesDir, clipFile);
  if (fs.existsSync(clipPath)) {
    const stats = fs.statSync(clipPath);
    const att = await uploadAttachment(clipPath, 'video/mp4');
    const wp = await createWorkProduct(
      att.id,
      'Live Screen — คลิปวิดีโอทดสอบการใช้งานจริงบนเครื่อง (Screen Recording MP4)',
      'คลิปวิดีโออัดหน้าจอการเปิดแอป Live Screen, การค้นหาทีวีในวง Wi-Fi, และการเข้าหน้าตั้งค่าความละเอียดวิดีโอบนเครื่อง Android จริง'
    );
    manifest.push({ type: 'video', file: clipFile, size: stats.size, attachmentId: att.id, workProductId: wp.id });
  }

  fs.writeFileSync(path.join(deliverablesDir, 'livescreen-sender-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('>>> All deliverables uploaded and work products registered successfully!');
}

main().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
