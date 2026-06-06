'use server';

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
};

function formatCurrency(value: string) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function saveSaleEntry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const saleDate = String(formData.get("saleDate") || "");
  const paymentMethod = String(formData.get("paymentMethod") || "");
  const channel = String(formData.get("channel") || "");
  const totalAmount = String(formData.get("totalAmount") || "0");

  if (!saleDate || !paymentMethod || !channel || Number(totalAmount) <= 0) {
    return {
      status: "error",
      message: "กรุณากรอกวันที่ขาย ช่องทางรับเงิน ช่องทางขาย และยอดขายให้ครบ",
    };
  }

  return {
    status: "success",
    message: `บันทึกยอดขายตัวอย่างแล้ว: ${formatCurrency(totalAmount)} วันที่ ${saleDate} ผ่าน ${paymentMethod}`,
  };
}

export async function saveExpenseEntry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const expenseDate = String(formData.get("expenseDate") || "");
  const category = String(formData.get("category") || "");
  const amount = String(formData.get("amount") || "0");

  if (!expenseDate || !category || Number(amount) <= 0) {
    return {
      status: "error",
      message: "กรุณากรอกวันที่ ประเภทรายจ่าย และจำนวนเงินให้ครบ",
    };
  }

  return {
    status: "success",
    message: `บันทึกรายจ่ายตัวอย่างแล้ว: ${formatCurrency(amount)} หมวด ${category}`,
  };
}
