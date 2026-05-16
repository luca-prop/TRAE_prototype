import GNB from "@/components/layout/GNB";
import { AlertCircle } from "lucide-react";

/**
 * App Layout — 기존 서비스 페이지용 레이아웃
 *
 * @description
 * GNB와 Footer를 포함하는 기존 서비스 앱 레이아웃.
 * 랜딩페이지(/)와 분리되어 /app 하위 경로에서만 적용됩니다.
 */
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GNB />
      <main className="flex-1 bg-gray-50">{children}</main>
      <footer className="border-t bg-white py-3 px-4 md:py-4">
        <div className="container mx-auto max-w-7xl flex items-start gap-2 text-xs md:text-sm text-gray-500">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>⚠️ 본 데이터는 국토부 실거래가 및 동일 행정구 기준 비교이며, 현장 호가와 다를 수 있습니다. 투자 판단의 책임은 이용자에게 있습니다.</p>
        </div>
      </footer>
    </>
  );
}
