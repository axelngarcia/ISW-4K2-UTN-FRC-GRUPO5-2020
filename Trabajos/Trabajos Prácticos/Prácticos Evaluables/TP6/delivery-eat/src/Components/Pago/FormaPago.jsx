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
} from "@material-ui/core";
import { validMedio, validateMaxLength, calculoPrecio } from "../utils";
import MaskedInput from "react-text-mask";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      style={{ textAlign: "center" }}
      mask={[
        /[1-9]/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      showMask
    />
  );
}

function TextMaskFecha(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      style={{ textAlign: "center" }}
      mask={[/[1-9]/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      showMask
    />
  );
}

export default function FormaPago({
  setPasos,
  medioPago,
  setMedioPago,
  tarjetas,
  medios,
  dataTarjeta,
  setDataTarjeta,
  productos,
}) {
  const [errorsForm, setErrorsForm] = useState({
    medio: null,
    pagaCon: null,
    nroTarjeta: null,
    nombreTitular: null,
    apellidoTitular: null,
    fechaVencimiento: null,
    cvc: null,
  });
  const [montoTotal, setMontoTotal] = useState(0);
  const [cantCarrito, setCantCarrito] = useState(0);
  const [vuelto, setVuelto] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await validMedio(medioPago, dataTarjeta, montoTotal);
    setErrorsForm(res.errors);
    if (!res.invalid) {
      nextStep();
    }
  };

  const nextStep = () => {
    setPasos(5);
  };

  const handleChangeMedio = (e) => {
    let name = e.target.name;
    setMedioPago({
      ...medioPago,
      [e.target.name]: e.target.value,
    });

    if (name === "medio") {
      if (e.target.value === 1) {
        setErrorsForm({
          ...errorsForm,
          nroTarjeta: null,
          nombreTitular: null,
          apellidoTitular: null,
          fechaVencimiento: null,
          cvc: null,
          medio: null,
        });
        setDataTarjeta({
          nroTarjeta: "",
          nombreTitular: "",
          apellidoTitular: "",
          fechaVencimiento: "",
          cvc: "",
        });
      } else if (e.target.value === 2) {
        setMedioPago({ ...medioPago, pagaCon: "", medio: 2 });
        setErrorsForm({ ...errorsForm, pagaCon: null, medio: null });
      }
    } else {
      setErrorsForm({ ...errorsForm, [e.target.name]: null });
      if (name === "pagaCon") {
        calculoVuelto(e.target.value);
      }
    }
  };

  const handleChangeTarjeta = (e) => {
    setDataTarjeta({
      ...dataTarjeta,
      [e.target.name]: e.target.value,
    });
    setErrorsForm({ ...errorsForm, [e.target.name]: null });
  };

  useEffect(() => {
    let total = 0;
    let cant = 0;
    productos.map((prod) => {
      let res = calculoPrecio(prod); //Calcula el precio total de cada ítem de carrito
      prod.precio = res;
      cant = cant + parseInt(prod.cant);
      total = total + res;
    });

    setMontoTotal(parseFloat(total).toFixed(2));
    setCantCarrito(cant);
  }, []);

  const calculoVuelto = (value) => {
    let vuelto = 0;
    vuelto = (parseFloat(value) - parseFloat(montoTotal)).toFixed(2);
    setVuelto(vuelto);
  };

  return (
    <div>
      <HeaderPasos
        titulo="PAGO"
        detalle="Ingrese la forma de pago"
        paso={4}
        setPasos={setPasos}
      />

      <Grid container style={{ padding: 8 }}>
        <Grid item xs={7} style={{ paddingRight: 8 }}>
          <label style={{ fontWeight: "bold" }}>
            Cant. de productos: {cantCarrito}
          </label>
        </Grid>
        <Grid item xs={5}>
          <label style={{ fontWeight: "bold" }}>Total: $ {montoTotal}</label>
        </Grid>
      </Grid>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container style={{ padding: 8 }}>
          <Grid item xs={12} style={{ paddingBottom: 8 }}>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              error={errorsForm.medio ? true : false}
            >
              <InputLabel id="demo-simple-select-label">
                Medio de pago*
              </InputLabel>
              <Select
                name="medio"
                labelId="demo-simple-select-label"
                value={medioPago.medio}
                onChange={(e) => handleChangeMedio(e)}
              >
                {medios.map((medio) => {
                  return <MenuItem value={medio.id}>{medio.nombre}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <label
              hidden={errorsForm.medio ? false : true}
              style={{ fontSize: 13, color: "red" }}
            >
              {errorsForm.medio}
            </label>
          </Grid>
        </Grid>

        {medioPago.medio === 1 && (
          <Grid container style={{ padding: 8 }}>
            <Grid item xs={12} style={{ paddingBottom: 8 }}>
              <TextField
                autoComplete="off"
                onInput={validateMaxLength}
                id="pagaCon"
                fullWidth
                label="Paga con*"
                variant="outlined"
                size="small"
                name="pagaCon"
                value={medioPago.pagaCon}
                onChange={(e) => handleChangeMedio(e)}
                error={errorsForm.pagaCon ? true : false}
              />
              <label
                hidden={errorsForm.pagaCon ? false : true}
                style={{ fontSize: 13, color: "red" }}
              >
                {errorsForm.pagaCon}
              </label>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 8 }}>
              <label style={{ fontWeight: "bold" }}>
                Vuelto: $ {vuelto && vuelto > 0 ? vuelto : 0}
              </label>
            </Grid>
          </Grid>
        )}

        {medioPago.medio === 2 && (
          <div>
            <Grid container style={{ padding: 8 }}>
              <Grid item xs={6} style={{ paddingRight: 8 }}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Tarjeta</InputLabel>
                  <Select
                    name="tarjeta"
                    labelId="demo-simple-select-label"
                    value={medioPago.tarjeta}
                    onChange={(e) => handleChangeMedio(e)}
                  >
                    <MenuItem value={1}>VISA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Cuotas</InputLabel>
                  <Select
                    name="idCuota"
                    labelId="demo-simple-select-label"
                    value={medioPago.idCuota}
                    onChange={(e) => handleChangeMedio(e)}
                  >
                    {tarjetas.map((tar) => {
                      return (
                        <MenuItem value={tar.id}>{`${tar.nombre}- Interes: ${
                          tar.interes * 100
                        }%`}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container style={{ padding: 8 }}>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="formatted-text-mask-input"
                    style={errorsForm.nroTarjeta && { color: "red" }}
                  >
                    Número de tarjeta*
                  </InputLabel>
                  <Input
                    style={
                      errorsForm.nroTarjeta
                        ? { border: "solid 1px red" }
                        : { border: "solid 1px gray" }
                    }
                    value={dataTarjeta.nroTarjeta}
                    onChange={(e) => handleChangeTarjeta(e)}
                    error={errorsForm.nroTarjeta ? true : false}
                    name="nroTarjeta"
                    inputComponent={TextMaskCustom}
                    size="small"
                    variant="outlined"
                    onInput={validateMaxLength}
                    autoComplete="off"
                  />
                </FormControl>
                <label
                  hidden={errorsForm.nroTarjeta ? false : true}
                  style={{ fontSize: 13, color: "red" }}
                >
                  {errorsForm.nroTarjeta}
                </label>
              </Grid>
              <Grid item xs={2} />
            </Grid>

            <Grid container style={{ padding: 8 }}>
              <Grid item xs={6} style={{ paddingBottom: 8, paddingRight: 8 }}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="formatted-text-mask-input"
                    style={errorsForm.nombreTitular && { color: "red" }}
                  >
                    Nombre del titular*
                  </InputLabel>
                  <Input
                    style={
                      errorsForm.nombreTitular
                        ? { border: "solid 1px red" }
                        : { border: "solid 1px gray" }
                    }
                    autoComplete="off"
                    label=""
                    variant="outlined"
                    size="small"
                    name="nombreTitular"
                    value={dataTarjeta.nombreTitular}
                    onChange={(e) => handleChangeTarjeta(e)}
                    error={errorsForm.nombreTitular ? true : false}
                  />
                  <label
                    hidden={errorsForm.nombreTitular ? false : true}
                    style={{ fontSize: 13, color: "red" }}
                  >
                    {errorsForm.nombreTitular}
                  </label>
                </FormControl>
              </Grid>

              <Grid item xs={6} style={{ paddingBottom: 8 }}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="formatted-text-mask-input"
                    style={errorsForm.apellidoTitular && { color: "red" }}
                  >
                    Apellido del titular*
                  </InputLabel>
                  <Input
                    style={
                      errorsForm.apellidoTitular
                        ? { border: "solid 1px red" }
                        : { border: "solid 1px gray" }
                    }
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    name="apellidoTitular"
                    value={dataTarjeta.apellidoTitular}
                    onChange={(e) => handleChangeTarjeta(e)}
                    error={errorsForm.apellidoTitular ? true : false}
                  />
                  <label
                    hidden={errorsForm.apellidoTitular ? false : true}
                    style={{ fontSize: 13, color: "red" }}
                  >
                    {errorsForm.apellidoTitular}
                  </label>
                </FormControl>
              </Grid>

              <Grid item xs={7} style={{ paddingBottom: 8, paddingRight: 8 }}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="formatted-text-mask-input"
                    style={errorsForm.fechaVencimiento && { color: "red" }}
                  >
                    Fecha de vencimiento*
                  </InputLabel>
                  <Input
                    style={
                      errorsForm.fechaVencimiento
                        ? { border: "solid 1px red" }
                        : { border: "solid 1px gray" }
                    }
                    value={dataTarjeta.fechaVencimiento}
                    onChange={(e) => handleChangeTarjeta(e)}
                    error={errorsForm.fechaVencimiento ? true : false}
                    name="fechaVencimiento"
                    inputComponent={TextMaskFecha}
                    size="small"
                    variant="outlined"
                    autoComplete="off"
                  />
                </FormControl>
                <label
                  hidden={errorsForm.fechaVencimiento ? false : true}
                  style={{ fontSize: 13, color: "red" }}
                >
                  {errorsForm.fechaVencimiento}
                </label>
              </Grid>

              <Grid item xs={5} style={{ paddingBottom: 8 }}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="formatted-text-mask-input"
                    style={errorsForm.cvc && { color: "red" }}
                  >
                    CVC*
                  </InputLabel>
                  <Input
                    style={
                      errorsForm.cvc
                        ? { border: "solid 1px red" }
                        : { border: "solid 1px gray" }
                    }
                    autoComplete="off"
                    onInput={validateMaxLength}
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="cvc"
                    value={dataTarjeta.cvc}
                    onChange={(e) => handleChangeTarjeta(e)}
                    error={errorsForm.cvc ? true : false}
                  />
                  <label
                    hidden={errorsForm.cvc ? false : true}
                    style={{ fontSize: 13, color: "red" }}
                  >
                    {errorsForm.cvc}
                  </label>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}

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
              Confirmar pago
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
