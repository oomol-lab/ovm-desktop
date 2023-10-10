export * from "./OoProjectCardSkeleton";

export interface OoProjectItem {
  id: string;
  name: string;
  user: string;
  createTime: Date;
  description: string;
  lastUpdateTime?: string;
}
