
import MontoIcon from '@/components/MontoIcon';

const BrandAssets = () => {
    return (
        <div className="space-y-8 max-w-md">
            <div>
                <h3 className="text-lg font-semibold mb-4">Logo</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                    <img src="/monto-logo.svg" alt="Monto Logo" className="h-10" />
                    <span className="font-semibold text-xl">monto</span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Icon</h3>
                <div className="flex items-center justify-center p-4 border rounded-lg bg-white">
                     <MontoIcon className="h-12 w-12" />
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-4">Full Logo Lockup (as in sidebar)</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 p-4 border rounded-lg w-fit bg-white">
                    <div className='flex items-center gap-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.448 1.056a.8.8 0 0 0-1.442.912l1.303 4.104-3.51-3.51a.8.8 0 0 0-1.132 1.132l3.51 3.51-4.104-1.303a.8.8 0 0 0-.912 1.442l4.104 1.303L6.75 12.45a.8.8 0 0 0 1.131 1.13L11.39 10.07l1.304 4.105a.8.8 0 0 0 1.442-.912L12.833 9.16l3.51 3.51a.8.8 0 0 0 1.132-1.132l-3.51-3.51 4.104 1.303a.8.8 0 0 0 .912-1.442L14.88 6.61l3.51-3.51a.8.8 0 1 0-1.13-1.132L13.75 5.48 12.449 1.056Z" fill="#7B59FF"/>
                            <path d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm0-1.6a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="#7B59FF"/>
                        </svg>
                        <span className="font-semibold text-lg text-gray-800">monto</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandAssets;
