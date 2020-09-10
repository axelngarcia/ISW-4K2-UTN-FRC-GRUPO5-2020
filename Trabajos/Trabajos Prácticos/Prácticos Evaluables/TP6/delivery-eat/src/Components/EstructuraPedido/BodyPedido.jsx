import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ReactFileReader from "react-file-reader";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ContentPedido from "./ContentPedido";
import HeaderPasos from "../Reutilizables/HeaderPasos";
import { validFormPedido, validateMaxLength } from "../utils";
import { Image } from "semantic-ui-react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function BodyPedido({ productos, setProductos, setPasos }) {
  const [item, setItem] = useState({
    nameProducto: "",
    cant: "",
    foto: null,
    precio: 0,
  });
  const [booleanFoto, setBooleanFoto] = useState(false);
  const [errorsForm, setErrorsForm] = useState({
    nameProducto: null,
    cant: null,
  });
  const [pedidoInvalid, setPedidoInvalid] = useState(false);
  const [fotoErronea, setFotoErronea] = useState(null);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cant") {
      if (value !== "") {
        value = parseInt(value, 10);
      } else {
        value = "";
      }
      setItem({ ...item, [e.target.name]: value });
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
    setErrorsForm({ ...errorsForm, [e.target.name]: null });
  };

  const agregarItem = () => {
    const newProducto = productos.slice();
    let idItem = newProducto.length;
    let newItem = {
      id: idItem + 1,
      nameProducto: item.nameProducto,
      cant: item.cant,
      foto: item.foto,
      precio: 0,
    };
    newProducto.push(newItem);
    setProductos(newProducto);
    setItem({ nameProducto: "", cant: "", foto: null, precio: 0 });
    setBooleanFoto(false);
    document.getElementById("producto").focus();
  };

  const handleFiles = (e) => {
    if (parseInt(e.target.files[0].size) > 5000000) {
      setFotoErronea("La foto elegida supera los 5 MB");
    } else if (!e.target.files[0].type.includes("jpeg")) {
      setFotoErronea("La foto elegida no tiene formato JPG");
    } else {
      let reader = new FileReader();
      let imagen = e.target.files[0];

      reader.onloadend = () => {
        let newFoto = {
          name: imagen.name,
          description: " #ddd6f3 → #faaca8",
          height: 200,
          url: reader.result,
        };
        setItem({ ...item, foto: newFoto });
      };
      reader.readAsDataURL(imagen);
    }
    setTimeout(() => {
      setFotoErronea(null);
    }, 1800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await validFormPedido(item);
    setErrorsForm(res.errors);
    if (!res.invalid) {
      agregarItem();
    }
  };

  const nextStep = () => {
    setPasos(3);
  };

  const confirmProduct = () => {
    let invalid = false;
    productos.forEach((prod) => {
      if (
        parseInt(prod.cant) === 0 ||
        prod.cant === "" ||
        prod.nameProducto === ""
      ) {
        invalid = true;
      }
    });

    if (invalid) {
      setPedidoInvalid(true);
      setTimeout(() => {
        setPedidoInvalid(false);
      }, 1500);
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    document.getElementById("producto").focus();
  }, []);

  return (
    <div>
      <HeaderPasos
        titulo="MI PEDIDO"
        detalle="Ingrese los productos que desea pedir"
        paso={2}
        setPasos={setPasos}
      />

      {pedidoInvalid && (
        <Grid container>
          <Grid item xs={12}>
            {pedidoInvalid && (
              <Alert severity="error">
                Existen productos sin nombre o cantidad.
              </Alert>
            )}
          </Grid>
        </Grid>
      )}

      {fotoErronea && (
        <Grid container>
          <Grid item xs={12}>
            {fotoErronea && <Alert severity="error">{fotoErronea}</Alert>}
          </Grid>
        </Grid>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container style={{ padding: 8 }}>
          <Grid item xs={12} style={{ paddingBottom: 8 }}>
            <TextField
              autoComplete="off"
              id="producto"
              fullWidth
              label="Producto*"
              variant="outlined"
              size="small"
              name="nameProducto"
              value={item.nameProducto}
              onChange={handleChange}
              error={errorsForm.nameProducto ? true : false}
            />
            <label
              hidden={errorsForm.nameProducto ? false : true}
              style={{ fontSize: 13, color: "red" }}
            >
              {errorsForm.nameProducto}
            </label>
          </Grid>

          <Grid item xs={6} style={{ paddingBottom: 8 }}>
            <TextField
              autoComplete="off"
              id="cantidad"
              onInput={validateMaxLength}
              min={1}
              fullWidth
              type="number"
              label="Cantidad*"
              variant="outlined"
              size="small"
              name="cant"
              value={item.cant}
              onChange={handleChange}
              error={errorsForm.cant ? true : false}
            />
            <label
              hidden={errorsForm.cant ? false : true}
              style={{ fontSize: 13, color: "red" }}
            >
              {errorsForm.cant}
            </label>
          </Grid>

          <Grid item xs={6} style={{ paddingBottom: 8, paddingLeft: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={booleanFoto}
                  onChange={() => setBooleanFoto(!booleanFoto)}
                  color="primary"
                />
              }
              label="Subir foto"
            />
          </Grid>

          <Grid item xs={12} hidden={!booleanFoto}>
            {item.foto !== null ? (
              <List>
                <Divider />
                <Image
                  src={item.foto.url}
                  style={{ height: 100, width: 180 }}
                />
                <Divider />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setItem({ ...item, foto: null })}
                >
                  Cambiar foto
                </Button>
                <Divider />
              </List>
            ) : (
              <div>
                <div className="row">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => handleFiles(e)}
                  />
                </div>
                <div className="row">
                  <label style={{ fontSize: 12 }}>
                    El formato debe ser JPG y no debe superar los 5 MB*
                  </label>
                </div>
              </div>
            )}
          </Grid>

          <Grid item xs={12} style={{ paddingTop: 8 }}>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => handleSubmit(e)}
            >
              Agregar al carrito
            </Button>
          </Grid>
        </Grid>
      </form>

      {productos.length > 0 && (
        <div>
          <ContentPedido productos={productos} setProductos={setProductos} />{" "}
          <Grid item xs={12} style={{ padding: 8 }}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => confirmProduct()}
            >
              Confirmar productos
            </Button>
          </Grid>
        </div>
      )}
    </div>
  );
}
