import React from "react";
import { Grid } from "@material-ui/core";

export default function Header({}) {
  return (
    <Grid
      container
      style={{
        backgroundColor: "#4286f4",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <span style={{ fontSize: 25, fontStyle: "oblique", color: "#fff" }}>
          DeliveryEat!
        </span>
      </Grid>
    </Grid>
  );
}
