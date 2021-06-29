import React, { Component } from "react";
import "./entries.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";

// const url = "http://localhost:3001/users/";

const url = "https://dev-school-back.herokuapp.com/api/entries/";

class Entries extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      userId: "",
      title: "",
      content: "",
      tipoModal: "",
    },
  };

  peticionGet = async () => {
    await axios
      .get(url, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        this.setState({ data: response.data });
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url, this.state.form, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La entrada ha sido agregada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en los datos ingresados",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.id, this.state.form, {
        headers: { "x-token": localStorage.getItem("devschooltoken") },
      })
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La entrada ha sido actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((errors) => {
        console.log(errors.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en los datos ingresados",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: usuario.id,
        userId: usuario.userId,
        title: usuario.title,
        content: usuario.content,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="container-users">
        <div className="margin-entries">
        <br />
        <h2>Entradas</h2>
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Agregar Entrada
        </button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>User-Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((usuario) => {
              return (
                <tr>
                  <td>{usuario.id}</td>
                  <td>{usuario.userId}</td>
                  <td>{usuario.title}</td>
                  <td>{usuario.content}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarUsuario(usuario);
                        this.modalInsertar();
                      }}
                    >
                      Edit
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarUsuario(usuario);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                className="form-control"
                type="number"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : ""}
              />
              <br />
              <label htmlFor="name">User-Id</label>
              <input
                className="form-control"
                type="number"
                min="1"
                max="5"
                name="userId"
                id="userId"
                onChange={this.handleChange}
                value={form ? form.userId : ""}
              />
              <br />
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                value={form ? form.title : ""}
              />
              <br />
              <label htmlFor="content">Content</label>
              <input
                className="form-control"
                type="text"
                name="content"
                id="content"
                onChange={this.handleChange}
                value={form ? form.text : ""}
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar la entrada {form && form.name}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        </div>
      </div>
    );
  }
}
export default Entries;
