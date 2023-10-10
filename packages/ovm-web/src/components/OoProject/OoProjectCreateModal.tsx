import type { FC } from "react";

import { Input, Modal } from "antd";
import { useCallback, useState } from "react";
import { useTranslate } from "val-i18n-react";

export interface OoProjectCreateModalProps {
  open: boolean;
  loadingStatus: boolean;
  onCancel: () => void;
  onCreateProject: (projectName: string) => void;
  isValidProjectName: (projectName: string) => boolean;
}

export const OoProjectCreateModal: FC<OoProjectCreateModalProps> = ({
  open,
  loadingStatus,
  isValidProjectName,
  onCancel,
  onCreateProject,
}) => {
  const t = useTranslate();
  const [projectName, setProjectName] = useState<string>("");

  const onCreate = useCallback(() => {
    if (projectName && isValidProjectName(projectName)) {
      onCreateProject(projectName);
    }
  }, [projectName, onCreateProject]);

  return (
    <Modal
      title={t("oo-project.create-modal-title")}
      open={open}
      okText={"Next Step"}
      cancelText={"Cancel"}
      onCancel={onCancel}
      onOk={onCreate}
      confirmLoading={loadingStatus}
      closable={false}
      okButtonProps={{
        disabled: !projectName || !isValidProjectName(projectName),
      }}
    >
      <Input
        placeholder={"t('oo-project.create-modal-input-placeholder')"}
        onChange={ev => {
          setProjectName(ev.target.value);
        }}
        status={
          !projectName || isValidProjectName(projectName) ? undefined : "error"
        }
        value={projectName}
        onPressEnter={onCreate}
      />
    </Modal>
  );
};
