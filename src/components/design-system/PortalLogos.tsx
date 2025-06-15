
import React from 'react';

const PortalLogos = () => {
    const logos = [
        "AT&T.png", "Amazon Payee.png", "Facturaxion.png", "Fieldglass.png", "KissFlow.png", 
        "Qualcomm.png", "Sainsburys.png", "Segment.png", "Shopify.png", "StoreNext.png",
        "Teradata.png", "apple.png", "ariba.png", "bill.png", "coupa.png", "default.png",
        "iSupplier.png", "jagger.png", "oracle.png", "sap.png", "taulia.png", "tipalti.png",
        "tungsten.png", "walmart.png"
    ];

    return (
        <div>
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

export default PortalLogos;
