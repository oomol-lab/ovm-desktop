import type { MembersInfoDataType } from ".";

import { MembersInfoCell } from "./MembersInfoCell";
import { MembersInfoSkeleton } from "./MembersInfoSkeleton";

export interface LinkAccountListProps {
  membersInfoList: MembersInfoDataType[];
  skeletonLength?: number;
  loading?: boolean;
}

export const MembersInfoList = ({
  membersInfoList,
  skeletonLength,
  loading,
}: LinkAccountListProps) => {
  const defaultSkeletonCount = 10;
  const skeletonList =
    loading &&
    Array.from({
      length: skeletonLength ? skeletonLength : defaultSkeletonCount,
    }).map((_, index) => <MembersInfoSkeleton key={index} />);

  return (
    <>
      {!loading &&
        membersInfoList.map(membersInfo => (
          <div key={membersInfo.valueType}>
            <MembersInfoCell item={membersInfo} />
          </div>
        ))}
      {skeletonList}
    </>
  );
};
