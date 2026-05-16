"use client";

import React, { useState } from "react";
import { Users, Home, ShieldCheck, Clock, CreditCard, Plus, Trash2, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const [ltvTiers, setLtvTiers] = useState([
    { id: 1, label: "Tier 1", min: "0", max: "900,000,000", maxLoan: "40%", date: "2024-01-01" },
    { id: 2, label: "Tier 2", min: "900,000,000", max: "1,500,000,000", maxLoan: "30%", date: "2024-01-01" },
    { id: 3, label: "Tier 3", min: "1,500,000,000", max: "99,999,000,000", maxLoan: "20%", date: "2024-01-01" },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-sm md:text-base">
      {/* Sidebar Mock */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col p-4 hidden lg:flex shrink-0">
        <h2 className="text-white text-xl font-bold mb-8 px-2 mt-4">Admin Panel</h2>
        <nav className="space-y-2 flex-grow">
          <div className="bg-slate-800 text-white p-3 rounded-lg flex items-center gap-3 font-medium"><Home size={18} /> ?Ä?úÎ≥¥??/div>
          <div className="p-3 rounded-lg flex items-center gap-3 hover:bg-slate-800 cursor-pointer transition-colors"><CreditCard size={18} /> LTV Í¥ÄÎ¶?/div>
          <div className="p-3 rounded-lg flex items-center gap-3 hover:bg-slate-800 cursor-pointer transition-colors"><Home size={18} /> Îß§Î¨º Í¥ÄÎ¶?/div>
          <div className="p-3 rounded-lg flex items-center gap-3 hover:bg-slate-800 cursor-pointer transition-colors"><Users size={18} /> Íµ¨ÎèÖ Í¥ÄÎ¶?/div>
        </nav>
      </div>

      <div className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">?úÏä§???ÑÌô© ?îÏïΩ</h1>
        
        {/* 1. Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Home className="text-blue-500 mb-3" size={28} />
              <p className="text-xs md:text-sm text-gray-500 font-medium">Ï¥?Íµ¨Ïó≠ ??/p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">128Í∞?/h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Home className="text-indigo-500 mb-3" size={28} />
              <p className="text-xs md:text-sm text-gray-500 font-medium">Ï¥?Îß§Î¨º ??/p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">1,452Í±?/h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="text-green-500 mb-3" size={28} />
              <p className="text-xs md:text-sm text-gray-500 font-medium">Verified ÎπÑÏú®</p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">42.5%</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Clock className="text-orange-500 mb-3" size={28} />
              <p className="text-xs md:text-sm text-gray-500 font-medium">ÏµúÍ∑º ?ôÍ∏∞??/p>
              <h3 className="text-lg md:text-xl font-bold mt-1">2?úÍ∞Ñ ??/h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow col-span-2 md:col-span-1 xl:col-span-1">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Users className="text-purple-500 mb-3" size={28} />
              <p className="text-xs md:text-sm text-gray-500 font-medium">Lead Íµ¨ÎèÖ ??/p>
              <h3 className="text-xl md:text-2xl font-bold mt-1">8,391Î™?/h3>
            </CardContent>
          </Card>
        </div>

        {/* 2. LTV Management */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-white border-b">
            <CardTitle>LTV ?ïÏ±Ö Í¥ÄÎ¶?(3-Tier)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="whitespace-nowrap px-4">Tier ?ºÎ≤®</TableHead>
                  <TableHead className="whitespace-nowrap px-4">Í∞ÄÍ≤??òÌïú</TableHead>
                  <TableHead className="whitespace-nowrap px-4">Í∞ÄÍ≤??ÅÌïú</TableHead>
                  <TableHead className="whitespace-nowrap px-4">ÏµúÎ? ?ÄÏ∂úÏï°</TableHead>
                  <TableHead className="whitespace-nowrap px-4">?ÅÏö©??/TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ltvTiers.map((tier) => (
                  <TableRow key={tier.id}>
                    <TableCell className="px-4 py-3"><Input defaultValue={tier.label} className="w-24 bg-white" /></TableCell>
                    <TableCell className="px-4 py-3"><Input defaultValue={tier.min} className="min-w-[120px] bg-white" /></TableCell>
                    <TableCell className="px-4 py-3"><Input defaultValue={tier.max} className="min-w-[120px] bg-white" /></TableCell>
                    <TableCell className="px-4 py-3"><Input defaultValue={tier.maxLoan} className="w-20 bg-white" /></TableCell>
                    <TableCell className="px-4 py-3"><Input type="date" defaultValue={tier.date} className="bg-white" /></TableCell>
                    <TableCell className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={18} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between p-4 bg-gray-50/50 border-t">
              <Button variant="outline" size="sm" className="bg-white"><Plus size={16} className="mr-2" /> Tier Ï∂îÍ?</Button>
              <Button>?ïÏ±Ö ?Ä??/Button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Property Management & 4. Lead Subs */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="flex-1 overflow-hidden">
            <CardHeader className="bg-white border-b">
              <CardTitle>Îß§Î¨º Í¥ÄÎ¶?/CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-4">Íµ¨Ïó≠</TableHead>
                    <TableHead className="px-4">?†Ìòï</TableHead>
                    <TableHead className="px-4">?∏Í?</TableHead>
                    <TableHead className="px-4">?∞ÎùΩÏ≤?/TableHead>
                    <TableHead className="px-4">?ÅÌÉú</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="px-4 py-3 font-medium">?∏ÎüâÏß?1Íµ¨Ïó≠</TableCell>
                    <TableCell className="px-4 py-3">?§ÏÑ∏?Ä</TableCell>
                    <TableCell className="px-4 py-3 text-right">8.5??/TableCell>
                    <TableCell className="px-4 py-3 font-mono text-gray-600">010-1234-5678</TableCell>
                    <TableCell className="px-4 py-3">
                      <Select defaultValue="ACTIVE">
                        <SelectTrigger className="w-24 h-8 text-xs bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="ACTIVE">ACTIVE</SelectItem><SelectItem value="SOLD">SOLD</SelectItem></SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="hover:bg-gray-100"><MoreHorizontal size={18} /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer"><ShieldCheck className="mr-2 h-4 w-4 text-green-600" /> ??Verified ?†Í?</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 cursor-pointer"><Trash2 className="mr-2 h-4 w-4" /> ?óëÔ∏?Îß§Î¨º ??†ú</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-4 py-3 font-medium">?úÎÇ® 3Íµ¨Ïó≠</TableCell>
                    <TableCell className="px-4 py-3">?úÍªë</TableCell>
                    <TableCell className="px-4 py-3 text-right">12.0??/TableCell>
                    <TableCell className="px-4 py-3 font-mono text-gray-600">010-9876-5432</TableCell>
                    <TableCell className="px-4 py-3">
                      <Select defaultValue="SOLD">
                        <SelectTrigger className="w-24 h-8 text-xs bg-white text-gray-500"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="ACTIVE">ACTIVE</SelectItem><SelectItem value="SOLD">SOLD</SelectItem></SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="hover:bg-gray-100"><MoreHorizontal size={18} /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer"><ShieldCheck className="mr-2 h-4 w-4 text-green-600" /> ??Verified ?†Í?</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 cursor-pointer"><Trash2 className="mr-2 h-4 w-4" /> ?óëÔ∏?Îß§Î¨º ??†ú</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="flex-1 overflow-hidden">
            <CardHeader className="bg-white border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Lead Íµ¨ÎèÖ Í¥ÄÎ¶?/CardTitle>
                <Button variant="outline" size="sm" className="bg-white"><Download size={14} className="mr-2" /> CSV ?¥Î≥¥?¥Í∏∞</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-2">
                  <Input placeholder="ÏµúÏÜå ?àÏÇ∞ (??" className="w-28 bg-white" />
                  <span className="text-gray-500">~</span>
                  <Input placeholder="ÏµúÎ? ?àÏÇ∞ (??" className="w-28 bg-white" />
                </div>
                <Button variant="secondary" className="bg-white hover:bg-gray-100 border shadow-sm">?ÑÌÑ∞ ?ÅÏö©</Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="px-4">?ÄÍ≤?ÏßÄ??/TableHead>
                      <TableHead className="px-4">?àÏÇ∞ Î≤îÏúÑ</TableHead>
                      <TableHead className="px-4">?ÅÌÉú</TableHead>
                      <TableHead className="px-4">?±Î°ù??/TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="px-4 py-3 font-medium">?ôÏûëÍµ? ?ÅÎì±?¨Íµ¨</TableCell>
                      <TableCell className="px-4 py-3">5??~ 7??/TableCell>
                      <TableCell className="px-4 py-3"><Badge className="bg-green-100 text-green-800 hover:bg-green-200">?úÏÑ±</Badge></TableCell>
                      <TableCell className="px-4 py-3 text-gray-500">2024.04.20</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="px-4 py-3 font-medium">?©ÏÇ∞Íµ?/TableCell>
                      <TableCell className="px-4 py-3">10??~ 15??/TableCell>
                      <TableCell className="px-4 py-3"><Badge variant="secondary" className="bg-gray-100 text-gray-600">Ï§ëÏ?</Badge></TableCell>
                      <TableCell className="px-4 py-3 text-gray-500">2024.04.18</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
