import React, { Component } from "react";
import axios from 'axios';
import "./users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import Swal from "sweetalert2";


const url = 'https://dev-school-back.herokuapp.com/api/user/';

class Users extends Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      email: "",
      password: "",
      roleId: "",
      tipoModal: ""
    },
  };

  peticionGet = () => {
    axios
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
          title: "El usuario ha sido creado",
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
          title: "El usuario ha sido actualizado",
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
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        roleId: usuario.roleId,
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
      <div className="margin-users">
        <br />
        <h2>Usuarios</h2>
        <br />
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Agregar Usuario
        </button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((usuario) => {
              return (
                <tr>
                  <td>{usuario.id}</td>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.role.id}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarUsuario(usuario);
                        this.modalInsertar();
                      }}
                    >Edit
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarUsuario(usuario);
                        this.setState({ modalEliminar: true });
                      }}
                    >Delete
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
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : ""}
              />
              <br />
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form ? form.name : ""}
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={form ? form.email : ""}
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
                value={form ? form.password : ""}
              />
              <br />
              <label htmlFor="role">RoleID</label>
              <input
                className="form-control"
                type="number"
                name="roleId"
                id="roleId"
                min="1"
                max="4"
                onChange={this.handleChange}
                value={form ? form.roleId : ""}
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
            Estás seguro que deseas eliminar al usuario {form && form.name}
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
export default Users;
