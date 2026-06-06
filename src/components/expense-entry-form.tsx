'use client';

import { useActionState } from "react";
import Link from "next/link";

import { initialFormState, saveExpenseEntry } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

const expenseCategories = [
  "ค่าหมู",
  "ค่าเนื้อ",
  "ร้านผัก",
  "ร้านเส้น",
  "ค่าน้ำแข็ง",
  "ค่าแก๊ส",
  "ค่าแรงรายวัน",
  "ค่าเช่าร้าน",
  "ค่าน้ำ",
  "ค่าไฟ",
  "อื่น ๆ",
];

export function ExpenseEntryForm() {
  const [state, formAction] = useActionState(saveExpenseEntry, initialFormState);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">วันที่จ่าย</span>
          <input className="field" type="date" name="expenseDate" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">หมวดรายจ่าย</span>
          <select className="field" name="category" required defaultValue="">
            <option value="" disabled>
              เลือกหมวดรายจ่าย
            </option>
            {expenseCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm md:col-span-2">
          <span className="font-medium">ชื่อร้านหรือผู้รับเงิน</span>
          <input className="field" type="text" name="vendorName" placeholder="เช่น ร้านหมูเจ้าเดิม หรือ พี่หนุ่ย" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">จำนวนเงิน</span>
          <input className="field" type="number" min="0" step="0.01" name="amount" placeholder="0.00" required />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">รายละเอียด</span>
          <textarea
            className="field min-h-32"
            name="note"
            placeholder={"เช่น\nค่าหมูรอบเช้า 12 กก.\nค่าแรงพนักงาน 3 คน"}
          />
        </label>
        <div className="grid gap-4">
          <label className="flex items-start gap-3 rounded-3xl border border-[var(--line)] bg-white/45 p-4 text-sm dark:bg-white/5">
            <input className="mt-1 h-4 w-4" type="checkbox" name="isFixedCost" value="true" />
            <span>
              <span className="block font-medium">เป็นค่าใช้จ่ายประจำ</span>
              <span className="mt-1 block text-[var(--muted)]">
                ใช้สำหรับรายการอย่างค่าเช่า ค่าน้ำ ค่าไฟ หรือเงินเดือนประจำ
              </span>
            </span>
          </label>

          <div className="rounded-3xl border border-[var(--line)] p-4 text-sm text-[var(--muted)]">
            ตัวอย่างการใช้งาน: ถ้าเป็นค่าแรงรายวัน ให้เลือกหมวด <span className="font-medium text-[var(--foreground)]">ค่าแรงรายวัน</span>
            และใส่ชื่อพนักงานในช่องผู้รับเงิน
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-[var(--line)] bg-white/45 p-4 dark:bg-white/5">
        <p className="text-sm text-[var(--muted)]">
          ฟอร์มนี้พร้อมสำหรับต่อเข้าตาราง <span className="font-mono text-[var(--foreground)]">expenses</span> ภายหลัง
        </p>
        {state.message ? (
          <p
            className={`text-sm ${
              state.status === "success" ? "text-[var(--accent-2)]" : "text-[var(--accent)]"
            }`}
          >
            {state.message}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <SubmitButton label="บันทึกรายจ่าย" pendingLabel="กำลังบันทึก..." />
          <Link
            className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium hover:bg-white/50 dark:hover:bg-white/5"
            href="/"
          >
            กลับหน้าแดชบอร์ด
          </Link>
        </div>
      </div>
    </form>
  );
}
