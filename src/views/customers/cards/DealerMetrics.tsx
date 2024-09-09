import { MetricsCard } from "@/components/ui/utility/MetricsCard";
import { metrics } from "@/data/dealers/metrics";
import { Grid } from "@mui/material";

export const DealerMetrics = () => {
  return (
    <Grid display={"flex"} justifyContent={"space-between"} marginTop={4}>
      {metrics.map((metric) => {
        return (
          <MetricsCard
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
          />
        );
      })}
    </Grid>
  );
};
