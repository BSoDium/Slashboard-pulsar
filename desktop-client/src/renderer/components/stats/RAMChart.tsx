import React from 'react';

import { ParentSize } from '@visx/responsive';
import { Chart, Point, Line } from 'renderer/components/stats/Chart';
import defaultStyles from 'renderer/components/stats/ChartStyles';
import OWStack from 'renderer/utils/OWStack';

interface RAMChartProps {
  memoryState: any;
  duration: number;
}

interface RAMChartState {}

/**
 * A chart showing cpu usage accross time.
 */
class RAMChart extends React.Component<RAMChartProps, RAMChartState> {
  data: OWStack<Point>;

  constructor(props: RAMChartProps) {
    super(props);

    // instantiate and initialize stack
    const { duration } = this.props;
    this.data = new OWStack<Point>(duration, (i) => {
      const t = new Date();
      t.setSeconds(t.getSeconds() - duration + i);
      return {
        value: 0,
        date: t,
        style: defaultStyles.pointStyle,
      };
    });
  }

  render() {
    const { memoryState } = this.props;

    // convert the Array of stacks to an array of Lines
    const arrayData = new Array<Line>();
    this.data.push({
      value: memoryState.free,
      date: new Date(),
      style: defaultStyles.pointStyle,
    });

    arrayData.push({
      data: this.data.toArray(),
      style: {
        cursor: 'auto',
        stroke: '#cc0f0f',
        strokeWidth: 2,
        strokeOpacity: 1,
        shapeRendering: 'geometricPrecision',
      },
    });

    return (
      <div className="server-chart">
        <ParentSize>
          {(parent) => {
            return <Chart data={arrayData} width={parent.width} height={300} />;
          }}
        </ParentSize>
      </div>
    );
  }
}

export default RAMChart;
