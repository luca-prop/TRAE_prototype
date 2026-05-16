"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./landing-v2.css";

/* ───────────────────────── Animated Components ───────────────────────── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0;
      const duration = 2000;
      const step = Math.ceil(end / (duration / 16));
      const id = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(id); }
        else setCount(start);
      }, 16);
      observer.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function PersonaLandingPage() {
  const [activePersona, setActivePersona] = useState<number>(0);

  const personas = [
    {
      name: "김민수",
      role: "38세 / IT 개발자",
      tag: "시간 빈곤형",
      pain: "본업이 바빠 수백 개 구역을 엑셀로 비교할 시간이 없음",
      goal: "현금 3억으로 진입 가능한 최적의 상급지 3초 만에 찾기",
      feature: "초개인화 역방향 필터링",
      quote: "드디어 엑셀을 껐다. 기회비용이 수치로 비교되니 선택이 명확해지네."
    },
    {
      name: "이지혜",
      role: "34세 / 전문직 의사",
      tag: "신뢰/리스크 관리",
      pain: "어려운 재개발 용어와 허위 매물, 정보 비대칭에 지침",
      goal: "실투자금 오차 없이 진짜 거래 가능한 매물만 선별",
      feature: "O2O Verified 뱃지 시스템",
      quote: "중개사가 직접 보증하는 데이터라면 비용을 지불할 가치가 충분해."
    },
    {
      name: "정아름",
      role: "32세 / 신혼부부",
      tag: "결정 장애 극복",
      pain: "재개발 vs 기축 아파트 갭투자 중 무엇이 나을지 결정 불가",
      goal: "동일 예산 대비 두 대안의 ROI 및 리스크 1:1 대조",
      feature: "1:1 기회비용 시각화 대시보드",
      quote: "비교 지표가 시각화되니 막연한 두려움이 사라졌어."
    }
  ];

  return (
    <div className="lv2-root min-h-screen bg-[#060B18] text-slate-100 font-sans selection:bg-blue-500/30">

      {/* ── Background Glows ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="lv2-orb lv2-orb-blue w-[600px] h-[600px] -top-[200px] -left-[100px]" />
        <div className="lv2-orb lv2-orb-purple w-[500px] h-[500px] top-[40%] right-[0]" />
        <div className="lv2-orb lv2-orb-cyan w-[400px] h-[400px] -bottom-[100px] left-[20%]" />
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#060B18]/80 backdrop-blur-md border-b border-white/5">
        <div className="lv2-container h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/seedfit_logo2_Favicon_navy_backdel.png" alt="SeedFit Logo" width={28} height={28} />
            <span className="font-bold text-xl tracking-tight">씨드핏 <span className="text-blue-500">PRO</span></span>
          </div>
          <Link href="/app" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            기존 버전 보기
          </Link>
        </div>
      </nav>

      {/* ══════════ HERO SECTION (Aggressive Hook) ══════════ */}
      <section className="lv2-section min-h-screen flex flex-col justify-center pt-24 pb-12 z-10 relative text-center">
        <div className="lv2-container max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold mb-8 animate-[v2-pulse-glow_2s_ease-in-out_infinite]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            경고: 아직도 엑셀로 재개발을 분석하고 계십니까?
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            당신의 현금 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">3억</span>, <br />
            가장 완벽한 구역을 <br />
            <span className="lv2-gradient-text">단 3초 만에 매칭합니다.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            파편화된 정보, 찌라시, 수작업 엑셀 노가다는 끝났습니다. <br className="hidden md:block" />
            초개인화 역방향 필터링 알고리즘으로 오차율 5% 이내의 진성 매물만 확인하세요.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/app" className="lv2-cta lv2-cta-lg w-full sm:w-auto group">
              내 예산으로 즉시 검증하기
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link href="#personas" className="lv2-cta lv2-cta-outline lv2-cta-lg w-full sm:w-auto">
              나와 비슷한 사례 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PERSONA SECTION (Target Identification) ══════════ */}
      <section id="personas" className="lv2-section bg-[#0A1128]/50 border-y border-white/5 z-10 relative">
        <div className="lv2-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">어떤 고민을 안고 계신가요?</h2>
            <p className="text-slate-400 text-lg">당신과 같은 상황의 투자자들이 이미 씨드핏으로 문제를 해결했습니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((persona, idx) => (
              <div
                key={idx}
                className={`lv2-persona-card cursor-pointer ${activePersona === idx ? 'ring-2 ring-blue-500 bg-blue-900/10' : ''}`}
                onClick={() => setActivePersona(idx)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{persona.name}</h3>
                    <p className="text-sm text-blue-400">{persona.role}</p>
                  </div>
                  <span className="lv2-badge lv2-badge-blue">{persona.tag}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">PAIN POINT</p>
                    <p className="text-sm text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20 leading-relaxed">
                      "{persona.pain}"
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-1">SEEDFIT SOLUTION</p>
                    <p className="text-sm text-green-300 bg-green-500/10 p-2 rounded border border-green-500/20 leading-relaxed font-medium">
                      ✓ {persona.feature}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-sm italic text-slate-400">"{persona.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VALUE PROPOSITION (The "Why") ══════════ */}
      <section className="lv2-section z-10 relative">
        <div className="lv2-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="lv2-badge lv2-badge-gold mb-4">CORE VALUE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">기존 방식의 한계를 완벽히 부수다</h2>
            <p className="text-slate-400">호갱노노, 아실, 직접 만든 엑셀... 수많은 대안이 있었지만 당신의 '기회비용'을 계산해주지는 않았습니다.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="lv2-card">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 text-2xl">⏳</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">역방향 필터링 (Reverse-filtering)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">구역을 먼저 찾고 내 자산을 맞추는 정방향 방식에서 탈피합니다. 가용 현금만 입력하면 취득세, 대출 등을 역산하여 진입 가능한 구역만 핀셋처럼 추출합니다.</p>
                    <span className="text-xs font-semibold text-blue-400">👉 김민수(IT 개발자)의 엑셀 노가다 해결</span>
                  </div>
                </div>
              </div>

              <div className="lv2-card">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 text-2xl">⚖️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">기축 아파트 1:1 대조 대시보드</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">재개발의 비정형 리스크(분담금, 지연 등)를 정량화하여, 동일 예산의 기축 아파트 갭투자와 1:1로 비교 시뮬레이션합니다.</p>
                    <span className="text-xs font-semibold text-purple-400">👉 정아름(신혼부부)의 투자 확신 제공</span>
                  </div>
                </div>
              </div>

              <div className="lv2-card">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 text-2xl">🛡️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">O2O Verified 매물 시스템</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">지역 내 선도 중개사가 직접 보증하는 실거래 가능 매물에만 뱃지를 부여하여, 정보 비대칭과 헛걸음을 원천 차단합니다.</p>
                    <span className="text-xs font-semibold text-green-400">👉 이지혜(의사)의 정보 불신 완벽 해소</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Representation of Before/After Table */}
            <div className="bg-[#0A1128] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500"></div>
              <h3 className="text-xl font-bold mb-6 text-center">압도적인 효율의 차이</h3>
              <table className="lv2-compare-table">
                <thead>
                  <tr>
                    <th>측정 지표</th>
                    <th className="text-red-400">기존 분석 방식</th>
                    <th className="text-blue-400">씨드핏 도입 후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>후보지 도출 시간</td>
                    <td className="lv2-old">주 15시간 이상</td>
                    <td className="lv2-new">단 30초</td>
                  </tr>
                  <tr>
                    <td>데이터 정확도</td>
                    <td className="lv2-old">감 의존 (오차 30%)</td>
                    <td className="lv2-new">오차율 5% 이내</td>
                  </tr>
                  <tr>
                    <td>매물 신뢰도</td>
                    <td className="lv2-old">허위 매물 혼재</td>
                    <td className="lv2-new">100% 검증 (Verified)</td>
                  </tr>
                  <tr>
                    <td>의사결정 근거</td>
                    <td className="lv2-old">온라인 카더라 통신</td>
                    <td className="lv2-new">정량적 시뮬레이션 지표</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ METRICS & SOCIAL PROOF (KSF) ══════════ */}
      <section className="lv2-section bg-[#0A1128]/80 border-y border-white/5 z-10 relative">
        <div className="lv2-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-sm font-semibold text-slate-400">데이터 신뢰성 검증률</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                &lt;<AnimatedCounter end={5} suffix="%" />
              </div>
              <p className="text-sm font-semibold text-slate-400">수익성 계산 오차율</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter end={48} suffix="h" />
              </div>
              <p className="text-sm font-semibold text-slate-400">부동산 규제 반영 속도</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter end={1247} suffix="개" />
              </div>
              <p className="text-sm font-semibold text-slate-400">정밀 분석 대상 구역</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="lv2-section min-h-[60vh] flex flex-col justify-center text-center z-10 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="lv2-container max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            합리적 의사결정을 위한 <br />마지막 퍼즐
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            시간 빈곤형 직장인부터 까다로운 퀀트 분석가까지. <br />
            재개발 투자의 패러다임이 바뀝니다.
          </p>
          <Link href="/app" className="lv2-cta lv2-cta-lg inline-flex group shadow-[0_0_40px_rgba(59,130,246,0.5)]">
            씨드핏 무료로 시작하기
            <svg className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <p className="mt-6 text-sm text-slate-500">
            * B2B 중개사 제휴 문의는 하단 링크를 이용해 주세요.
          </p>
        </div>
      </section>

      <footer className="bg-[#040812] border-t border-white/5 py-8 text-center text-sm text-slate-600">
        <div className="lv2-container">
          <p>© 2026 SeedFit Pro. All rights reserved.</p>
          <p className="mt-2">본 서비스의 데이터는 국토부 실거래가 및 공공데이터를 기반으로 하며, 실제 거래 현장과 차이가 있을 수 있습니다.</p>
        </div>
      </footer>
    </div>
  );
}
