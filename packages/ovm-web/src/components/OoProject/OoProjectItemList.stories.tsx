import type { OoProjectItemListProps } from "./OoProjectItemList";
import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import { OoProjectItemList } from "./OoProjectItemList";

import { i18n } from "~sb/i18n";

const storyMeta: Meta = {
  title: "OoProject/OoProjectItemList",
  component: OoProjectItemList,
};

export default storyMeta;

export const OverView: StoryObj<OoProjectItemListProps> = {
  args: {
    OoProjectItems: Array(12)
      .fill(0)
      .map((_, index) => {
        return {
          projectItemName: `Project Node ${index + 1}`,
          isProjectItemAdded: true,
          isWorkspaceProjectItem: true,
          icon: "i-mdi-all-inclusive",
          dropdownMenu: {
            items: [
              {
                label: i18n.t("oo-project.open-project"),
                key: "open-project",
                onClick: action("open-project"),
              },
              {
                label: i18n.t("oo-project.edit-project"),
                key: "edit-project",
                onClick: action("edit-project"),
              },
              {
                label: i18n.t("oo-project.delete-project"),
                key: "delete-project",
                onClick: action("delete-project"),
              },
            ],
          },
        };
      }),
  },
};
