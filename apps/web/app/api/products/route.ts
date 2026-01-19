import "server-only";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const KEY = "products:catalog";
const TTL = Number(process.env.PRODUCTS_CACHE_TTL ?? 120);

export async function GET() {
  const apiBase =
    process.env.API_INTERNAL_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  const cached = await redis.get(KEY);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }

  const res = await fetch(`${apiBase}/products`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: res.status },
    );
  }

  const data = await res.json();
  await redis.set(KEY, JSON.stringify(data), "EX", TTL);
  return NextResponse.json(data);
}
