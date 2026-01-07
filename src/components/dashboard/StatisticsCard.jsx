const StatisticsCard = ({ title, value, icon: Icon, isDark = false, color }) => {
    const colorVariants = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    const iconStyle = color
        ? colorVariants[color]
        : (isDark ? 'bg-blue-50 text-[#1e40af]' : 'bg-gray-50 text-primary');

    return (
        <div className={`
             rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-col justify-between gap-1 md:gap-2 transition-transform hover:scale-[1.02]
            ${isDark
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-white shadow-sm border border-gray-100'}
        `}>
            <div className="flex items-start justify-between mb-1 md:mb-2 text-right">
                <div className={`
                w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0
                ${iconStyle}
            `}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 truncate ml-1">
                    {value}
                </h3>
            </div>

            <div>
                <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-tight md:tracking-normal">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default StatisticsCard;
