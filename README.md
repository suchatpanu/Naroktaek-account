# ThyChef Store Management

เว็บแอปสำหรับจัดการยอดขาย รายรับ รายจ่าย การซื้อวัตถุดิบ และสต๊อกร้าน โดยโปรเจกต์นี้ตั้งต้นด้วย `Next.js + Prisma + PostgreSQL`

## Stack

- `Next.js 16`
- `Prisma 6`
- `PostgreSQL`
- เป้าหมาย deployment: `Vercel + Supabase`

## เริ่มใช้งานในเครื่อง

1. คัดลอกไฟล์ environment
2. ใส่ค่าเชื่อมต่อฐานข้อมูล
3. รัน migration
4. เปิด dev server

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## Environment Variables

ไฟล์ `.env.example` ถูกตั้งชื่อไว้ตามแนวทางของ Supabase + Prisma แล้ว

- `DATABASE_URL`
  ใช้สำหรับ runtime ของแอป
- `DIRECT_URL`
  ใช้สำหรับ Prisma Migrate และงาน admin

## Prisma Commands

```bash
npm run db:generate
npm run db:migrate
npm run db:deploy
npm run db:studio
```

## หน้า MVP ที่มีแล้ว

- `/`
- `/sales/new`
- `/expenses/new`

## Deploy

อ่านขั้นตอนเต็มได้ที่ [DEPLOY_VERCEL_SUPABASE.md](./DEPLOY_VERCEL_SUPABASE.md)
