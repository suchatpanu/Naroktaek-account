'use server';

import { Prisma, SaleChannel } from "@prisma/client";

import { getPrisma } from "@/lib/prisma";
import type { FormState } from "@/app/form-state";

function formatCurrency(value: string) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(amount);
}

const systemUserEmail = "system@thychef.local";

function parseAmount(value: string) {
  const amount = Number(value || 0);

  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }

  return new Prisma.Decimal(amount.toFixed(2));
}

function parseSaleChannel(value: string) {
  if (Object.values(SaleChannel).includes(value as SaleChannel)) {
    return value as SaleChannel;
  }

  return null;
}

function generateSaleNumber(saleDate: string) {
  const compactDate = saleDate.replaceAll("-", "");
  const timestamp = new Date().toISOString().replaceAll(/[-:TZ.]/g, "").slice(8, 14);

  return `S-${compactDate}-${timestamp}`;
}

async function getSystemUserId() {
  const prisma = getPrisma();
  const user = await prisma.user.upsert({
    where: { email: systemUserEmail },
    update: {},
    create: {
      email: systemUserEmail,
      name: "System",
      passwordHash: "temporary-placeholder",
      role: "OWNER",
    },
    select: {
      id: true,
    },
  });

  return user.id;
}

export async function saveSaleEntry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const saleDate = String(formData.get("saleDate") || "");
  const paymentMethod = String(formData.get("paymentMethod") || "");
  const channel = String(formData.get("channel") || "");
  const saleNumber = String(formData.get("saleNumber") || "").trim();
  const subtotal = String(formData.get("subtotal") || "0");
  const discountAmount = String(formData.get("discountAmount") || "0");
  const totalAmount = String(formData.get("totalAmount") || "0");
  const items = String(formData.get("items") || "").trim();
  const note = String(formData.get("note") || "").trim();

  const parsedChannel = parseSaleChannel(channel);
  const parsedSubtotal = parseAmount(subtotal);
  const parsedDiscountAmount = parseAmount(discountAmount);
  const parsedTotalAmount = parseAmount(totalAmount);

  if (!saleDate || !paymentMethod || !parsedChannel || !parsedTotalAmount || parsedTotalAmount.lte(0)) {
    return {
      status: "error",
      message: "กรุณากรอกวันที่ขาย ช่องทางรับเงิน ช่องทางขาย และยอดขายให้ครบ",
    };
  }

  try {
    const prisma = getPrisma();
    const [paymentMethodRecord, createdBy] = await Promise.all([
      prisma.paymentMethod.findUnique({
        where: { code: paymentMethod },
        select: { id: true, name: true },
      }),
      getSystemUserId(),
    ]);

    if (!paymentMethodRecord) {
      return {
        status: "error",
        message: "ยังไม่พบช่องทางรับเงินในฐานข้อมูล กรุณา seed ข้อมูลอ้างอิงก่อน",
      };
    }

    const combinedNote = [note, items ? `รายการสินค้า\n${items}` : ""]
      .filter(Boolean)
      .join("\n\n");

    const createdSale = await prisma.sale.create({
      data: {
        saleNumber: saleNumber || generateSaleNumber(saleDate),
        saleDate: new Date(saleDate),
        paymentMethodId: paymentMethodRecord.id,
        channel: parsedChannel,
        subtotal: parsedSubtotal ?? parsedTotalAmount,
        discountAmount: parsedDiscountAmount ?? new Prisma.Decimal(0),
        totalAmount: parsedTotalAmount,
        note: combinedNote || null,
        createdBy,
      },
      select: {
        saleNumber: true,
      },
    });

    return {
      status: "success",
      message: `บันทึกยอดขาย ${createdSale.saleNumber} เรียบร้อยแล้ว: ${formatCurrency(totalAmount)}`,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return {
        status: "error",
        message: "เลขที่บิลนี้ถูกใช้ไปแล้ว กรุณาเปลี่ยนเลขที่บิลแล้วลองใหม่",
      };
    }

    return {
      status: "error",
      message: "ยังบันทึกยอดขายไม่ได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูลและข้อมูลอ้างอิง",
    };
  }
}

export async function saveExpenseEntry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const expenseDate = String(formData.get("expenseDate") || "");
  const categoryCode = String(formData.get("category") || "");
  const amount = String(formData.get("amount") || "0");
  const vendorName = String(formData.get("vendorName") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const isFixedCost = String(formData.get("isFixedCost") || "") === "true";

  const parsedAmount = parseAmount(amount);

  if (!expenseDate || !categoryCode || !parsedAmount || parsedAmount.lte(0)) {
    return {
      status: "error",
      message: "กรุณากรอกวันที่ ประเภทรายจ่าย และจำนวนเงินให้ครบ",
    };
  }

  try {
    const prisma = getPrisma();
    const [category, createdBy] = await Promise.all([
      prisma.expenseCategory.findUnique({
        where: { code: categoryCode },
        select: { id: true, name: true },
      }),
      getSystemUserId(),
    ]);

    if (!category) {
      return {
        status: "error",
        message: "ยังไม่พบหมวดรายจ่ายในฐานข้อมูล กรุณา seed ข้อมูลอ้างอิงก่อน",
      };
    }

    await prisma.expense.create({
      data: {
        expenseDate: new Date(expenseDate),
        categoryId: category.id,
        amount: parsedAmount,
        vendorName: vendorName || null,
        note: note || null,
        isFixedCost,
        createdBy,
      },
    });

    return {
      status: "success",
      message: `บันทึกรายจ่ายเรียบร้อยแล้ว: ${formatCurrency(amount)} หมวด ${category.name}`,
    };
  } catch {
    return {
      status: "error",
      message: "ยังบันทึกรายจ่ายไม่ได้ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูลและข้อมูลอ้างอิง",
    };
  }
}
