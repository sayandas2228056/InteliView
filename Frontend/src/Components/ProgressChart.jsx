import React, { useMemo, useCallback, memo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Memoized color array to prevent recreation on each render
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

// Memoized CustomTooltip to prevent unnecessary re-renders
const CustomTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
      <p className="text-white font-medium">{label}</p>
      {payload.map((entry, index) => (
        <p 
          key={`tooltip-${index}`} 
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
});

CustomTooltip.displayName = 'CustomTooltip';

// Memoized chart components to prevent unnecessary re-renders
const ChartWrapper = memo(({ children, className = '' }) => (
  <div className={`h-[300px] w-full ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
));

ChartWrapper.displayName = 'ChartWrapper';

export const WeeklyActivityChart = memo(({ data = [] }) => {
  // Memoize chart to prevent re-renders when parent re-renders
  const chart = useMemo(() => (
    <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis 
        dataKey="day" 
        stroke="#9CA3AF" 
        tick={{ fontSize: 12 }}
      />
      <YAxis 
        stroke="#9CA3AF" 
        tickFormatter={(value) => value}
        tick={{ fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ 
          color: '#9CA3AF',
          fontSize: '0.75rem',
          paddingTop: '10px'
        }} 
      />
      <Bar 
        dataKey="practice" 
        fill="#3B82F6" 
        name="Practice Sessions" 
        radius={[4, 4, 0, 0]}
      />
      <Bar 
        dataKey="interviews" 
        fill="#10B981" 
        name="AI Interviews" 
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  ), [data]);

  return <ChartWrapper>{chart}</ChartWrapper>;
});

export const AccuracyChart = memo(({ data = [] }) => {
  // Memoize the renderCustomizedLabel function
  const renderCustomizedLabel = useCallback(({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    name 
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }, []);

  // Memoize chart to prevent re-renders when parent re-renders
  const chart = useMemo(() => (
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        animationBegin={0}
        animationDuration={800}
        animationEasing="ease-out"
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
            stroke="#1F2937"
            strokeWidth={1}
          />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ 
          color: '#9CA3AF',
          fontSize: '0.75rem',
          paddingTop: '10px'
        }} 
      />
    </PieChart>
  ), [data, renderCustomizedLabel]);

  return <ChartWrapper>{chart}</ChartWrapper>;
});

export const ScoreOverTimeChart = memo(({ data = [] }) => {
  // Memoize chart to prevent re-renders when parent re-renders
  const chart = useMemo(() => (
    <LineChart 
      data={data} 
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis 
        dataKey="date" 
        stroke="#9CA3AF" 
        tick={{ fontSize: 12 }}
      />
      <YAxis 
        stroke="#9CA3AF" 
        tick={{ fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ 
          color: '#9CA3AF',
          fontSize: '0.75rem',
          paddingTop: '10px'
        }} 
      />
      <Line 
        type="monotone" 
        dataKey="practiceScore" 
        stroke="#3B82F6" 
        name="Practice Score" 
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
      />
      <Line 
        type="monotone" 
        dataKey="interviewScore" 
        stroke="#10B981" 
        name="Interview Score" 
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
      />
    </LineChart>
  ), [data]);

  return <ChartWrapper>{chart}</ChartWrapper>;
});

// Set display names for debugging
WeeklyActivityChart.displayName = 'WeeklyActivityChart';
AccuracyChart.displayName = 'AccuracyChart';
ScoreOverTimeChart.displayName = 'ScoreOverTimeChart';