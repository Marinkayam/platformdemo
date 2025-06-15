
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconLibrary from "@/components/design-system/IconLibrary";
import NotificationsTester from "@/components/notifications/NotificationsTester";

const PortalLogos = () => {
    const logos = [
        "AT&T.png", "Amazon Payee.png", "Facturaxion.png", "Fieldglass.png", "KissFlow.png", 
        "Qualcomm.png", "Sainsburys.png", "Segment.png", "Shopify.png", "StoreNext.png",
        "Teradata.png", "apple.png", "ariba.png", "bill.png", "coupa.png", "default.png",
        "iSupplier.png", "jagger.png", "oracle.png", "sap.png", "taulia.png", "tipalti.png",
        "tungsten.png", "walmart.png"
    ];

    return (
        <div className="p-4 border rounded-lg mt-2">
            <h2 className="text-xl font-semibold mb-4">Portal Logos</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {logos.map(logo => (
                    <div key={logo} className="flex flex-col items-center justify-center gap-2 p-2 border rounded-md bg-white shadow-sm">
                        <img src={`/portal-logos/${logo}`} alt={logo.replace('.png', '')} className="h-12 object-contain" />
                        <span className="text-xs text-center text-gray-600 break-words">{logo.replace('.png', '')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DesignSystemPlayground = () => {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Design System</h1>
      <Tabs defaultValue="icons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logos">Portal Logos</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
        </TabsList>
        <TabsContent value="logos">
            <PortalLogos />
        </TabsContent>
        <TabsContent value="notifications">
            <div className="p-4 border rounded-lg mt-2">
                <NotificationsTester />
            </div>
        </TabsContent>
        <TabsContent value="icons">
            <IconLibrary />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default DesignSystemPlayground;
