import React, { useState, useEffect } from "react";
import HeaderPasos from "../Reutilizables/HeaderPasos";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Input,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function ConfirmPedido({
  medioPago,
  productos,
  direccionPersona,
  direccion,
  setPasos,
  ciudades,
  medios,
  tiposEntrega,
  entrega,
  setEntrega,
  errorFecha,
  setErrorFecha,
  confirmarPedido,
}) {
  const [data, setData] = useState({ direcComercio: "", direcPersona: "" });
  const [total, setTotal] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    let newTotal = 0;
    productos.forEach((item) => {
      newTotal = newTotal + item.precio;
    });

    let ciudadComercio = ciudades.filter(
      (ciud) => ciud.id === parseInt(direccion.ciudad)
    );
    let ciudadPersona = ciudades.filter(
      (ciud) => ciud.id === parseInt(direccionPersona.ciudad)
    );

    let dComercio = `${direccion.calle} ${direccion.nro} - ${ciudadComercio[0].nombre}`;
    let dPersona = `${direccionPersona.calle} ${direccionPersona.nro} - ${ciudadPersona[0].nombre}`;

    setData({ ...data, direcComercio: dComercio, direcPersona: dPersona });
    setTotal(parseFloat(newTotal).toFixed(2));
  }, []);

  return (
    <div>
      <HeaderPasos
        titulo="ÚLTIMO PASO"
        detalle="Detalles del pedido"
        paso={5}
        setPasos={setPasos}
      />
      <Divider />
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <LocationOnIcon fontSize="small" />
          <label style={{ fontWeight: "bold" }}>
            Dirección comercio: {data.direcComercio}
          </label>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 8 }}>
          <LocationOnIcon fontSize="small" />
          <label style={{ fontWeight: "bold" }}>
            Dirección Destino: {data.direcPersona}
          </label>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <label style={{ fontWeight: "bold" }}>Mi pedido</label>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 8 }}>
          {productos.map((item) => {
            return (
              <Grid container style={{ paddingBottom: 8 }}>
                <Grid item xs="9">
                  <label>{item.cant}x</label>
                  <label style={{ paddingLeft: 8 }}>{item.nameProducto}</label>
                </Grid>
                <Grid item xs="3">
                  <label>$ {parseFloat(item.precio).toFixed(2)}</label>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid container style={{ textAlign: "right" }}>
        <Grid item xs={12} style={{ paddingRight: 28 }}>
          <label> Total: $ {total}</label>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12} style={{ paddingBottom: 8 }}>
          <label style={{ fontWeight: "bold" }}>Pago</label>
        </Grid>
        <Grid item xs={6} style={{ paddingBottom: 8 }}>
          <label>
            Medio:{" "}
            {
              medios.filter(
                (medio) => medio.id === parseInt(medioPago.medio)
              )[0].nombre
            }
          </label>
        </Grid>
        {medioPago.medio === 2 && (
          <Grid item xs={6} style={{ paddingBottom: 8 }}>
            <label style={{ fontWeight: "bold" }}>VISA - 1 pago</label>
          </Grid>
        )}
      </Grid>
      <Divider />

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12} style={{ paddingBottom: 8 }}>
          <label style={{ fontWeight: "bold" }}>Entrega</label>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 8 }}>
          <FormControl id="entrega" variant="outlined" fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Tiempo entrega
            </InputLabel>
            <Select
              name="tiempoEntrega"
              labelId="demo-simple-select-label"
              value={entrega.valor}
              onChange={(e) => {
                setEntrega({
                  ...entrega,
                  valor: e.target.value,
                  fechaHora: "",
                });
              }}
            >
              {tiposEntrega.map((tipo) => {
                return <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        {entrega.valor === 2 && (
          <Grid item xs={8} style={{ paddingBottom: 8 }}>
            <TextField
              error={errorFecha}
              fullWidth
              variant="outlined"
              size="small"
              label="Fecha y hora"
              type="datetime-local"
              name="fechaVencimiento"
              InputLabelProps={{
                shrink: true,
              }}
              value={entrega.fechaHora}
              onChange={(e) => {
                setErrorFecha(false);
                setEntrega({ ...entrega, fechaHora: e.target.value });
              }}
            />
            <label
              hidden={errorFecha ? false : true}
              style={{ fontSize: 13, color: "red" }}
            >
              La fecha y hora elegida son menores a la de hoy
            </label>
          </Grid>
        )}
      </Grid>
      <Divider />

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={12}>
          <Button
            type="submit"
            size="medium"
            fullWidth
            color="primary"
            variant="contained"
            onClick={(e) => confirmarPedido(e)}
          >
            Confirmar pedido
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
