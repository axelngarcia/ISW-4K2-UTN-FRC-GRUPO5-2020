import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import HeaderPasos from "../Reutilizables/HeaderPasos";
import { validDireccion } from "../utils";
import FormDireccion from "./FormDireccion";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DireccionPersona({
  direccionPersona,
  setDireccionPersona,
  setPasos,
  ciudades,
  validCiudades,
}) {
  const [opcion, setOpcion] = useState(1);
  const [errorCiudades, setErrorCiudades] = useState(null);
  const [errorsForm, setErrorsForm] = useState({
    calle: null,
    nro: null,
    ciudad: null,
  });

  const handleChangeDireccion = (e) => {
    let name = [e.target.name];
    setDireccionPersona({
      ...direccionPersona,
      [e.target.name]: e.target.value,
    });
    if (name !== "referencia") {
      setErrorsForm({ ...errorsForm, [e.target.name]: null });
    }
    if (errorCiudades) {
      setErrorCiudades(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await validDireccion(direccionPersona);
    setErrorsForm(res.errors);
    if (!res.invalid) {
      let res = await validCiudades();
      if (res.err) {
        nextStep();
      } else {
        setErrorCiudades(
          `La dirección de entrega debe ser en ${res.data.nombre}`
        );
      }
    }
  };

  const nextStep = () => {
    setPasos(4);
  };

  useEffect(() => {
    document.getElementById("calle").focus();
  }, []);

  return (
    <div>
      <HeaderPasos
        titulo="DIRECCIÓN DE ENTREGA"
        detalle="¿Como desea ingresar la dirección de entrega?"
        setPasos={setPasos}
        paso={3}
      />

      {errorCiudades && (
        <Grid container>
          <Grid item xs={12}>
            {errorCiudades && <Alert severity="error">{errorCiudades}</Alert>}
          </Grid>
        </Grid>
      )}

      <FormDireccion
        setOpcion={setOpcion}
        opcion={opcion}
        setDireccion={setDireccionPersona}
        direccion={direccionPersona}
        handleSubmit={(e) => handleSubmit(e)}
        handleChangeDireccion={(e) => handleChangeDireccion(e)}
        errorsForm={errorsForm}
        ciudades={ciudades}
      />
    </div>
  );
}
