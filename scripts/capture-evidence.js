const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const deliverablesDir = 'F:\\PaperClip\\deliverables';
const brainDir = 'C:\\Users\\araws\\.gemini\\antigravity-cli\\brain\\069de346-940d-4884-8ea2-5617e0f57229';

if (!fs.existsSync(deliverablesDir)) {
  fs.mkdirSync(deliverablesDir, { recursive: true });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function adb(cmd) {
  return execSync(`adb -s emulator-5554 ${cmd}`, { encoding: 'utf-8' });
}

function takeScreenshot(filename) {
  console.log(`[Screenshot] Capturing ${filename}...`);
  const remote = `/sdcard/${filename}`;
  const localTarget = path.join(deliverablesDir, filename);
  adb(`shell screencap -p ${remote}`);
  adb(`pull ${remote} "${localTarget}"`);
  adb(`shell rm ${remote}`);
  fs.copyFileSync(localTarget, path.join(brainDir, filename));
  const stats = fs.statSync(localTarget);
  console.log(`[Screenshot] ${filename} saved: ${stats.size} bytes`);
  return { filename, path: localTarget, size: stats.size };
}

async function recordClip(clipName, durationSec, actionFn) {
  console.log(`\n========================================`);
  console.log(`[Record Clip] Starting ${clipName} (${durationSec}s)...`);
  console.log(`========================================`);
  
  const remote = `/sdcard/${clipName}`;
  const localTarget = path.join(deliverablesDir, clipName);

  const recordProc = spawn('adb', ['-s', 'emulator-5554', 'shell', 'screenrecord', '--time-limit', String(durationSec), '--bit-rate', '6000000', remote]);
  
  await sleep(1200);

  if (actionFn) {
    await actionFn();
  }

  await new Promise((resolve) => {
    recordProc.on('close', resolve);
    setTimeout(resolve, (durationSec + 2) * 1000);
  });

  console.log(`[Record Clip] Pulling ${clipName} to ${localTarget}...`);
  adb(`pull ${remote} "${localTarget}"`);
  adb(`shell rm ${remote}`);

  fs.copyFileSync(localTarget, path.join(brainDir, clipName));
  const stats = fs.statSync(localTarget);
  console.log(`[Record Clip] ${clipName} completed: ${stats.size} bytes`);
  return { filename: clipName, path: localTarget, size: stats.size };
}

async function main() {
  console.log('>>> Checking app installation...');
  const apkPath = 'F:\\livescreen-sender\\app\\build\\outputs\\apk\\release\\app-release.apk';
  if (!fs.existsSync(apkPath)) {
    console.error(`APK not found at ${apkPath}`);
    process.exit(1);
  }

  console.log('>>> Installing Live Screen Sender on emulator-5554...');
  adb(`install -r "${apkPath}"`);

  console.log('>>> Launching com.livezala.livescreen clean state...');
  adb('shell am force-stop com.livezala.livescreen');
  await sleep(1000);
  adb('shell am start -n com.livezala.livescreen/com.henry.kite.MainActivity');
  await sleep(3500);

  // 1. CAPTURE DISCOVERY SCREEN
  console.log('\n--- 1. Capturing Discovery Screen ---');
  takeScreenshot('livescreen_01_tv_discovery.png');

  // 2. OPEN SETTINGS SCREEN
  console.log('\n--- 2. Capturing Settings Screen ---');
  // Tap top right gear icon (approx x: 1000, y: 150 on typical 1080x2400)
  // Let's check window size
  const wmSize = adb('shell wm size');
  console.log('Screen size:', wmSize);
  
  adb('shell input tap 980 160');
  await sleep(2000);
  takeScreenshot('livescreen_02_settings_video.png');

  // Back to discovery screen
  adb('shell input keyevent 4');
  await sleep(1500);

  // 3. RECORD SCREEN RECORDING CLIP
  console.log('\n--- 3. Recording App Screen Video Clip ---');
  await recordClip('livescreen_clip_01_discovery_interaction.mp4', 8, async () => {
    console.log('Interacting with Live Screen UI during video capture...');
    await sleep(2000);
    // Tap settings
    adb('shell input tap 980 160');
    await sleep(2500);
    // Scroll settings
    adb('shell input swipe 500 1200 500 400 300');
    await sleep(1500);
    // Back to main
    adb('shell input keyevent 4');
    await sleep(1000);
  });

  console.log('\n>>> All evidence captured successfully!');
}

main().catch(err => {
  console.error('Evidence capture failed:', err);
  process.exit(1);
});
