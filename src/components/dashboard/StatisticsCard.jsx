const StatisticsCard = ({ title, value, icon: Icon, isDark = false, color }) => {
    const colorVariants = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    const iconStyle = color
        ? colorVariants[color]
        : (isDark ? 'bg-white-50 text-[#ffffff]' : 'bg-gray-50 text-primary');

    return (
        <div className={`
             rounded-2xl p-4 flex flex-col justify-between gap-4 transition-transform hover:scale-[1.02]
            ${isDark
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-white shadow-sm border border-gray-100'}
        `}>
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${iconStyle}
            `}>
                <Icon className="w-5 h-5" />
            </div>

            <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {value}
                </h3>
                <p className="text-xs md:text-sm font-medium text-gray-500">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default StatisticsCard;
