
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Shield, Clock, AlertTriangle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function SmartConnections() {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackNavigation}
            className="mr-3 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Smart Connections</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <h1 className="text-3xl font-semibold text-[#38415F] mb-4">Smart Connections</h1>
        <p className="text-base text-[#8C92A3] leading-relaxed">
          Smart Connections is a powerful automation solution that creates seamless bridges between accounts receivable and accounts payable systems. It enables organizations to automate invoice submission and status monitoring across different financial platforms, eliminating manual processes and reducing administrative overhead.
        </p>
      </div>

      <ResizablePanelGroup direction="vertical" className="min-h-[200px]">
        <ResizablePanel defaultSize={100}>
          <Card className="w-full">
            <CardContent className="px-6 py-4 space-y-6">
              
              {/* Key Features Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h2 className="text-2xl font-semibold text-[#38415F]">Key Features</h2>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-4">
                    {/* Intelligent Connection Management */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">Intelligent Connection Management</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">System Integration: Connect disparate financial systems (NetSuite, QuickBooks, SAP, Oracle, Ariba, Coupa) without complex coding or IT intervention</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Dynamic Status Monitoring: Real-time visibility into connection health with intuitive status indicators (Live, In Process, Unavailable, Inactive)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Centralized Dashboard: Comprehensive view of all connections and their associated agents in a single interface</span>
                        </div>
                      </div>
                    </div>

                    {/* Automated Agents */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">Automated Agents</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Agent Types: Both Monto-managed and customer-managed agents to handle different aspects of the invoice lifecycle</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Role-Based Functionality: Specialized agents for invoice submission, status monitoring, and PO fetching</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Credential Management: Secure storage and management of portal credentials with visibility controls</span>
                        </div>
                      </div>
                    </div>

                    {/* Robust Administration */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">Robust Administration</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Connection Settings: Granular control over notification preferences and connection configuration</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Issue Resolution: Real-time alerts for connection problems with clear diagnostic information</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm text-[#38415F]">Agent Lifecycle Management: Create, monitor, and manage agents throughout their lifecycle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Benefits Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h2 className="text-2xl font-semibold text-[#38415F]">Benefits</h2>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-[#38415F]">Reduce Manual Entry: Eliminate repetitive invoice submission tasks across multiple customer portals</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span className="text-sm text-[#38415F]">Increase Visibility: Monitor invoice status automatically across all connected systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-[#38415F]">Improve Accuracy: Reduce errors associated with manual data entry and tracking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span className="text-sm text-[#38415F]">Save Time: Automate routine financial processes to free up staff for higher-value activities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-[#38415F]">Enhance Security: Maintain secure portal access with proper credential management</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* User Interface & Experience Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h2 className="text-2xl font-semibold text-[#38415F]">User Interface & Experience</h2>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">✅ Dashboard Design</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-[#38415F]">• Clean, Modern Interface: Minimalist design with a white background and subtle shadows for clear data presentation</p>
                        <p className="text-sm text-[#38415F]">• Color-Coded Status Indicators: Intuitive visual system using green (Live), blue (In Process), yellow (Unavailable), and gray (Inactive) status badges</p>
                        <p className="text-sm text-[#38415F]">• Expandable Rows: Interactive table with expandable sections to reveal detailed agent information</p>
                        <p className="text-sm text-[#38415F]">• Responsive Layout: Adapts seamlessly to different screen sizes with optimized mobile views</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">🛠 Modal Interactions</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-[#38415F]">• Credentials Management: Dedicated modal for viewing and managing agent credentials with copy-to-clipboard functionality</p>
                        <p className="text-sm text-[#38415F]">• Settings Configuration: Comprehensive settings modal with notification preferences and danger zone controls</p>
                        <p className="text-sm text-[#38415F]">• Focused Task Completion: Modal interfaces minimize distractions when performing specific tasks</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#38415F] mb-2">⚙️ Visual Feedback</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-[#38415F]">• Status Visualization: Clear status badges with appropriate icons (checkmark, clock, alert triangle, power)</p>
                        <p className="text-sm text-[#38415F]">• Action Confirmation: Visual feedback for user actions like copying credentials</p>
                        <p className="text-sm text-[#38415F]">• Alert Indicators: Prominent visual cues for connection issues requiring attention</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Technical Implementation Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h2 className="text-2xl font-semibold text-[#38415F]">Technical Implementation</h2>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="bg-[#F9FAFB] p-4 rounded text-sm text-[#586079]">
                    <p>Built with React + Tailwind</p>
                    <p>Status is dynamically calculated per connection based on agent health</p>
                    <p>Responsive UI with real-time updates</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Summary Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <h2 className="text-2xl font-semibold text-[#38415F]">Summary</h2>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#38415F] mb-2">Smart Connections transforms...</h3>
                    <p className="text-base text-[#8C92A3]">
                      Smart Connections transforms how organizations handle financial document exchange between systems, replacing tedious manual processes with intelligent automation.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
