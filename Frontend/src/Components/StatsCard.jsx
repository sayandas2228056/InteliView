import React, { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import PropTypes from 'prop-types';

// Memoized icon component to prevent unnecessary re-renders
const TrendIcon = memo(({ trendUp }) => 
  trendUp ? (
    <TrendingUp 
      className="h-4 w-4 text-green-500 mr-1" 
      aria-hidden="true" 
    />
  ) : (
    <TrendingDown 
      className="h-4 w-4 text-red-500 mr-1" 
      aria-hidden="true" 
    />
  )
);

TrendIcon.displayName = 'TrendIcon';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp = true,
  loading = false,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600'
}) => {
  // Memoize the trend text color class
  const trendTextColor = useMemo(
    () => trendUp ? 'text-green-500' : 'text-red-500',
    [trendUp]
  );

  // Skeleton loader for the card
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 h-full"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 
            id={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}
            className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            {title}
          </h3>
          <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div 
          className={`p-2 sm:p-3 ${iconBgColor} ${iconColor} rounded-full`}
          aria-hidden="true"
        >
          {React.cloneElement(icon, { 
            className: `h-5 w-5 sm:h-6 sm:w-6 ${icon.props.className || ''}` 
          })}
        </div>
      </div>
      {trend && (
        <div 
          className="mt-3 sm:mt-4 flex items-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <TrendIcon trendUp={trendUp} />
          <span className={`text-xs sm:text-sm font-medium ${trendTextColor}`}>
            {trend}
          </span>
        </div>
      )}
    </article>
  );
};

// Prop types for better development experience
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  trend: PropTypes.string,
  trendUp: PropTypes.bool,
  loading: PropTypes.bool,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string
};

// Default props
StatsCard.defaultProps = {
  trend: null,
  trendUp: true,
  loading: false,
  iconBgColor: 'bg-blue-50 dark:bg-blue-900/30',
  iconColor: 'text-blue-600 dark:text-blue-400'
};

// Memoize the component to prevent unnecessary re-renders
export default memo(StatsCard, (prevProps, nextProps) => {
  // Only re-render if any of these props change
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.trend === nextProps.trend &&
    prevProps.trendUp === nextProps.trendUp &&
    prevProps.loading === nextProps.loading
  );
});