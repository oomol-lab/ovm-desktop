import styles from "./OoProjectItem.module.scss";

import type { MenuProps } from "antd";

import { Dropdown } from "antd";
import classnames from "classnames";

import { randomProjectItemGradient } from "./utils";

export interface OoProjectItemProps {
  projectItemName: string;
  isProjectItemAdded: boolean;
  isWorkspaceProjectItem: boolean;
  background?: string;
  icon?: string;
  dropdownMenu?: MenuProps;
  onClickBtn?: () => void;
}

export const OoProjectItem: React.FC<OoProjectItemProps> = ({
  projectItemName,
  isProjectItemAdded,
  isWorkspaceProjectItem,
  background,
  icon,
  dropdownMenu,
  onClickBtn,
}) => {
  const canAddProjectItemToWorkspace =
    !isProjectItemAdded && !isWorkspaceProjectItem;
  return (
    <Dropdown
      disabled={!isWorkspaceProjectItem}
      menu={dropdownMenu}
      trigger={["contextMenu"]}
    >
      <div
        className={styles.container}
        style={{ background: background ?? randomProjectItemGradient() }}
      >
        <div className={styles.iconBox}>
          <div className={`${styles.icon} ${icon ?? "i-mdi-all-inclusive"}`} />
          <div
            onClick={onClickBtn}
            className={classnames(styles.icon, {
              [`${styles.icon} i-mdi-chevron-right-circle`]:
                isWorkspaceProjectItem,
              "i-mdi-checkbox-marked-circle":
                !isWorkspaceProjectItem && isProjectItemAdded,
              "i-mdi-plus-circle-outline": canAddProjectItemToWorkspace,
            })}
          />
        </div>
        <div className={styles.projectItemName}>{projectItemName}</div>
      </div>
    </Dropdown>
  );
};
