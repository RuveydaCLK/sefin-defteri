# Şefin Defteri — GitHub Pages Deployment

## Kurulum

1. Bu repoyu GitHub'a yükle
2. `vite.config.ts` içindeki `base: '/sefin-defteri/'` satırını **kendi repo adınla** değiştir
3. GitHub repo ayarlarına git → **Settings > Pages**
4. Source olarak **"GitHub Actions"** seç
5. `main` branch'ine push yap → otomatik deploy olur

## URL formatı

```
https://<kullanıcı-adın>.github.io/<repo-adın>/
```

## Lokal geliştirme

```bash
npm install
npm run dev
```
