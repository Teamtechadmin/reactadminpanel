import { Tab, Tabs } from "@mui/material";
import React, { SetStateAction } from "react";

interface TabOptions {
  label: string;
  value: string;
}

interface TabListProps {
  tabOptions: TabOptions[];
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  handleTabChange?: () => void;
}

const TabList = (props: TabListProps) => {
  const { tabOptions, value, setValue, handleTabChange } = props;

  function handleChange(_e: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
    handleTabChange && handleTabChange();
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor={"primary"}
      indicatorColor="primary"
      aria-label="primary tabs example"
    >
      {tabOptions.map((option) => {
        return (
          <Tab key={option.value} value={option.value} label={option.label} />
        );
      })}
    </Tabs>
  );
};

export default TabList;
