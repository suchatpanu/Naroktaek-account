import { SalesEntryForm } from "@/components/sales-entry-form";

export default function NewSalePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-5 py-6 sm:px-8 lg:px-10">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_18px_40px_rgba(44,30,16,0.09)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Sales Entry</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">บันทึกยอดขาย</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              ใช้หน้านี้สำหรับลงยอดขายรายวัน เลือกช่องทางรับเงิน ระบุยอดสุทธิ และบันทึกรายการสินค้าในบิล
            </p>
          </div>
          <div className="rounded-3xl bg-[var(--accent-2)]/10 px-4 py-3 text-sm text-[var(--accent-2)]">
            เชื่อมกับตาราง <span className="font-mono">sales / sale_items</span>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6">
        <SalesEntryForm />
      </section>
    </main>
  );
}
