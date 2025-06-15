
import { useState } from 'react';
import DesignSystemSidebar, { designSystemNavItems } from '@/components/design-system/DesignSystemSidebar';
import IconLibrary from "@/components/design-system/IconLibrary";
import { NotificationsTester } from "@/components/notifications/NotificationsTester";
import PortalLogos from '@/components/design-system/PortalLogos';
import ColorPalette from '@/components/design-system/ColorPalette';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ButtonsDemo from '@/components/design-system/ButtonsDemo';
import StatusBadgesDemo from '@/components/design-system/StatusBadgesDemo';
import AlertsDemo from '@/components/design-system/AlertsDemo';
import BreadcrumbsDemo from '@/components/design-system/BreadcrumbsDemo';
import BrandAssets from '@/components/design-system/BrandAssets';

const DesignSystemPlayground = () => {
    const [activeItem, setActiveItem] = useState('color-palette');
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeItem) {
            case 'portal-logos':
                return <PortalLogos />;
            case 'icons':
                return <IconLibrary />;
            case 'toast-notifications':
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Notifications Tester</h2>
                        <NotificationsTester />
                    </div>
                );
            case 'color-palette':
                return <ColorPalette />;
            case 'buttons':
                return <ButtonsDemo />;
            case 'status-badges':
                return <StatusBadgesDemo />;
            case 'alerts':
                return <AlertsDemo />;
            case 'breadcrumbs':
                return <BreadcrumbsDemo />;
            case 'brand-assets':
                return <BrandAssets />;
            default:
                const item = designSystemNavItems.find(i => i.id === activeItem);
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16">
                        <h2 className="text-2xl font-bold">{item?.label}</h2>
                        <p className="text-gray-500 mt-2">This component is coming soon.</p>
                    </div>
                );
        }
    };

    const activeItemData = designSystemNavItems.find(i => i.id === activeItem);

    return (
        <div className="flex -mx-8 -my-4 h-[calc(100vh-64px)] bg-gray-50/50">
            <aside className="w-64 bg-white border-r flex-shrink-0 flex flex-col">
                <div className="h-[65px] border-b px-4 flex items-center flex-shrink-0">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
                        <ChevronLeft size={20} />
                        <div className='flex items-center gap-2'>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.448 1.056a.8.8 0 0 0-1.442.912l1.303 4.104-3.51-3.51a.8.8 0 0 0-1.132 1.132l3.51 3.51-4.104-1.303a.8.8 0 0 0-.912 1.442l4.104 1.303L6.75 12.45a.8.8 0 0 0 1.131 1.13L11.39 10.07l1.304 4.105a.8.8 0 0 0 1.442-.912L12.833 9.16l3.51 3.51a.8.8 0 0 0 1.132-1.132l-3.51-3.51 4.104 1.303a.8.8 0 0 0 .912-1.442L14.88 6.61l3.51-3.51a.8.8 0 1 0-1.13-1.132L13.75 5.48 12.449 1.056Z" fill="#7B59FF"/>
                                <path d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm0-1.6a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="#7B59FF"/>
                            </svg>
                            <span className="font-semibold text-lg text-gray-800">monto</span>
                        </div>
                    </button>
                </div>
                <div className="overflow-y-auto flex-1">
                    <DesignSystemSidebar activeItem={activeItem} onSelectItem={setActiveItem} />
                </div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b h-[65px] flex-shrink-0 flex items-center px-8">
                    <h1 className="text-xl font-bold text-gray-900">{activeItemData?.label}</h1>
                </header>
                <div className="flex-1 overflow-y-auto p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default DesignSystemPlayground;
