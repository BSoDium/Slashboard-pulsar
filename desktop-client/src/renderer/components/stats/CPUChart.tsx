import React from 'react';

import { ParentSize } from '@visx/responsive';
import { Chart, Point, Line } from 'renderer/components/stats/Chart';
import defaultStyles from 'renderer/components/stats/ChartStyles';
import OWStack from 'renderer/utils/OWStack';
import ColorGen from 'renderer/utils/ColorGen';

interface CPUChartProps {
  coreStates: any[];
  duration: number;
}

interface CPUChartState {}

/**
 * A chart showing cpu usage accross time.
 */
class CPUChart extends React.Component<CPUChartProps, CPUChartState> {
  data: Array<OWStack<Point>>;

  constructor(props: CPUChartProps) {
    super(props);

    // instantiate and initialize stacks
    this.data = new Array<OWStack<Point>>(this.props.coreStates.length);

    const { duration } = this.props;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = new OWStack<Point>(duration, (i) => {
        const t = new Date();
        t.setSeconds(t.getSeconds() - duration + i);
        return {
          value: 0,
          date: t,
          style: defaultStyles.pointStyle,
        };
      });
    }
  }

  render() {
    const { coreStates } = this.props;
    // convert the Array of stacks to an array of Lines
    const arrayData = new Array<Line>();
    for (let i = 0; i < this.data.length; i++) {
      // push the new cpu values for each core
      this.data[i].push({
        value: coreStates[i].load,
        date: new Date(),
        style: defaultStyles.pointStyle,
      });

      // push each new Line to the previously created array
      arrayData.push({
        data: this.data[i].toArray(),
        style: {
          cursor: 'auto',
          stroke: ColorGen.generate(i),
          strokeWidth: 2,
          strokeOpacity: 1,
          shapeRendering: 'geometricPrecision',
        },
      });
    }

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

export default CPUChart;
