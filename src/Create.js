import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [photo, setPhoto] = useState(null);
  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  const createCustomer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("dob", dob);
    if (photo) {
      formData.append("photo", photo);
    }
    if (dob) {
      formData.append("dob", dob);
    }

    await axios
      .post(`http://127.0.0.1:8000/api/customers`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Customer registration form</h4>
            </div>
            <div className="card-body">
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={createCustomer}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="Firstname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          // maxLength="10"
                          value={firstname}
                          onChange={(event) => {
                            setFirstname(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Lastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          // maxLength="10"
                          value={lastname}
                          onChange={(event) => {
                            setLastname(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          defaultValue=""
                          required
                          placeholder=""
                          aria-label="Gender"
                          onChange={(event) => {
                            setGender(event.target.value);
                          }}
                        >
                          <option disabled></option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="dob">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={dob}
                          onChange={(event) => {
                            setDob(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Photo" className="mb-3">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    variant="primary"
                    className="float-end"
                    size="md"
                    type="submit"
                  >
                    Register
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
