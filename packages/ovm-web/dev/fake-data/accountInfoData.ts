export const accountInfoData = () => {
  return [
    {
      key: "1",
      state: true,
      name: "手机号码",
      account: "138****8293",
    },
    {
      key: "2",
      state: true,
      name: "邮箱",
      account: "wushuang@oomol.com",
    },
    {
      key: "3",
      state: true,
      name: "账户密码",
      account: "已经设置，可以通过账户密码登录",
    },
    {
      key: "4",
      state: true,
      name: "个人路径",
      account: "https://www.yuque.com/wushuang",
    },
  ];
};
export type AccountInfoType = {
  key: string;
  state: boolean;
  name: string;
  account: string;
};
