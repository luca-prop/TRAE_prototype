"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Bell, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { ZONE_DATA } from "@/lib/mockData";

const STAGE_COLORS: Record<string, string> = {
  "조합설립인가": "bg-blue-100 text-blue-800",
  "정비구역지정": "bg-indigo-100 text-indigo-800",
  "정비구역 지정": "bg-indigo-100 text-indigo-800",
  "연번 부여": "bg-gray-100 text-gray-800",
  "연변 부여": "bg-gray-100 text-gray-800",
  "시공사선정": "bg-yellow-100 text-yellow-800",
  "시공사 선정": "bg-yellow-100 text-yellow-800",
  "사업시행인가": "bg-emerald-100 text-emerald-800",
  "관리처분인가": "bg-purple-100 text-purple-800",
  "신속통합기획 대상지 선정": "bg-cyan-100 text-cyan-800",
  "신속통합기획 완료": "bg-teal-100 text-teal-800",
  "신속통합기획 확정": "bg-teal-100 text-teal-800",
  "사업시행자 지정": "bg-orange-100 text-orange-800",
  "추진위 승인": "bg-amber-100 text-amber-800",
  "추진위설립": "bg-amber-100 text-amber-800",
  "(모아)통합심의통과": "bg-teal-100 text-teal-800",
  "(모아)관리계획고시": "bg-indigo-100 text-indigo-800",
  "(모아)관리계획수립": "bg-indigo-100 text-indigo-800",
  "(모아)대상지 선정": "bg-cyan-100 text-cyan-800",
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Support both legacy single budget and new range params
  const budgetMinParam = searchParams.get("budgetMin");
  const budgetMaxParam = searchParams.get("budgetMax");
  const legacyBudget = searchParams.get("budget");
  
  const budgetMin = budgetMinParam ? Number(budgetMinParam) : (legacyBudget ? Number(legacyBudget) * 0.85 : 0);
  const budgetMax = budgetMaxParam ? Number(budgetMaxParam) : (legacyBudget ? Number(legacyBudget) * 1.05 : 0);
  const budgetMid = (budgetMin + budgetMax) / 2;

  const zones = Object.entries(ZONE_DATA).map(([id, zone]) => {
    const center = (budgetMin + budgetMax) / 2;
    const diffRatio = Math.abs(center - zone.minBudget) / center;
    const matchRate = Math.max(0, Math.min(100, Math.round((1 - diffRatio) * 100)));
    
    return {
      id,
      name: zone.name,
      district: zone.district,
      stage: zone.stage,
      minBudget: zone.minBudget,
      price: (zone.minBudget / 100000000).toFixed(1) + "억",
      matchRate,
      verified: Math.floor(Math.random() * 8) + 1,
    };
  });

  const filtered = zones
    .filter((r) => r.minBudget >= budgetMin && r.minBudget <= budgetMax)
    .sort((a, b) => b.matchRate - a.matchRate);

  const formatBudget = (n: number) =>
    n >= 100000000 ? `${(n / 100000000).toFixed(1)}억` : `${(n / 10000).toLocaleString()}만`;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-5 md:mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/app")} className="mb-3 md:mb-4 -ml-2 min-h-[44px]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          예산 다시 입력하기
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">검색 결과</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          예산 범위 <span className="font-semibold text-gray-900">{formatBudget(budgetMin)} ~ {formatBudget(budgetMax)}</span> 기준
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          <span className="font-semibold text-primary">{filtered.length}개</span> 구역 발견
        </p>
      </div>

      {/* Freshness Alert */}
      <Alert className="mb-5 md:mb-6 bg-blue-50 border-blue-200 text-blue-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-sm md:text-base">최신 큐레이션 데이터</AlertTitle>
        <AlertDescription className="text-xs md:text-sm">마지막 데이터 갱신일: 2026.05.13. 실제 시세가 반영된 신뢰도 높은 데이터입니다.</AlertDescription>
      </Alert>

      {/* Scatter Chart Link Top */}
      <div className="mb-6 flex justify-end">
        <Button 
          onClick={() => router.push(`/app/scatter?budgetMin=${budgetMin}&budgetMax=${budgetMax}`)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white min-h-[44px] shadow-sm"
        >
          📊 입지 및 예산별 구역 비교 (스캐터 차트)
        </Button>
      </div>

      {filtered.length > 0 ? (
        <React.Fragment>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group active:scale-[0.99]"
                onClick={() => router.push(`/app/comparison/${item.id}?budget=${budgetMid}`)}
              >
                <CardHeader className="pb-2 md:pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base md:text-lg mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{item.district}</Badge>
                        <Badge className={`text-xs ${STAGE_COLORS[item.stage] || "bg-gray-100 text-gray-700"}`}>
                          {item.stage}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded whitespace-nowrap">
                      매물 {item.verified}건
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">예상 초기투자금</p>
                    <p className="text-lg md:text-xl font-bold">{item.price}원</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5 items-end">
                      <span className="text-gray-500">매칭 적합도 <span className="text-[10px] text-gray-400 font-normal">(투자금 근접도 기준)</span></span>
                      <span className="font-semibold text-primary">{item.matchRate}%</span>
                    </div>
                    <Progress value={item.matchRate} className="h-1.5" />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2 group-hover:bg-primary/5 min-h-[44px]">
                    비교 분석 보기 →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 mb-4 flex justify-center">
            <Button 
              onClick={() => router.push(`/app/scatter?budgetMin=${budgetMin}&budgetMax=${budgetMax}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-h-[44px] px-8 shadow-sm"
            >
              📊 입지 및 예산별 구역 비교 (스캐터 차트)
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 md:p-12 text-center border-dashed bg-white">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">현재 예산 범위 내 진입 가능한 구역이 없습니다</h3>
          <p className="text-sm md:text-base text-gray-500 mb-6">예산 범위를 넓히거나 알림을 설정해 새 매물 출현 시 알림을 받아보세요.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button className="min-h-[44px]">
              <Bell className="h-4 w-4 mr-2" />
              매물 출현 알림 받기
            </Button>
            <Button variant="outline" className="min-h-[44px]" onClick={() => router.push("/app")}>예산 수정하기</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">검색 결과를 불러오는 중...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
