const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const apkPath = 'F:\\livescreen-sender\\app\\build\\outputs\\apk\\release\\app-release.apk';
const deliverablesDir = 'F:\\PaperClip\\deliverables';

if (!fs.existsSync(apkPath)) {
  console.error('APK not found at', apkPath);
  process.exit(1);
}

const apkBuffer = fs.readFileSync(apkPath);
const totalBytes = apkBuffer.length;
const totalSha256 = crypto.createHash('sha256').update(apkBuffer).digest('hex').toUpperCase();

console.log('APK Total Size:', totalBytes, 'bytes');
console.log('APK SHA-256:', totalSha256);

// Copy full APK to deliverables
fs.copyFileSync(apkPath, path.join(deliverablesDir, 'LiveScreen-Sender-release.apk'));

const CHUNK_SIZE = 9500000;
const totalParts = Math.ceil(totalBytes / CHUNK_SIZE);
console.log(`Splitting into ${totalParts} parts (${CHUNK_SIZE} bytes each)...`);

const partsInfo = [];

for (let i = 0; i < totalParts; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, totalBytes);
  const partBuffer = apkBuffer.subarray(start, end);
  const partNumber = String(i + 1).padStart(2, '0');
  const partFileName = `livescreen-sender-part${partNumber}.zip`;
  const partFilePath = path.join(deliverablesDir, partFileName);

  fs.writeFileSync(partFilePath, partBuffer);

  const partSha256 = crypto.createHash('sha256').update(partBuffer).digest('hex').toLowerCase();
  partsInfo.push({
    part: i + 1,
    fileName: partFileName,
    filePath: partFilePath,
    byteSize: partBuffer.length,
    sha256: partSha256,
  });

  console.log(`Part ${i + 1}/${totalParts}: ${partFileName} (${partBuffer.length} bytes) - SHA256: ${partSha256}`);
}

fs.writeFileSync(path.join(deliverablesDir, 'livescreen-parts-manifest.json'), JSON.stringify({
  apkSize: totalBytes,
  apkSha256: totalSha256,
  totalParts,
  parts: partsInfo,
}, null, 2));

console.log('Split completed successfully! Manifest saved.');
