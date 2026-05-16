"use client";

import React from "react";
import { ShieldCheck, Building2 } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";

export default function B2CPropertyList() {
  const properties = [
    { id: 1, type: "?§ÏÑ∏?Ä", price: "850,000,000", premium: "320,000,000", rightsPrice: "530,000,000", verified: true },
    { id: 2, type: "?úÍªë", price: "450,000,000", premium: "210,000,000", rightsPrice: "240,000,000", verified: true },
    { id: 3, type: "ÎπåÎùº", price: "920,000,000", premium: "350,000,000", rightsPrice: "570,000,000", verified: false },
    { id: 4, type: "?§ÏÑ∏?Ä", price: "880,000,000", premium: "330,000,000", rightsPrice: "550,000,000", verified: false },
  ];

  // Sort: Verified first
  const sortedProperties = [...properties].sort((a, b) => (a.verified === b.verified ? 0 : a.verified ? -1 : 1));

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">?∏ÎüâÏß?1Íµ¨Ïó≠ ?±Î°ù Îß§Î¨º</h2>
        <span className="text-sm text-gray-500 font-medium">Ï¥?{properties.length}Í±?/span>
      </div>
      
      <div className="space-y-5">
        {sortedProperties.map((prop) => (
          <Card 
            key={prop.id} 
            className={`overflow-hidden transition-all hover:shadow-md ${prop.verified ? 'border-green-500 border-2 shadow-sm' : 'border-gray-200'}`}
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className={`p-6 flex-grow ${prop.verified ? 'bg-green-50/20' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${prop.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-lg">{prop.type}</span>
                    </div>
                    {prop.verified && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 border border-green-200 flex items-center shadow-sm">
                        <ShieldCheck className="w-4 h-4 mr-1.5" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1.5 font-medium">?∏Í?</p>
                      <p className="font-bold text-lg text-gray-900">{prop.price}??/p>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                      <p className="text-xs text-primary/70 mb-1.5 font-medium">?àÏÉÅ ?ÑÎ¶¨ÎØ∏ÏóÑ</p>
                      <p className="font-bold text-lg text-primary">{prop.premium}??/p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1.5 font-medium">Í∂åÎ¶¨Í∞Ä??/p>
                      <p className="font-semibold text-lg text-gray-700">{prop.rightsPrice}??/p>
                    </div>
                  </div>
                  
                  {/* Security enforcement block: Explicitly mentioning no sensitive info */}
                  {/* The prompt specifically states: "Ï§ëÏöî Î≥¥Ïïà: Ïπ¥Îìú ?¥Î? ?¥Îîî?êÎèÑ ?åÏú†Ï£??∞ÎùΩÏ≤? ?ôÌò∏?? ?ÅÏÑ∏ Ï£ºÏÜåÍ∞Ä ?∏Ï∂ú?òÏ? ?äÎèÑÎ°?Î∞∞Ï†ú" */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
