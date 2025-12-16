const StatisticsCard = ({ title, value, icon: Icon, isDark = false }) => {
    return (
        <div className={`
             rounded-2xl p-4 flex flex-col justify-between gap-4 transition-transform hover:scale-[1.02]
            ${isDark
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-white shadow-sm border border-gray-100'}
        `}>
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${isDark ? 'bg-blue-50 text-[#1e40af]' : 'bg-gray-50 text-primary'}
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
