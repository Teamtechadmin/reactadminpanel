interface ApproveQCAction {
  id: string;
  updateCar: any;
  handleSuccess: (message: string) => void;
}

export function handleApproveQC(props: ApproveQCAction) {
  const { handleSuccess, id, updateCar } = props;
  updateCar.mutate(
    {
      body: {
        qcStatus: "VERIFIED",
      },
      id,
    },
    {
      onSuccess: () => handleSuccess("QC Approved Successfully"),
    },
  );
}
