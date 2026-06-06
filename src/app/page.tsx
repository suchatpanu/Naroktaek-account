export default function Home() {
  const summaryCards = [
    { label: "ยอดขายวันนี้", value: "฿12,480", note: "รวมหน้าร้านและเดลิเวอรี", tone: "warm" },
    { label: "รายจ่ายวันนี้", value: "฿4,820", note: "วัตถุดิบ ค่าแรง และค่าส่ง", tone: "neutral" },
    { label: "กำไรขั้นต้น", value: "฿7,660", note: "ก่อนหักค่าเช่า ค่าน้ำ ค่าไฟ", tone: "green" },
    { label: "วัตถุดิบใกล้หมด", value: "4 รายการ", note: "หมู, เส้น, ผักบุ้ง, น้ำแข็ง", tone: "alert" },
  ];

  const modules = [
    "บันทึกยอดขายและช่องทางรับเงิน",
    "บันทึกรายจ่ายรายวันและค่าแรง",
    "จัดการซื้อวัตถุดิบและสต๊อกคงเหลือ",
    "สรุปรายงานกำไรและต้นทุนรายเดือน",
  ];

  const tables = [
    "sales / sale_items",
    "expenses / expense_categories",
    "purchases / purchase_items",
    "ingredients / inventory_transactions",
  ];

  const quickLinks = [
    { href: "/sales/new", label: "บันทึกยอดขาย", tone: "accent" },
    { href: "/expenses/new", label: "บันทึกรายจ่าย", tone: "subtle" },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--card)] shadow-[0_20px_60px_rgba(44,30,16,0.12)] backdrop-blur">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.5fr_0.8fr] lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-white/45 px-3 py-1 text-sm text-[var(--muted)] dark:bg-white/5">
              ThyChef Back Office
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                ระบบร้านที่รวมยอดขาย รายรับ รายจ่าย และวัตถุดิบไว้ในที่เดียว
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                โปรเจกต์นี้ถูก scaffold สำหรับใช้ต่อเป็นระบบหน้าร้านและหลังร้าน โดยอ้างอิงจากโครงบัญชีเดิมของร้าน
                เพื่อให้เราเริ่มพัฒนา dashboard, ฟอร์มบันทึกข้อมูล, และรายงานจริงได้ทันที
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  className={
                    link.tone === "accent"
                      ? "rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                      : "rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                  }
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
              <a
                className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                href="#database"
              >
                ดูโครงฐานข้อมูล
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(255,255,255,0.28))] p-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              สถานะรอบแรก
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[var(--accent-2)]/10 p-4">
                <p className="text-sm text-[var(--muted)]">Stack</p>
                <p className="mt-2 text-lg font-semibold">Next.js 16 + Prisma + PostgreSQL</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] p-4">
                <p className="text-sm text-[var(--muted)]">พร้อมแล้ว</p>
                <p className="mt-2 text-lg font-semibold">โครงโปรเจกต์, schema ฐานข้อมูล, seed หมวดรายจ่าย</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] p-4">
                <p className="text-sm text-[var(--muted)]">ขั้นถัดไป</p>
                <p className="mt-2 text-lg font-semibold">เชื่อมฐานข้อมูลจริงและทำฟอร์มบันทึกยอดขาย</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_12px_30px_rgba(44,30,16,0.08)]"
          >
            <p className="text-sm text-[var(--muted)]">{card.label}</p>
            <p
              className={`mt-3 text-3xl font-semibold tracking-tight ${
                card.tone === "warm"
                  ? "text-[var(--accent)]"
                  : card.tone === "green"
                    ? "text-[var(--accent-2)]"
                    : card.tone === "alert"
                      ? "text-amber-700 dark:text-amber-300"
                      : "text-[var(--foreground)]"
              }`}
            >
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article
          id="mvp"
          className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--card)] p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">MVP Scope</p>
              <h2 className="mt-2 text-2xl font-semibold">ขอบเขตฟีเจอร์รอบแรก</h2>
            </div>
            <div className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm text-[var(--accent)]">
              พร้อมพัฒนาต่อ
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {modules.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-[var(--line)] px-4 py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-2)]/12 text-sm font-semibold text-[var(--accent-2)]">
                  0{index + 1}
                </div>
                <p className="text-base">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article
          id="database"
          className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--card)] p-6"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Database</p>
          <h2 className="mt-2 text-2xl font-semibold">ตารางหลักที่วางไว้แล้ว</h2>
          <div className="mt-6 space-y-3">
            {tables.map((table) => (
              <div
                key={table}
                className="rounded-2xl border border-[var(--line)] bg-white/50 px-4 py-3 font-mono text-sm dark:bg-white/5"
              >
                {table}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-[var(--accent)]/8 p-4 text-sm leading-6 text-[var(--muted)]">
            schema Prisma และ seed หมวดรายจ่ายถูกเตรียมไว้แล้วในโฟลเดอร์ <span className="font-mono text-[var(--foreground)]">prisma/</span>
            เพื่อให้ต่อยอด migration และเชื่อมฟอร์มจริงได้ทันที
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--card)] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Ready To Use</p>
          <h2 className="mt-2 text-2xl font-semibold">หน้าที่เริ่มใช้งานต่อได้แล้ว</h2>
          <div className="mt-5 grid gap-3">
            <a className="rounded-2xl border border-[var(--line)] px-4 py-4 hover:bg-white/50 dark:hover:bg-white/5" href="/sales/new">
              <span className="block text-base font-medium">บันทึกยอดขาย</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">ลงยอดขายรายวัน ช่องทางขาย และยอดสุทธิของบิล</span>
            </a>
            <a className="rounded-2xl border border-[var(--line)] px-4 py-4 hover:bg-white/50 dark:hover:bg-white/5" href="/expenses/new">
              <span className="block text-base font-medium">บันทึกรายจ่าย</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">ลงค่าวัตถุดิบ ค่าแรง และค่าใช้จ่ายประจำในรูปแบบใหม่</span>
            </a>
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--card)] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Next Step</p>
          <h2 className="mt-2 text-2xl font-semibold">สิ่งที่ควรต่อหลังจากนี้</h2>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-[var(--muted)]">
            <div className="rounded-2xl border border-[var(--line)] px-4 py-4">
              เชื่อม server action เข้ากับ Prisma เพื่อ insert ลงตาราง <span className="font-mono text-[var(--foreground)]">sales</span> และ <span className="font-mono text-[var(--foreground)]">expenses</span>
            </div>
            <div className="rounded-2xl border border-[var(--line)] px-4 py-4">
              สร้างหน้าจัดการสินค้าและหมวดรายจ่าย เพื่อให้ฟอร์มดึงรายการจากฐานข้อมูลจริงแทนการ hardcode
            </div>
            <div className="rounded-2xl border border-[var(--line)] px-4 py-4">
              เพิ่มหน้ารายงานรายวันและสรุปยอดขายตามช่องทางชำระเงิน
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
