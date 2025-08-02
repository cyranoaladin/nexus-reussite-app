import { Star, Users, Clock, Target, ArrowRight, Check } from "lucide-react"
 import { Badge } from "@/components/ui/badge"
 import { Button } from "@/components/ui/button"
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
+import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
 import { SUBSCRIPTION_PLANS, SPECIAL_PACKS, ARIA_ADDONS } from "@/lib/constants"
@@ .. @@
           {/* Packs Spécifiques */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.8 }}
             viewport={{ once: true }}
             className="bg-white rounded-xl p-8 shadow-soft"
           >
             <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 text-center">
               Packs Spécifiques
             </h3>
             <p className="text-gray-600 text-center mb-8">
               Des accompagnements ciblés pour des objectifs précis
             </p>
             
-            <div className="space-y-4">
-              {Object.entries(SPECIAL_PACKS).map(([key, pack]) => (
-                <Card key={key} className="border-gray-200">
-                  <CardHeader className="pb-3">
-                    <div className="flex justify-between items-start">
-                      <div>
-                        <CardTitle className="text-lg">{pack.name}</CardTitle>
-                        <p className="text-gray-600 text-sm mt-1">{pack.description}</p>
-                      </div>
-                      <div className="text-right">
-                        <span className="text-2xl font-bold text-primary-600">
-                          {formatPrice(pack.price)}
-                        </span>
-                      </div>
-                    </div>
-                  </CardHeader>
-                  <CardContent className="pt-0">
-                    <Button className="w-full">
-                      En savoir plus
-                    </Button>
-                  </CardContent>
-                </Card>
-              ))}
-            </div>
+            <Accordion type="single" collapsible className="w-full">
+              {Object.entries(SPECIAL_PACKS).map(([key, pack]) => (
+                <AccordionItem key={key} value={key}>
+                  <AccordionTrigger className="text-left">
+                    <div className="flex justify-between items-center w-full mr-4">
+                      <div>
+                        <h4 className="font-semibold text-lg">{pack.name}</h4>
+                        <p className="text-gray-600 text-sm">{pack.description}</p>
+                      </div>
+                      <span className="text-xl font-bold text-primary-600">
+                        {formatPrice(pack.price)}
+                      </span>
+                    </div>
+                  </AccordionTrigger>
+                  <AccordionContent>
+                    <div className="space-y-4">
+                      <ul className="space-y-2">
+                        {pack.features.map((feature, index) => (
+                          <li key={index} className="flex items-start space-x-3">
+                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
+                            <span className="text-gray-600 text-sm">{feature}</span>
+                          </li>
+                        ))}
+                      </ul>
+                      <Button className="w-full">
+                        Réserver ce Pack
+                      </Button>
+                    </div>
+                  </AccordionContent>
+                </AccordionItem>
+              ))}
+            </Accordion>
           </motion.div>