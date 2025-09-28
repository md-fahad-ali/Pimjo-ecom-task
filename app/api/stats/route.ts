import { NextResponse } from "next/server";

export type DashboardStats = {
  customers: number;
  customersChange: number; // percentage, positive up, negative down
  orders: number;
  ordersChange: number; // percentage
};

const stats: DashboardStats = {
  customers: 3782,
  customersChange: 11.01,
  orders: 5359,
  ordersChange: -9.05,
};

export async function GET() {
  return NextResponse.json({ stats });
}
