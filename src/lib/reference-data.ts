export type ReferenceOption = {
  value: string;
  label: string;
};

export const fallbackPaymentMethods: ReferenceOption[] = [
  { value: "cash", label: "เงินสด" },
  { value: "bank_transfer", label: "เงินโอน" },
  { value: "ocha", label: "Ocha" },
  { value: "delivery", label: "Delivery" },
  { value: "other", label: "อื่น ๆ" },
];

export const fallbackExpenseCategories: ReferenceOption[] = [
  { value: "raw_pork", label: "ค่าหมู" },
  { value: "raw_beef", label: "ค่าเนื้อ" },
  { value: "vegetables", label: "ร้านผัก" },
  { value: "noodles", label: "ร้านเส้น" },
  { value: "ice", label: "ค่าน้ำแข็ง" },
  { value: "gas", label: "ค่าแก๊ส" },
  { value: "labor_daily", label: "ค่าแรงรายวัน" },
  { value: "rent", label: "ค่าเช่าร้าน" },
  { value: "water", label: "ค่าน้ำ" },
  { value: "electricity", label: "ค่าไฟ" },
  { value: "other", label: "อื่น ๆ" },
];
