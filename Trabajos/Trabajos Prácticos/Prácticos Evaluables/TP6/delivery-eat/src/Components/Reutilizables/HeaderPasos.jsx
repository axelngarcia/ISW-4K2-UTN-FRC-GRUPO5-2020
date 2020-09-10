import React from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function HeaderPasos({ titulo, detalle, paso, setPasos }) {
  return (
    <div>
      <Divider />
      <Grid
        container
        style={{ backgroundColor: "#4286f4", paddingTop: 8, paddingBottom: 8 }}
      >
        <Grid item xs={2} style={{ textAlign: "center" }}>
          {paso !== null && (
            <IconButton
              aria-label="delete"
              style={{ padding: 0 }}
              onClick={() => setPasos(paso - 1)}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={8} style={{ textAlign: "center" }}>
          <span style={{ fontSize: 15, fontWeight: "bold" }}>{titulo}</span>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "center" }}></Grid>
      </Grid>

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <label style={{ fontSize: 17 }}>{detalle}</label>
        </Grid>
      </Grid>
    </div>
  );
}
