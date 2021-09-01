import React from 'react';
import hdd from 'renderer/assets/hdd.svg'; // Smashicons
import cpu from 'renderer/assets/cpu.svg'; // Adib Sulthon
import lan from 'renderer/assets/lan.svg'; // Freepik

interface Props {
  data: PulsarResponse['data']['hardware'];
}

export default class Hardware extends React.Component<Props, {}> {
  render() {
    const { data } = this.props;
    return (
      <div className="hardware" style={{ gridArea: 'cpu' }}>
        <div className="hardware-component">
          <div className="title-row">
            <img
              src={cpu}
              alt="cpu"
              className="display-icon hardware-component-description"
            />
            <div className="hardware-component-description">
              <div className="t-impact">{data.cpu.cores.length}</div>
              <h3>Cores</h3>
            </div>
            <div className="hardware-component-description">
              <div className="t-impact">{data.cpu.global.speed / 1000}</div>
              <h3>Ghz</h3>
            </div>
            <div className="hardware-component-description">
              <div className="t-impact">
                {Math.round(data.cpu.global.load)} %
              </div>
              <h3>Load average</h3>
            </div>
          </div>
          <div className="hardware-component-description">
            <h2 style={{ color: '#fff', fontFamily: 'cairo' }}>
              {data.cpu.global.model}
            </h2>
            <h3>Central Processing Unit</h3>
          </div>
        </div>

        <div className="hardware-component" style={{ gridArea: 'net' }}>
          <div className="title-row">
            <img
              src={lan}
              alt="lan"
              className="display-icon hardware-component-description"
            />
            <div className="hardware-component-description">
              <div className="t-impact">
                {Object.keys(data.network.interfaces).length}
              </div>
              <h3>Network interfaces</h3>
            </div>
          </div>
        </div>

        <div className="hardware-component" style={{ gridArea: 'disk' }}>
          <div className="title-row">
            <img
              src={hdd}
              alt="hdd"
              className="display-icon hardware-component-description"
            />
            <div className="hardware-component-description">
              <div className="t-impact">{data.disks.length}</div>
              <h3>Disks mounted</h3>
            </div>
          </div>
          <div className="disk-explorer">
            {data.disks.map(
              (
                disk: {
                  _filesystem: string;
                  _blocks: number;
                  _used: number;
                  _available: number;
                  _capacity: string;
                  _mounted: string;
                },
                index
              ) => (
                <div key={index} className="disk-explorer-item">
                  <div className="disk-explorer-item-description">
                    <div className="t-impact-min">{disk._mounted}</div>
                    <h3>Mount</h3>
                  </div>
                  <div className="disk-explorer-item-description">
                    <div className="t-impact-min">
                      {Math.round(disk._blocks * 1e-9)} GB
                    </div>
                    <h3>Size</h3>
                  </div>
                  <div className="disk-explorer-item-description">
                    <div className="t-impact-min">{disk._capacity}</div>
                    <h3>Used storage</h3>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
