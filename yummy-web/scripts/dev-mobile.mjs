import os from 'os';
import { spawn } from 'child_process';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

const ip = getLocalIP();
if (!ip) {
  console.error('Не удалось определить локальный IP. Убедитесь, что вы подключены к Wi-Fi.');
  process.exit(1);
}

const apiUrl = `http://${ip}:8888`;
console.log(`Запуск для телефона: откройте в браузере http://${ip}:3000`);
console.log(`API URL: ${apiUrl}`);
console.log(`Важно: запустите API с DISABLE_SSL=true (или: npm run start:dev:mobile в yummy-api)\n`);

const child = spawn('npx', ['vite'], {
  env: { ...process.env, VITE_API_URL: apiUrl },
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
