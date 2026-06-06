# Deploy ด้วย Vercel + Supabase

คู่มือนี้อิงจากเอกสารทางการของ Supabase และ Vercel ณ วันที่ `June 6, 2026`

แหล่งอ้างอิงหลัก:

- [Supabase Prisma guide](https://supabase.com/docs/guides/database/prisma)
- [Supabase Pricing](https://supabase.com/pricing)
- [Vercel Next.js overview](https://vercel.com/docs/concepts/next.js/overview)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

## 1. สร้างโปรเจกต์ Supabase

1. เข้า [Supabase Dashboard](https://supabase.com/dashboard)
2. กด `New project`
3. ตั้งชื่อโปรเจกต์และรหัสผ่านฐานข้อมูล
4. รอจนฐานข้อมูลพร้อมใช้งาน

หมายเหตุ:

- Free plan ของ Supabase ตอนนี้มี `500 MB database`
- Free project จะ `pause after 1 week of inactivity`

## 2. สร้าง role สำหรับ Prisma

ใน Supabase SQL Editor ให้รันคำสั่งนี้

```sql
create user "prisma" with password 'replace_with_strong_password' bypassrls createdb;
grant "prisma" to "postgres";
grant usage on schema public to prisma;
grant create on schema public to prisma;
grant all on all tables in schema public to prisma;
grant all on all routines in schema public to prisma;
grant all on all sequences in schema public to prisma;
alter default privileges for role postgres in schema public grant all on tables to prisma;
alter default privileges for role postgres in schema public grant all on routines to prisma;
alter default privileges for role postgres in schema public grant all on sequences to prisma;
```

นี่อ้างอิงจากคู่มือ Prisma ของ Supabase โดยตรง

## 3. คัดลอก connection strings

ใน Supabase project:

1. ไปที่ `Connect`
2. หา connection strings ดังนี้

- `Supavisor pooler`
  ใช้กับ `DATABASE_URL`
- `Direct connection`
  ใช้กับ `DIRECT_URL`

สำหรับ deployment แบบ Vercel + Next.js:

- `DATABASE_URL` ควรใช้ pooler string
- `DIRECT_URL` ควรใช้ direct string

## 4. ตั้งค่าไฟล์ .env ในเครื่อง

คัดลอกไฟล์ตัวอย่าง

```bash
cp .env.example .env
```

ใส่ค่าจริงจาก Supabase ลงไป

ตัวอย่างรูปแบบ:

```env
DATABASE_URL="postgresql://prisma.[PROJECT-REF]:[PRISMA-PASSWORD]@[DB-REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[DB-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

ข้อสังเกต:

- `DATABASE_URL` ใช้ user `prisma`
- `DIRECT_URL` ใช้ direct database connection

## 5. สร้างตารางจาก Prisma

ในโฟลเดอร์โปรเจกต์ รัน:

```bash
npm run db:migrate
npm run db:generate
```

ถ้าต้องการ seed ค่าอ้างอิง เช่น payment methods และ expense categories:

```sql
-- ใช้ไฟล์ prisma/seed_reference.sql
```

คุณสามารถ copy SQL จากไฟล์ [prisma/seed_reference.sql](./prisma/seed_reference.sql) ไปวางใน Supabase SQL Editor ได้เลย

## 6. push โค้ดขึ้น GitHub

Vercel ทำงานง่ายที่สุดเมื่อเชื่อมกับ GitHub

ขั้นพื้นฐาน:

1. สร้าง repository ใหม่บน GitHub
2. push โค้ดจากโฟลเดอร์นี้ขึ้น repo

## 7. Deploy ขึ้น Vercel

1. เข้า [Vercel Dashboard](https://vercel.com/dashboard)
2. กด `Add New Project`
3. เลือก repo ของโปรเจกต์นี้
4. Import project

Vercel จะ detect ว่าเป็น Next.js อัตโนมัติ

## 8. ตั้งค่า Environment Variables บน Vercel

ใน Vercel Project Settings > Environment Variables ให้เพิ่ม:

- `DATABASE_URL`
- `DIRECT_URL`

แนะนำให้ใส่ทั้งใน:

- `Production`
- `Preview`

## 9. Deploy production migration

หลังตั้ง env บน Vercel แล้ว ให้รัน migration กับ production database ก่อนหรือพร้อม deploy

ตัวเลือกง่ายสุดช่วงแรก:

- รัน `npm run db:migrate` จากเครื่องคุณกับฐาน Supabase ก่อน

เมื่อเริ่มใช้งานจริงมากขึ้น ค่อยปรับ flow เป็น `prisma migrate deploy`

## 10. เช็กผลหลัง deploy

หลัง deploy สำเร็จ ให้ทดสอบอย่างน้อย:

1. เปิดหน้า `/`
2. เปิดหน้า `/sales/new`
3. เปิดหน้า `/expenses/new`
4. ทดสอบ submit ฟอร์ม

## ข้อแนะนำสำหรับช่วงเริ่มต้น

- ใช้ Supabase Free + Vercel Hobby ก่อน
- ยังไม่ต้องเปิดฟีเจอร์ซับซ้อนอย่าง auth หรือ storage จนกว่าจะเริ่มใช้จริง
- ถ้าจะใช้ Prisma เป็นหลัก ให้พิจารณาปิด Supabase Data API ตามเอกสาร Supabase

## ขั้นถัดไปที่ควรทำในโค้ด

1. เชื่อม `server actions` เข้ากับ Prisma จริง
2. ดึง `expense categories` จากฐานข้อมูลแทน hardcode
3. เพิ่มหน้า `products` และ `ingredients`
4. เพิ่ม dashboard สรุปยอดรายวันจากฐานข้อมูลจริง
