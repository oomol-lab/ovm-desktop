import type { OoDeviceInfoItem } from ".";

import { DeviceInfoCell } from "./DeviceInfoCell";
import { OoDeviceInfoCellSkeleton } from "./OoDeviceInfoCellSkeleton";

export interface OoDeviceInfoListProps {
  deviceInfoList: OoDeviceInfoItem[];
  skeletonLength?: number;
  loading?: boolean;
}
export const DeviceInfoList = ({
  deviceInfoList,
  skeletonLength,
  loading,
}: OoDeviceInfoListProps) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({
      length: skeletonLength ? skeletonLength : defaultSkeletonCount,
    }).map((_, index) => <OoDeviceInfoCellSkeleton key={index} />);
  return (
    <>
      {!loading &&
        deviceInfoList.map(deviceInfoItem => (
          <div key={deviceInfoItem.key}>
            <DeviceInfoCell item={deviceInfoItem} />
          </div>
        ))}
      {skeletonList}
    </>
  );
};
