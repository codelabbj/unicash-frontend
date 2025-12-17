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
             rounded-3xl p-4 flex flex-col justify-between gap-2 transition-transform hover:scale-[1.02]
            ${isDark
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-white shadow-sm border border-gray-100'}
        `}>
            <div className="flex items-start justify-between mb-2">
                <div className={`
                w-10 h-10 rounded-2xl flex items-center justify-center
                ${iconStyle}
            `}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {value}
                </h3>
            </div>

            <div>
                <p className="text-xs font-medium text-gray-500">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default StatisticsCard;
