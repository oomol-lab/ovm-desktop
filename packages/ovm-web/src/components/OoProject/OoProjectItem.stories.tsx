import type { OoProjectItemProps } from "./OoProjectItem";
import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import { OoProjectItem } from "./OoProjectItem";

import { i18n } from "~sb/i18n";

const storyMeta: Meta = {
  title: "OoProject/OoProjectItem",
  component: OoProjectItem,
};

export default storyMeta;

export const Overview: StoryObj<OoProjectItemProps> = {
  args: {
    projectItemName: "Project Node",
    isProjectItemAdded: false,
    isWorkspaceProjectItem: false,
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
  },
};
