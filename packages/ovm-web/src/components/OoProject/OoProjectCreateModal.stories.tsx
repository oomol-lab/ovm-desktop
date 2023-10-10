import type { OoProjectCreateModalProps } from "./OoProjectCreateModal";
import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";

import { OoProjectCreateModal } from "./OoProjectCreateModal";

const storyMeta: Meta = {
  title: "OoProject/OoProjectCreateModal",
  component: OoProjectCreateModal,
};

export default storyMeta;

export const Overview: StoryObj<OoProjectCreateModalProps> = {
  args: {
    open: true,
    loadingStatus: false,
    onCancel: action("onCancel"),
    onCreateProject: action("onCreateProject"),
    isValidProjectName: (projectName: string) => {
      return projectName.length > 0;
    },
  },
};
