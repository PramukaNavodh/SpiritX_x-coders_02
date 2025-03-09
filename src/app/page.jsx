"use client";
import HomeBanner from "@/components/HomeBanner";
import UniversitySection from "@/components/UniversitySection";

export default function Home() {
    const imagePaths = [
        '/cricketbg.jpg',
        '/cricketbga.jpg',
        '/cricketbgb.jpg',
        '/cricketbgc.jpg',
    ];
    return (
        <div className="bg-gray-900">
            <HomeBanner images={imagePaths} interval={3000}/>
            <UniversitySection/>
        </div>
    );
}
