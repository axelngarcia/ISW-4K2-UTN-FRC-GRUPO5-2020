import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Header from "./Header";
import Pedido from "./Pedido";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Principal({}) {
  const [tipoPedido, setTipoPedido] = useState(null);
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ height: 625 }}>
            <Header />
            <CardContent style={{ padding: 0 }}>
              {!tipoPedido ? (
                <Grid
                  container
                  style={{
                    paddingTop: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    textAlign: "center",
                  }}
                >
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Seleccionar tipo pedido
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={tipoPedido}
                      onChange={(e) => setTipoPedido(e.target.value)}
                    >
                      <MenuItem value={1}>Lo que sea</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid item xs="12">
                    <label style={{ fontSize: 25, color: "rgb(66, 134, 244)" }}>
                      ¡Comenzá a armar tu pedido!
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="210"
                      height="310"
                    >
                      <g id="Outline">
                        <g>
                          <path d="M40,60H9V48a1,1,0,0,0-2,0V61a1,1,0,0,0,1,1H40a1,1,0,0,0,0-2Z" />
                          <path d="M51,10h2a4,4,0,0,0,0-8H18a5.006,5.006,0,0,0-5,5v.482a13.221,13.221,0,0,1-1.463,5.931A43.327,43.327,0,0,0,7,32.662V44a1,1,0,0,0,2,0V32.662a41.307,41.307,0,0,1,4.327-18.356A15.208,15.208,0,0,0,15,7.482V7a3,3,0,0,1,3-3H49.537A3.97,3.97,0,0,0,49,6v4.742a43.11,43.11,0,0,0-6,21.92V61a1,1,0,0,0,1,1H56a1,1,0,0,0,1-1V43a1,1,0,0,0-2,0V58.3l-4-4.666V49a1,1,0,0,0-2,0v4.631L45,58.3V32.662A41.112,41.112,0,0,1,49,15V25a1,1,0,0,0,2,0V15a41.112,41.112,0,0,1,4,17.665V39a1,1,0,0,0,2,0V32.662a43.11,43.11,0,0,0-6-21.92ZM50,55.537,53.826,60H46.174ZM53,4a2,2,0,0,1,0,4H51V6A2,2,0,0,1,53,4Z" />
                          <path d="M50,30a1,1,0,0,0-1,1V43a1,1,0,0,0,2,0V31A1,1,0,0,0,50,30Z" />
                          <path d="M15,34.424a4.972,4.972,0,0,0-1,8.55V45a2.985,2.985,0,0,0,1,2.22V49a5.006,5.006,0,0,0,5,5H32a5.006,5.006,0,0,0,5-5V47.22A2.985,2.985,0,0,0,38,45V42.974a4.972,4.972,0,0,0-1-8.55V33a5.006,5.006,0,0,0-5-5H30a1,1,0,0,0,0,2h2a3,3,0,0,1,3,3v1H17V33a3,3,0,0,1,3-3h6a1,1,0,0,0,0-2H20a5.006,5.006,0,0,0-5,5ZM35,36v.236a1.3,1.3,0,0,1-.258.775l-1.055,1.406a1.291,1.291,0,0,1-1.886.193l-.945-.832a3.292,3.292,0,0,0-4.666.317l-.334.387a1.291,1.291,0,0,1-1.89.068l-.99-.991a3.285,3.285,0,0,0-4.021-.5A1.287,1.287,0,0,1,17.006,36Zm0,13a3,3,0,0,1-3,3H20a3,3,0,0,1-3-3V48h1.586l3.707,3.707A1,1,0,0,0,23,52a.959.959,0,0,0,.16-.013,1,1,0,0,0,.734-.54l1.38-2.759,3.019,3.019A1,1,0,0,0,29,52a.959.959,0,0,0,.16-.013,1,1,0,0,0,.734-.54L31.618,48H35ZM21.414,48h1.968l-.656,1.312Zm6,0h1.968l-.656,1.312ZM38,39a3,3,0,0,1-3,3H33a1,1,0,0,0,0,2h2a5,5,0,0,0,1-.1V45a1,1,0,0,1-1,1H17a1,1,0,0,1-1-1V43.9a5,5,0,0,0,1,.1H29a1,1,0,0,0,0-2H17a2.987,2.987,0,0,1-1.91-5.294,3.288,3.288,0,0,0,4.893,2.072,1.286,1.286,0,0,1,1.578.194l.99.992a3.293,3.293,0,0,0,4.818-.174L27.7,39.4a1.291,1.291,0,0,1,.89-.444,1.278,1.278,0,0,1,.941.32l.944.832a3.3,3.3,0,0,0,2.179.822c.112,0,.223-.006.335-.017a3.3,3.3,0,0,0,2.3-1.3l1.056-1.407a3.309,3.309,0,0,0,.615-1.464A2.979,2.979,0,0,1,38,39Z" />
                          <path d="M18.051,13.684l-2,6A1,1,0,0,0,17,21H38a1,1,0,0,0,.948-.684l2-6A1,1,0,0,0,40,13H19A1,1,0,0,0,18.051,13.684ZM38.612,15l-1.333,4H18.387l1.334-4Z" />
                          <path d="M21,23a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2Z" />
                          <path d="M36,11a1,1,0,0,0,0-2H24a1,1,0,0,0,0,2Z" />
                        </g>
                      </g>
                    </svg>
                  </Grid>
                </Grid>
              ) : (
                <Pedido setTipoPedido={setTipoPedido} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
