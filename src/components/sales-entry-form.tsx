'use client';

import { useActionState } from "react";
import Link from "next/link";

import { initialFormState, saveSaleEntry } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

const paymentMethods = [
  { value: "cash", label: "เงินสด" },
  { value: "bank_transfer", label: "เงินโอน" },
  { value: "ocha", label: "Ocha" },
  { value: "delivery", label: "Delivery" },
];

const channels = [
  { value: "STORE", label: "หน้าร้าน" },
  { value: "DELIVERY", label: "เดลิเวอรี" },
  { value: "OCHA", label: "Ocha" },
  { value: "OTHER", label: "อื่น ๆ" },
];

export function SalesEntryForm() {
  const [state, formAction] = useActionState(saveSaleEntry, initialFormState);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">วันที่ขาย</span>
          <input className="field" type="date" name="saleDate" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">เลขที่บิล</span>
          <input className="field" type="text" name="saleNumber" placeholder="เช่น S-20260606-001" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">ช่องทางรับเงิน</span>
          <select className="field" name="paymentMethod" required defaultValue="">
            <option value="" disabled>
              เลือกช่องทางรับเงิน
            </option>
            {paymentMethods.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">ช่องทางขาย</span>
          <select className="field" name="channel" required defaultValue="">
            <option value="" disabled>
              เลือกช่องทางขาย
            </option>
            {channels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">ยอดก่อนส่วนลด</span>
          <input className="field" type="number" min="0" step="0.01" name="subtotal" placeholder="0.00" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">ส่วนลด</span>
          <input className="field" type="number" min="0" step="0.01" name="discountAmount" placeholder="0.00" />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">ยอดสุทธิ</span>
          <input className="field" type="number" min="0" step="0.01" name="totalAmount" placeholder="0.00" required />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">รายการสินค้าในบิล</span>
          <textarea
            className="field min-h-32"
            name="items"
            placeholder={"เช่น\nก๋วยเตี๋ยวเรือ x 12\nเกาเหลา x 3\nน้ำอัดลม x 4"}
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">หมายเหตุ</span>
          <textarea
            className="field min-h-32"
            name="note"
            placeholder="เช่น มีออเดอร์เดลิเวอรีช่วงเย็น หรือมีส่วนลดพิเศษ"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-[var(--line)] bg-white/45 p-4 dark:bg-white/5">
        <p className="text-sm text-[var(--muted)]">
          รอบนี้เป็น prototype สำหรับทดสอบ flow การบันทึกข้อมูลก่อนเชื่อมฐานข้อมูลจริง
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
          <SubmitButton label="บันทึกยอดขาย" pendingLabel="กำลังบันทึก..." />
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
