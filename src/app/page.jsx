"use client";
import HomeBanner from "@/components/HomeBanner";

export default function Home() {
  const imagePaths = [
    '/cricketbg.jpg',
    '/cricketbga.jpg',
    '/cricketbgb.jpg',
    '/cricketbgc.jpg',
  ];
  return (
    <div className="bg-gray-900">
      <HomeBanner images={imagePaths} interval={3000} />
    </div>
  );
}