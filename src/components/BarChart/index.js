import BarChartWrapper from 'components/BarChartWrapper';
import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import { theme } from 'ui/theme-color';



const RenderBarChart = ({ data, height }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barSize, setBarSize] = useState(43);

  const handleClick = useCallback((entry, index) => {
    setActiveIndex(index);
  }, []);

  // Update bar size based on window width
  useEffect(() => {
    const updateBarSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBarSize(9);
      } else {
        setBarSize(43);
      }
    };

    window.addEventListener('resize', updateBarSize);
    updateBarSize();

    return () => window.removeEventListener('resize', updateBarSize);
  }, []);

  const renderLabelList = ({ x, y, value, index }) => (
    <text
      x={x + (barSize / 2)}
      y={y}
      dy={-10}
      fill={index === activeIndex ? theme.palette.colors.white : "none"}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={window.innerWidth < 768 ? 10 : 14}
      fontFamily="Inter"
      fontWeight={700}
    >
      {value}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{
            fill: theme.palette.colors.white,
            fontSize: 12,
            fontFamily: "Inter",
            fontWeight: 700,
          }}
        />

        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          onClick={handleClick}
          barSize={barSize}
        >
          <LabelList
            dataKey="value"
            content={renderLabelList}
            style={{ fill: theme.palette.colors.white }}
          />
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              cursor="pointer"
              fill={index === activeIndex ? theme.palette.colors.orange : theme.palette.colors.lightBlue}
              radius={10}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RenderBarChart;