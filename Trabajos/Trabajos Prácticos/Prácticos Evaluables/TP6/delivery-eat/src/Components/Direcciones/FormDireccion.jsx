import React from "react";
import {
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Iframe from "react-iframe";
import { validateMaxLength } from "../utils";

export default function FormDireccion({
  setOpcion,
  opcion,
  setDireccion,
  direccion,
  handleSubmit,
  handleChangeDireccion,
  errorsForm,
  ciudades,
}) {
  return (
    <div>
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <ButtonGroup fullWidth size="medium">
            <Button
              style={{ fontSize: 12, paddingLeft: 0, paddingRight: 0 }}
              variant={opcion === 1 ? "outlined" : "contained"}
              onClick={() => {
                setOpcion(1);
              }}
            >
              Ingresar dirección
            </Button>
            <Button
              style={{ fontSize: 12, paddingLeft: 0, paddingRight: 0 }}
              variant={opcion === 2 ? "outlined" : "contained"}
              onClick={() => {
                setTimeout(() => {
                  let dire = { calle: "Colon", nro: 100, ciudad: 1 };
                  setDireccion({
                    ...direccion,
                    calle: dire.calle,
                    nro: dire.nro,
                    ciudad: dire.ciudad,
                  });
                }, 2200);
                setOpcion(2);
              }}
            >
              Seleccionar en mapa
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {opcion === 1 ? (
        <form onSumbit={(e) => handleSubmit(e)}>
          <Grid container style={{ padding: 8 }}>
            <Grid item xs={9} style={{ paddingBottom: 8 }}>
              <TextField
                autoComplete="off"
                id="calle"
                fullWidth
                label="Calle*"
                variant="outlined"
                size="small"
                name="calle"
                value={direccion.calle}
                onChange={(e) => handleChangeDireccion(e)}
                error={errorsForm.calle ? true : false}
              />
              <label
                hidden={errorsForm.calle ? false : true}
                style={{ fontSize: 13, color: "red" }}
              >
                {errorsForm.calle}
              </label>
            </Grid>

            <Grid item xs={3} style={{ paddingBottom: 8, paddingLeft: 2 }}>
              <TextField
                autoComplete="off"
                id="nro"
                onInput={validateMaxLength}
                fullWidth
                label="Nro.*"
                variant="outlined"
                size="small"
                name="nro"
                value={direccion.nro}
                onChange={(e) => handleChangeDireccion(e)}
                error={errorsForm.nro ? true : false}
              />
              <label
                hidden={errorsForm.nro ? false : true}
                style={{ fontSize: 13, color: "red" }}
              >
                {errorsForm.nro}
              </label>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 8 }}>
              <FormControl
                id="ciudad"
                variant="outlined"
                fullWidth
                size="small"
                error={errorsForm.ciudad ? true : false}
              >
                <InputLabel id="demo-simple-select-label">Ciudad*</InputLabel>
                <Select
                  name="ciudad"
                  labelId="demo-simple-select-label"
                  value={direccion.ciudad}
                  onChange={(e) => handleChangeDireccion(e)}
                >
                  {ciudades.map((ciudad) => {
                    return (
                      <MenuItem value={ciudad.id}>{ciudad.nombre}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <label
                hidden={errorsForm.ciudad ? false : true}
                style={{ fontSize: 13, color: "red" }}
              >
                {errorsForm.ciudad}
              </label>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 8 }}>
              <TextField
                autoComplete="off"
                id="referencia"
                fullWidth
                label="Referencia"
                variant="outlined"
                size="small"
                name="referencia"
                value={direccion.referencia}
                onChange={(e) => handleChangeDireccion(e)}
              />
            </Grid>
          </Grid>

          <Grid container style={{ padding: 8 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                size="medium"
                fullWidth
                color="primary"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Confirmar comercio
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>
          <Grid container style={{ padding: 8 }}>
            <Grid item sm={12}>
              <Iframe
                url="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=C%C3%B3rdoba%20Argentina+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="322px"
                height="250px"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </Grid>
          </Grid>

          <Grid container style={{ padding: 8 }}>
            <Grid item xs={12}>
              <Button
                size="medium"
                fullWidth
                color="primary"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Confirmar comercio
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
