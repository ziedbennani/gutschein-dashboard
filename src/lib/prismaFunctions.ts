import { Coupon } from "@/app/dashboard/columns";
import { prisma } from "@/lib/prisma";

export async function getAllCoupons(): Promise<Coupon[]> {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return coupons.map((coupon) => ({
      ...coupon,
      firstValue: coupon.firstValue ? Number(coupon.firstValue) : null,
      usedValue: coupon.usedValue ? Number(coupon.usedValue) : null,
      restValue: Number(coupon.restValue),
      extraPayment: coupon.extraPayment ? Number(coupon.extraPayment) : null,
      tip: coupon.tip ? Number(coupon.tip) : null,
    }));
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
}
