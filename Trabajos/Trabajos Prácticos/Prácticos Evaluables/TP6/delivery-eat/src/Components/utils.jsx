export const validDireccion = async (form) => {
  let errors = { calle: null, nro: null, ciudad: null };
  let invalid = false;
  if (form.ciudad === 0) {
    errors.ciudad = "Ingrese un ciudad";
    invalid = true;
  }
  if (form.calle === "") {
    errors.calle = "Ingrese una calle";
    invalid = true;
  }
  if (form.nro === "") {
    errors.nro = "Ingrese un nro";
    invalid = true;
  }

  return { errors, invalid };
};

export const validateMaxLength = (e) => {
  switch (e.target.name) {
    case "nroTarjeta":
      if (e.target.value.length > 19) {
        e.target.value = e.target.value.slice(0, 19);
      }
      e.target.value = e.target.value.replace(/[^0-9]+/g, "");
      break;
    case "cvc":
      if (e.target.value.length > 3) {
        e.target.value = e.target.value.slice(0, 3);
      }
      e.target.value = e.target.value.replace(/[^0-9]+/g, "");
      break;
    case "nro":
    case "cant":
    case "pagaCon":
      e.target.value = e.target.value.replace(/[^0-9.]+/g, "");
      break;
    default:
      break;
  }
};

export const validFormPedido = async (form) => {
  let errors = { nameProducto: null, cant: null, nro: null };
  let invalid = false;
  if (form.nameProducto === "") {
    errors.nameProducto = "Ingrese un producto";
    invalid = true;
  }
  if (form.cant === "") {
    errors.cant = "Ingrese una cantidad";
    invalid = true;
  }

  return { errors, invalid };
};

export const validMedio = async (form, data, total) => {
  let tar = data.nroTarjeta.replace(/[^0-9]+/g, "");
  let fecha = data.fechaVencimiento.replace(/[^0-9]+/g, "");
  let errors = {
    medio: null,
    pagaCon: null,
    nroTarjeta: null,
    nombreTitular: null,
    apellidoTitular: null,
    fechaVencimiento: null,
    cvc: null,
  };
  let invalid = false;

  if (form.medio === 0) {
    errors.medio = "Ingrese un medio de pago";
    invalid = true;
  }
  if (form.medio === 1) {
    let vuelto = (parseFloat(form.pagaCon) - parseFloat(total)).toFixed(2);
    if (form.pagaCon === "" || form.pagaCon === 0) {
      errors.pagaCon = "Ingrese con cuanto paga";
      invalid = true;
    } else if (vuelto < 0) {
      errors.pagaCon = `El monto debe ser mayor o igual a ${total}`;
      invalid = true;
    }
  }
  if (form.medio === 2) {
    if (tar === "") {
      errors.nroTarjeta = "Ingrese número de tarjeta";
      invalid = true;
    } else if (tar.length < 16) {
      errors.nroTarjeta = "Ingrese un número de tarjeta válido";
      invalid = true;
    } else if (tar.slice(0, 1) !== "4") {
      errors.nroTarjeta = "La tarjeta ingresada no es VISA";
      invalid = true;
    }
    if (data.nombreTitular === "") {
      errors.nombreTitular = "Ingrese el nombre del titular";
      invalid = true;
    }
    if (data.apellidoTitular === "") {
      errors.apellidoTitular = "Ingrese el apellido del titular";
      invalid = true;
    }
    if (fecha === "") {
      errors.fechaVencimiento = "Ingrese la fecha de vencimiento";
      invalid = true;
    } else if (fecha.length < 6) {
      errors.fechaVencimiento = "Ingrese una fecha válida";
      invalid = true;
    } else if (parseInt(fecha.slice(0, 2)) > 12) {
      errors.fechaVencimiento = "Ingrese una fecha válida";
      invalid = true;
    } else if (parseInt(fecha.slice(-4)) < 2020) {
      errors.fechaVencimiento = "Tarjeta vencida";
      invalid = true;
    }
    if (data.cvc === "") {
      errors.cvc = "Ingrese CVC";
      invalid = true;
    } else if (data.cvc.length < 3) {
      errors.cvc = "Ingrese un CVC válido";
      invalid = true;
    }
  }

  return { errors, invalid };
};

export const calculoPrecio = (prod) => {
  let cantItem = prod.cant;
  let precioAleatorio = (Math.random() * (500 - 150) + 150) * cantItem;
  return precioAleatorio;
};

export const invalidFechaActual = async (fechaSelect) => {
  let fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const hora = fecha.getHours();
  const minuto = fecha.getMinutes();

  const newFecha = new Date(fechaSelect);
  const diaSelected = newFecha.getDate();
  const mesSelected = newFecha.getMonth() + 1;
  const añoSelected = newFecha.getFullYear();
  const horaSelected = newFecha.getHours();
  const minutoSelected = newFecha.getMinutes();

  if (añoSelected > año) {
    return false;
  } else {
    if (añoSelected === año) {
      if (mesSelected > mes) {
        return false;
      } else {
        if (mesSelected === mes) {
          if (diaSelected > dia) {
            return false;
          } else {
            if (diaSelected === dia) {
              if (horaSelected > hora) {
                return false;
              } else {
                if (horaSelected === hora) {
                  if (minutoSelected > minuto) {
                    return false;
                  } else {
                    return true;
                  }
                } else {
                  return true;
                }
              }
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }
};
