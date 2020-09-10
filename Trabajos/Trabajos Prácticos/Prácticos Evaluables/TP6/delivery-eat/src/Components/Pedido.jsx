import React, { useState, useEffect } from "react";
import BodyPedido from "./EstructuraPedido/BodyPedido";
import DireccionComercio from "./Direcciones/DireccionComercio";
import DireccionPersona from "./Direcciones/DireccionPersona";
import FormaPago from "./Pago/FormaPago";
import { dataCiudades, dataTarjetas, dataMedios, dataEntrega } from "./data";
import ConfirmPedido from "./Confirmacion/ConfirmPedido";
import { invalidFechaActual } from "./utils";
import listo from "./Imagenes/listo2.png";
import { Grid, Button } from "@material-ui/core";

export default function Pedido({}) {
  const [pasos, setPasos] = useState(1);
  const [direccion, setDireccion] = useState({
    calle: "",
    nro: "",
    ciudad: 0,
    referencia: "",
  });
  const [direccionPersona, setDireccionPersona] = useState({
    calle: "",
    nro: "",
    ciudad: 0,
    referencia: "",
  });
  const [productos, setProductos] = useState([]);
  const [medioPago, setMedioPago] = useState({
    medio: 0,
    pagaCon: "",
    tarjeta: 1,
    idCuota: 1,
  });
  const [dataTarjeta, setDataTarjeta] = useState({
    nroTarjeta: "",
    nombreTitular: "",
    apellidoTitular: "",
    fechaVencimiento: "",
    cvc: "",
  });
  const [entrega, setEntrega] = useState({ valor: 1, fechaHora: "" });
  const [errorFecha, setErrorFecha] = useState(false);

  const ciudades = dataCiudades();
  const tarjetas = dataTarjetas();
  const medios = dataMedios();
  const tiposEntrega = dataEntrega();

  const validCiudades = () => {
    if (direccionPersona.ciudad !== direccion.ciudad) {
      let ciudadData = ciudades.filter(
        (ciudad) => ciudad.id === direccion.ciudad
      );
      return { err: false, data: ciudadData[0] };
    } else {
      return { err: true, data: null };
    }
  };

  const confirmarPedido = async (e) => {
    e.preventDefault();
    if (entrega.valor === 2) {
      let res = await invalidFechaActual(entrega.fechaHora);
      if (res) {
        setErrorFecha(true);
      } else {
        setPasos(6);
      }
    } else {
      setPasos(6);
    }
  };

  const getPasos = () => {
    switch (pasos) {
      case 1:
        return (
          <DireccionComercio
            direccion={direccion}
            setDireccion={setDireccion}
            setPasos={setPasos}
            ciudades={ciudades}
          />
        );
        break;
      case 2:
        return (
          <BodyPedido
            productos={productos}
            setProductos={setProductos}
            setPasos={setPasos}
          />
        );
        break;
      case 3:
        return (
          <DireccionPersona
            direccionPersona={direccionPersona}
            setDireccionPersona={setDireccionPersona}
            setPasos={setPasos}
            ciudades={ciudades}
            validCiudades={validCiudades}
          />
        );
        break;
      case 4:
        return (
          <FormaPago
            setPasos={setPasos}
            medioPago={medioPago}
            setMedioPago={setMedioPago}
            tarjetas={tarjetas}
            medios={medios}
            dataTarjeta={dataTarjeta}
            setDataTarjeta={setDataTarjeta}
            productos={productos}
          />
        );
        break;
      case 5:
        return (
          <ConfirmPedido
            medioPago={medioPago}
            productos={productos}
            direccionPersona={direccionPersona}
            direccion={direccion}
            setPasos={setPasos}
            ciudades={ciudades}
            medios={medios}
            tiposEntrega={tiposEntrega}
            entrega={entrega}
            setEntrega={setEntrega}
            errorFecha={errorFecha}
            setErrorFecha={setErrorFecha}
            confirmarPedido={confirmarPedido}
          />
        );
        break;
      case 6:
        return (
          <Grid container style={{ textAlign: "center", paddingTop: 35 }}>
            <Grid item xs="12">
              <img src={listo} style={{ width: "80%" }}></img>
            </Grid>
            <Grid item xs="12" style={{ paddingTop: 10 }}>
              <label style={{ fontSize: 30, color: "darkcyan" }}>
                ¡PEDIDO ENVIADO!
              </label>
            </Grid>

            <Grid item xs={12} style={{ padding: 8 }}>
              <Button
                type="submit"
                size="medium"
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => nuevoPedido()}
              >
                Nuevo pedido
              </Button>
            </Grid>
          </Grid>
        );
        break;
      default:
        break;
    }
  };

  const nuevoPedido = () => {
    setPasos(1);
    setProductos([]);
    setDireccion({
      calle: "",
      nro: "",
      ciudad: 0,
      referencia: "",
    });
    setDireccionPersona({
      calle: "",
      nro: "",
      ciudad: 0,
      referencia: "",
    });
    setMedioPago({
      medio: 0,
      pagaCon: "",
      tarjeta: 1,
      idCuota: 1,
    });
    setDataTarjeta({
      nroTarjeta: "",
      nombreTitular: "",
      apellidoTitular: "",
      fechaVencimiento: "",
      cvc: "",
    });
    setEntrega({ valor: 1, fechaHora: "" });
  };

  return <div>{getPasos()}</div>;
}
