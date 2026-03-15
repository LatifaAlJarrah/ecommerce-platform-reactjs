export default function ProductCardSkeleton() {
    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
            {/* Image placeholder */}
            <div className="relative overflow-hidden aspect-square bg-gray-100">
                <div className="w-full h-full bg-gray-200" />
                <div className="absolute top-3 left-3 h-6 w-20 bg-gray-200 rounded-full" />
                <div className="absolute top-3 right-3 h-8 w-8 bg-gray-200 rounded-full" />
            </div>

            {/* Content placeholder */}
            <div className="p-4 flex flex-col flex-1 space-y-3">
                <div className="h-3 w-16 bg-gray-200 rounded-full" />
                <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-full" />

                <div className="flex items-center gap-2 mt-1">
                    <div className="h-4 w-20 bg-gray-200 rounded-full" />
                    <div className="h-3 w-10 bg-gray-200 rounded-full" />
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

