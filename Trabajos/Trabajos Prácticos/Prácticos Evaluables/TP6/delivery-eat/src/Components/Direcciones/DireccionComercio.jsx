import React, { useState, useEffect } from "react";
import HeaderPasos from "../Reutilizables/HeaderPasos";
import { validDireccion } from "../utils";
import FormDireccion from "./FormDireccion";

export default function DireccionComercio({
  direccion,
  setDireccion,
  setPasos,
  ciudades,
}) {
  const [opcion, setOpcion] = useState(1);
  const [errorsForm, setErrorsForm] = useState({
    calle: null,
    nro: null,
    ciudad: null,
  });

  const handleChangeDireccion = (e) => {
    let name = [e.target.name];
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
    if (name !== "referencia") {
      setErrorsForm({ ...errorsForm, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await validDireccion(direccion);
    setErrorsForm(res.errors);
    if (!res.invalid) {
      nextStep();
    }
  };

  const nextStep = () => {
    setPasos(2);
  };

  useEffect(() => {
    document.getElementById("calle").focus();
  }, []);

  return (
    <div>
      <HeaderPasos
        titulo="SELECCIÓN DE COMERCIO"
        detalle="¿Como desea ingresar el comercio?"
        paso={null}
      />

      <FormDireccion
        setOpcion={setOpcion}
        opcion={opcion}
        setDireccion={setDireccion}
        direccion={direccion}
        handleSubmit={(e) => handleSubmit(e)}
        handleChangeDireccion={(e) => handleChangeDireccion(e)}
        errorsForm={errorsForm}
        ciudades={ciudades}
      />
    </div>
  );
}
