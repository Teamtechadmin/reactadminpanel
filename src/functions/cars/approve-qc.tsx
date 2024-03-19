interface ApproveQCAction {
  id: string;
  updateCar: any;
  handleSuccess: (message: string, isList?: boolean) => void;
  isList?: boolean;
}

export function handleApproveQC(props: ApproveQCAction) {
  const { handleSuccess, id, updateCar, isList } = props;
  updateCar.mutate(
    {
      body: {
        qcStatus: "VERIFIED",
      },
      id,
    },
    {
      onSuccess: () => {
        handleSuccess("QC Approved Successfully", isList);
      },
    },
  );
}
