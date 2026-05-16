"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scatterData } from "../../lib/scatterData";
import { REFERENCE_COMPLEXES } from "../../lib/referenceComplexes";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

const STAGE_LABELS: Record<number, string> = {
  1: "추진준비",
  2: "구역지정",
  3: "조합설립",
  4: "시공사선정",
  5: "사업시행",
  6: "관리처분",
  7: "이주철거",
  8: "착공",
  9: "기축(비교군)",
};

const TIER_COLORS: Record<string, string> = {
  T1: "#3b82f6",
  T2: "#10b981",
  T3: "#f59e0b",
  T4: "#ef4444",
  T_REF: "#8b5cf6", // color for reference
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.isRef) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-lg">{data.name}</h3>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
              레퍼런스 단지
            </span>
          </div>
          <div className="space-y-1.5 border-t border-gray-100 pt-2 mt-2">
            <p className="text-sm text-gray-900 font-bold">
              <span className="text-gray-400 font-normal mr-2">시세 (84타입)</span> {data.investmentMin}억
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 min-w-[220px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg">{data.name}</h3>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
            {data.district}
          </span>
        </div>
        <div className="space-y-1.5 border-t border-gray-100 pt-2 mt-2">
          <p className="text-sm text-gray-600">
            <span className="text-gray-400 mr-2">단계</span> {data.stageStr}
          </p>
          <p className="text-sm text-gray-900 font-bold">
            <span className="text-gray-400 font-normal mr-2">투자금</span> {data.investmentMin}억 ~ {data.investmentMax}억
          </p>
        </div>
        <div className="mt-3 text-[11px] text-gray-500 bg-gray-50 py-2 rounded-lg text-center font-medium">
          '{data.district}' 모아보기
        </div>
      </div>
    );
  }
  return null;
};

// 안정적인 커스텀 렌더러
const CapsuleShape = (props: any) => {
  const { cx, cy, payload, yAxis, onClick } = props;
  
  if (!payload || isNaN(cx) || isNaN(cy)) return null;

  if (payload.isRef) {
    return (
      <g opacity={0.9} onClick={(e) => onClick && onClick(props, e)} style={{ cursor: 'pointer' }}>
        <polygon 
          points={`${cx},${cy-8} ${cx+6},${cy+6} ${cx-6},${cy+6}`} 
          fill={TIER_COLORS.T_REF} 
        />
        <circle cx={cx} cy={cy} r={3} fill="#fff" style={{ pointerEvents: 'none' }} />
      </g>
    );
  }

  let height = 12;
  let topY = cy - 6;

  if (yAxis && typeof yAxis.scale === 'function') {
    const yMin = yAxis.scale(payload.investmentMin);
    const yMax = yAxis.scale(payload.investmentMax);
    topY = Math.min(yMin, yMax);
    const bottomY = Math.max(yMin, yMax);
    height = Math.max(bottomY - topY, 12); 
  } else {
    const diff = payload.investmentMax - payload.investmentMin;
    height = Math.max(diff * 26, 12);
    topY = cy - (height / 2);
  }
  
  const fill = TIER_COLORS[payload.tier as keyof typeof TIER_COLORS] || "#888";
  const opacity = payload.isOut ? 0.15 : 0.8;

  return (
    <g opacity={opacity} onClick={(e) => onClick && onClick(props, e)} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}>
      <rect 
        x={cx - 6} 
        y={topY} 
        width={12} 
        height={height} 
        rx={6} 
        fill={fill} 
      />
      <circle cx={cx} cy={cy} r={3} fill="#fff" style={{ pointerEvents: 'none' }} />
    </g>
  );
};

function ScatterChartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawBudget = searchParams.get("budget");
  const budget = rawBudget ? Number(rawBudget) / 100000000 : 0;
  
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showAllZones, setShowAllZones] = useState(budget === 0);
  const [pinnedData, setPinnedData] = useState<any>(null);

  const displayData = useMemo(() => {
    let data = scatterData.map(d => {
      const avg = (d.investmentMin + d.investmentMax) / 2;
      const minFilter = budget > 0 ? budget * 0.8 : 0;
      const maxFilter = budget > 0 ? budget * 1.2 : 999;
      const isOut = budget > 0 && (d.investmentMin > maxFilter || d.investmentMax < minFilter);
      
      return {
        ...d,
        avg,
        isOut,
        errorY: [avg - d.investmentMin, d.investmentMax - avg],
      };
    });

    if (!showAllZones) {
      data = data.filter(d => !d.isOut);
    }

    if (selectedDistrict) {
      data = data.filter(d => d.district === selectedDistrict);
      const refs = REFERENCE_COMPLEXES[selectedDistrict] || [];
      const refPoints = refs.map((ref, idx) => ({
        id: `ref-${selectedDistrict}-${idx}`,
        name: ref.name,
        district: selectedDistrict,
        tier: "T_REF",
        stage: 9,
        stageStr: "기축 (비교군)",
        investmentMin: ref.price,
        investmentMax: ref.price,
        avg: ref.price,
        isOut: false,
        isRef: true
      }));
      data = [...data, ...refPoints];
    }
    return data;
  }, [budget, showAllZones, selectedDistrict]);

  const handlePointClick = (data: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (data && data.payload) {
      // data comes from CapsuleShape props which has cx, cy
      setPinnedData({ ...data.payload, cx: data.cx, cy: data.cy });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl min-h-screen flex flex-col bg-gray-50/30">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 -ml-2 text-gray-400 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            결과 목록으로 돌아가기
          </Button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <span className="p-1.5 bg-indigo-600 rounded-lg text-white">📊</span>
            입지 및 예산별 구역 비교
          </h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">
            X축: 사업 단계 (우측일수록 안전) · Y축: 예상 실투자금 (억 단위)
          </p>
        </div>
        
        {budget > 0 && (
          <div className="flex items-center gap-3 self-start">
            {!showAllZones && (
              <Button 
                variant="outline" 
                onClick={() => setShowAllZones(true)}
                className="bg-white"
              >
                전체 구역 보기
              </Button>
            )}
            <div className="bg-white border border-indigo-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <div className="text-sm font-semibold">
                내 예산 <span className="text-indigo-600">{budget.toFixed(1)}억</span> 기준
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDistrict && (
        <div className="mb-4 flex items-center gap-3 bg-indigo-600 p-4 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4">
          <MapPin className="h-5 w-5 text-white" />
          <span className="font-bold text-white text-lg">
            '{selectedDistrict}' 구역 집중 분석 중
          </span>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setSelectedDistrict(null)}
            className="ml-auto bg-white/20 hover:bg-white/40 text-white border-none font-bold"
          >
            전체 구역 보기
            <X className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      )}

      <div 
        className="w-full h-[600px] p-2 md:p-8 shadow-2xl border border-gray-100 bg-white rounded-[2rem] overflow-hidden relative"
        onClick={() => setPinnedData(null)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              type="number" 
              dataKey="stage" 
              domain={[0.5, 9.5]} 
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              tickFormatter={(val) => STAGE_LABELS[val] || ""}
              tick={{ fontSize: 13, fill: "#64748b", fontWeight: 600 }}
              axisLine={{ stroke: "#f1f5f9" }}
              tickLine={false}
              dy={15}
            />
            
            <YAxis 
              type="number" 
              dataKey="avg" 
              unit="억" 
              domain={[0, 32]}
              tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            
            <ZAxis type="number" range={[64, 64]} />
            
            {!pinnedData && (
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1', strokeWidth: 1 }} 
              />
            )}
            
            <Scatter 
              name="재개발 구역" 
              data={displayData} 
              shape={<CapsuleShape />}
              onClick={handlePointClick}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {pinnedData && pinnedData.cx && (
          <div 
            className="absolute z-50 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-indigo-200 min-w-[220px] animate-in zoom-in-95 pointer-events-auto"
            style={{ 
              left: pinnedData.cx, 
              top: pinnedData.cy, 
              transform: 'translate(-50%, -100%)', 
              marginTop: '-16px' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900 text-lg">{pinnedData.name}</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full hover:bg-gray-100" onClick={() => setPinnedData(null)}>
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            
            {pinnedData.isRef ? (
              <div className="space-y-1.5 border-t border-gray-100 pt-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                  레퍼런스 기축 단지
                </span>
                <p className="text-sm text-gray-900 font-bold mt-2">
                  <span className="text-gray-400 font-normal mr-2">시세 (84타입)</span> {pinnedData.investmentMin}억
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 border-t border-gray-100 pt-2">
                <p className="text-sm text-gray-600">
                  <span className="text-gray-400 mr-2">단계</span> 
                  {pinnedData.stageStr}
                </p>
                <p className="text-sm text-gray-900 font-bold">
                  <span className="text-gray-400 font-normal mr-2">투자금</span> 
                  {pinnedData.investmentMin}억 {pinnedData.investmentMax !== pinnedData.investmentMin ? `~ ${pinnedData.investmentMax}억` : ''}
                </p>
                
                <div className="pt-2 mt-1">
                  <Button 
                    onClick={() => {
                      setSelectedDistrict(pinnedData.district);
                      setPinnedData(null);
                    }}
                    className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold shadow-sm h-8 text-xs"
                  >
                    '{pinnedData.district}' 모아보기
                  </Button>
                </div>
              </div>
            )}
            
            {/* 툴팁 아래 꼬리(화살표) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-indigo-200 transform rotate-45"></div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-8 justify-center text-sm font-bold text-gray-500 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        {Object.entries(TIER_COLORS).filter(([k]) => k !== 'T_REF').map(([tier, color]) => (
          <div key={tier} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            <span>{tier === 'T1' ? '1~3억' : tier === 'T2' ? '3~5억' : tier === 'T3' ? '5~10억' : '10억+'}</span>
          </div>
        ))}
        <div className="flex items-center gap-2.5 ml-4">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] shadow-sm" style={{ borderBottomColor: TIER_COLORS.T_REF }} />
          <span>레퍼런스 기축 단지</span>
        </div>
      </div>
    </div>
  );
}

export default function ScatterChartPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-400 font-medium animate-pulse">구역 데이터를 시각화하는 중...</div>}>
      <ScatterChartContent />
    </Suspense>
  );
}
