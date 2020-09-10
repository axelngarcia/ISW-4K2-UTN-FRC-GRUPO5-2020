import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Modal, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoIcon from "@material-ui/icons/Photo";
import { validateMaxLength } from "../utils";
import { Image } from "semantic-ui-react";

export default function ContentPedido({ productos, setProductos }) {
  const [openFoto, setOpenFoto] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const deleteProduct = (e, item) => {
    let newProducts = productos.filter((prod) => prod.id !== parseInt(item.id));
    setProductos(newProducts);
  };

  const changeCantProduct = (e, item) => {
    let prod = productos.slice();
    prod.forEach((prod) => {
      if (prod.id === parseInt(item.id)) {
        prod.cant = e.target.value;
      }
    });
    setProductos(prod);
  };

  const changeNameProduct = (e, item) => {
    let prod = productos.slice();
    prod.forEach((prod) => {
      if (prod.id === parseInt(item.id)) {
        prod.nameProducto = e.target.value;
      }
    });
    setProductos(prod);
  };

  useEffect(() => {
    if (itemSelected) {
      toggleFoto();
    }
  }, [itemSelected]);

  const toggleFoto = () => {
    setOpenFoto(!openFoto);
  };

  return (
    <div>
      <Grid
        container
        style={{
          padding: 8,
          height: "calc(100vh - 378px)",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Mis productos:</Typography>

          <TableContainer style={{ maxHeight: "calc(100vh - 420px)" }}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#bdc3c7" }}>
                <TableRow>
                  <TableCell style={{ padding: 0 }} align="center">
                    Foto/Producto
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    Cantidad
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    ---
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {productos.map((item) => (
                  <TableRow>
                    <TableCell style={{ padding: 0 }} align="center">
                      {item.foto && (
                        <Image
                          src={item.foto.url}
                          style={{ height: 30, width: 45 }}
                        />
                      )}
                      <TextField
                        autoComplete="off"
                        name="nameProducto"
                        variant="standard"
                        size="small"
                        style={{ width: 200 }}
                        value={item.nameProducto}
                        onChange={(e) => changeNameProduct(e, item)}
                      />
                    </TableCell>
                    <TableCell style={{ padding: 0 }} align="center">
                      <TextField
                        autoComplete="off"
                        onInput={validateMaxLength}
                        min={1}
                        name="cant"
                        variant="standard"
                        size="small"
                        style={{ width: 50 }}
                        value={item.cant}
                        onChange={(e) => changeCantProduct(e, item)}
                      />
                    </TableCell>
                    <TableCell style={{ padding: 0 }} align="center">
                      <DeleteIcon onClick={(e) => deleteProduct(e, item)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {itemSelected ? (
        <Modal open={openFoto}>
          <div className="row">
            <Image
              src={itemSelected.foto.url}
              style={{ height: 100, width: 180 }}
            />
            <div className="row">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setItemSelected(null)}
              >
                Salir
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
