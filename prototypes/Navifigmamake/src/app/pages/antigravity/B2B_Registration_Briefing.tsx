"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mic, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Badge } from "@/app/components/ui/badge";

const formSchema = z.object({
  zone: z.string().min(1, "Íµ¨Ïó≠???†ÌÉù?¥Ï£º?∏Ïöî"),
  type: z.string().min(1, "Îß§Î¨º ?†Ìòï???†ÌÉù?¥Ï£º?∏Ïöî"),
  price: z.string().min(1, "?∏Í?Î•??ÖÎ†•?¥Ï£º?∏Ïöî"),
  premium: z.string(),
  rightsPrice: z.string(),
  contact: z.string(),
  dongho: z.string(),
});

export default function B2BRegistrationBriefing() {
  const [mode, setMode] = useState<"form" | "briefing">("form");
  const [isInvalidPasscode, setIsInvalidPasscode] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zone: "", type: "", price: "", premium: "", rightsPrice: "", contact: "", dongho: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate server validation error
    if (Number(values.price.replace(/,/g, "")) > 5000000000) {
      setServerError("?ïÏÉÅ Î≤îÏúÑÎ•?Î≤óÏñ¥???∏Í??ÖÎãà?? ?§Ì?Î•??ïÏù∏??Ï£ºÏÑ∏??");
      return;
    }
    setServerError("");
    alert("?±Î°ù ?±Í≥µ!");
  };

  const formatCurrency = (val: string) => val.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="flex gap-4 mb-8 border-b pb-4">
        <Button variant={mode === "form" ? "default" : "outline"} onClick={() => setMode("form")}>
          Îß§Î¨º ?±Î°ù ??        </Button>
        <Button variant={mode === "briefing" ? "default" : "outline"} onClick={() => setMode("briefing")} className={mode === "briefing" ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}>
          <Mic className="w-4 h-4 mr-2" /> Í≥†Í∞ù Î∏åÎ¶¨??Î™®Îìú
        </Button>
      </div>

      {mode === "form" && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>?†Í∑ú Îß§Î¨º ?±Î°ù (B2B)</CardTitle>
                <CardDescription>Í≥µÏù∏Ï§ëÍ∞ú???ÑÏö© Îß§Î¨º ?±Î°ù ?úÏä§?úÏûÖ?àÎã§.</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setIsInvalidPasscode(!isInvalidPasscode)}>
                ?®Ïä§ÏΩîÎìú ?êÎü¨ ?†Í?
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isInvalidPasscode && (
              <Alert variant="destructive" className="mb-6">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>?ëÍ∑º ?úÌïú</AlertTitle>
                <AlertDescription>?†Ìö®?òÏ? ?äÏ? ?ëÍ∑º ÏΩîÎìú?ÖÎãà??</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Íµ¨Ïó≠ ?†ÌÉù</FormLabel>
                        <Select disabled={isInvalidPasscode} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Íµ¨Ïó≠ ?†ÌÉù" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="zone1">?∏ÎüâÏß?1Íµ¨Ïó≠</SelectItem>
                            <SelectItem value="zone2">?úÎÇ® 3Íµ¨Ïó≠</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Îß§Î¨º ?†Ìòï</FormLabel>
                        <Select disabled={isInvalidPasscode} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="?†Ìòï ?†ÌÉù" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="?úÍªë">?úÍªë</SelectItem>
                            <SelectItem value="?§ÏÑ∏?Ä">?§ÏÑ∏?Ä</SelectItem>
                            <SelectItem value="ÎπåÎùº">ÎπåÎùº</SelectItem>
                            <SelectItem value="Í∏∞Ì?">Í∏∞Ì?</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>?∏Í?</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              disabled={isInvalidPasscode}
                              {...field}
                              onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                              className={serverError ? "border-red-500 pr-8" : "pr-8"}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">??/span>
                          </div>
                        </FormControl>
                        {serverError && <p className="text-sm font-medium text-destructive mt-2">{serverError}</p>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="premium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>?ÑÎ¶¨ÎØ∏ÏóÑ</FormLabel>
                        <FormControl>
                          <Input disabled={isInvalidPasscode} {...field} onChange={(e) => field.onChange(formatCurrency(e.target.value))} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>?åÏú†Ï£??∞ÎùΩÏ≤?/FormLabel>
                        <FormControl>
                          <Input disabled={isInvalidPasscode} placeholder="010-0000-0000" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dongho"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>???∏Ïàò</FormLabel>
                        <FormControl>
                          <Input disabled={isInvalidPasscode} placeholder="101??202?? {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isInvalidPasscode} className="w-full">Îß§Î¨º ?±Î°ù?òÍ∏∞</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {mode === "briefing" && (
        <div className="bg-gray-50 min-h-[600px] p-6 rounded-xl border-2 border-indigo-100 relative">
          <div className="absolute top-4 right-4">
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm font-medium shadow-sm">
              ?é§ Í≥†Í∞ù Î∏åÎ¶¨??Î™®Îìú
            </Badge>
          </div>

          <h2 className="text-3xl font-bold mb-8 mt-4 text-gray-900">?∏ÎüâÏß?1Íµ¨Ïó≠ ?§ÏÑ∏?Ä (Í∏âÎß§)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Îß§Î¨º Í∏∞Î≥∏ ?ïÎ≥¥</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">?∏Í?</span>
                  <span className="font-bold text-xl">8??5,000Îß???/span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">?àÏÉÅ ?ÑÎ¶¨ÎØ∏ÏóÑ</span>
                  <span className="font-bold text-lg text-primary">3??2,000Îß???/span>
                </div>
                {/* Masked Info */}
                <div className="flex justify-between text-sm pt-2 bg-gray-100 p-2 rounded items-center mt-4">
                  <span className="text-gray-500 flex items-center"><ShieldAlert className="w-3 h-3 mr-1"/> Î≥¥Ïïà ?ïÎ≥¥</span>
                  <span className="font-mono text-gray-400 font-bold">010-****-5678 | ***-****</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-white">
              <CardHeader>
                <CardTitle className="text-lg text-indigo-900">?¨Ïûê ?úÎ??àÏù¥??(ÎßàÏä§???¥Ï†ú??</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ï¥??¨Ïûê ?àÏÉÅ??/span>
                    <span className="font-bold text-lg">11??7,000Îß???/span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">?àÏÉÅ ?ÖÏ£ºÍ∂?Í∞ÄÏπ?/span>
                    <span className="font-bold text-indigo-600 text-xl">16??5,000Îß???/span>
                  </div>
                  <div className="h-32 bg-indigo-100 rounded-lg mt-6 flex items-end p-2 gap-2 overflow-hidden">
                    <div className="bg-indigo-300 w-1/3 h-1/2 rounded-t transition-all hover:opacity-80 flex items-center justify-center text-xs font-bold text-indigo-900">?ÑÏû¨</div>
                    <div className="bg-indigo-400 w-1/3 h-3/4 rounded-t transition-all hover:opacity-80 flex items-center justify-center text-xs font-bold text-white">?ÖÏ£º ??/div>
                    <div className="bg-indigo-600 w-1/3 h-full rounded-t transition-all hover:opacity-80 flex items-center justify-center text-xs font-bold text-white">5????/div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
