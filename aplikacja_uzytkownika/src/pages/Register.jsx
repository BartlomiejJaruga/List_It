import React, { useState } from "react";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Register.css";

function Register({ onToggleLogin }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        formFullName: "",
        formEmail: "",
        formPassword: "",
        formConfirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (formData.formPassword !== formData.formConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:8081/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log("User registered successfully:", userData);
                    // Handle successful registration
                } else {
                    console.error("Failed to register user:", response.statusText);
                    // Handle registration failure
                }
            } catch (error) {
                console.error("Error registering user:", error);
                // Handle connection or other errors
            }
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center align-self-center vh-100">
            <Row className="justify-content-center align-items-center w-100">
                <Col xs={12}>
                    <Card
                        className="bg-dark text-white my-5 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "900px" }}
                    >
                        <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-3">
                                Please enter your details to create an account.
                            </p>
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                                className="w-100"
                            >
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="formFullName">
                                        <Form.Label
                                            className={`text-white ${
                                                formData.formFullName ? "label-visible" : "label-fade"
                                            }`}
                                        >
                                            Full Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={!formData.formFullName ? "Full Name" : ""}
                                            name="formFullName"
                                            value={formData.formFullName}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Full name is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="formEmail">
                                        <Form.Label
                                            className={`text-white ${
                                                formData.formEmail ? "label-visible" : "label-fade"
                                            }`}
                                        >
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder={!formData.formEmail ? "Email Address" : ""}
                                            name="formEmail"
                                            value={formData.formEmail}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="formPassword">
                                        <Form.Label
                                            className={`text-white ${
                                                formData.formPassword ? "label-visible" : "label-fade"
                                            }`}
                                        >
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.formPassword ? "Password" : ""}
                                            name="formPassword"
                                            value={formData.formPassword}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password is required.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="formConfirmPassword">
                                        <Form.Label
                                            className={`text-white ${
                                                formData.formConfirmPassword ? "label-visible" : "label-fade"
                                            }`}
                                        >
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.formConfirmPassword ? "Confirm Password" : ""}
                                            name="formConfirmPassword"
                                            value={formData.formConfirmPassword}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Passwords must match.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row
                                    className="d-grid gap-2 col-6 mx-auto"
                                    style={{ marginTop: "2rem" }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        sx={{
                                            color: "#FFFFFF",
                                            borderRadius: "4px",
                                            border: "1px solid #FFFFFF",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {isLoading ? "Registering..." : "Register"}
                                    </Button>
                                </Row>
                            </Form>
                            <div className="text-center pt-3">
                                <p className="mb-0">
                                    Already have an account?{" "}
                                    <a href="#!" className="text-white-50 fw-bold" onClick={onToggleLogin}>
                                        Login
                                    </a>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;