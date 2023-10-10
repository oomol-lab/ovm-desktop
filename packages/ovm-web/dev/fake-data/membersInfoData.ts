import { MembersInfoValueTypeEnum } from "~/routes/Settings/MembersInfo";

export const membersInfoData = () => {
  return [
    {
      valueType: MembersInfoValueTypeEnum.CUP,
      used_value: 30,
      total_value: 100,
    },
    {
      valueType: MembersInfoValueTypeEnum.GPU,
      used_value: 200,
      total_value: 1000,
    },
  ];
};
