import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Register.css";

function Register() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
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
                    navigate("/"); // Redirect to HomePage
                } else {
                    console.error("Failed to register user:", response.statusText);
                }
            } catch (error) {
                console.error("Error registering user:", error);
            }
            setValidated(true);
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
                        className="bg-dark text-white mx-auto"
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
                                    <Form.Group as={Col} md="12" controlId="name">
                                        <Form.Label
                                            className={`text-white ${formData.name ? "label-visible" : "label-fade"}`}
                                        >
                                            Full Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={!formData.name ? "Full Name" : ""}
                                            name="name"
                                            value={formData.name}
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
                                    <Form.Group as={Col} md="12" controlId="email">
                                        <Form.Label
                                            className={`text-white ${formData.email ? "label-visible" : "label-fade"}`}
                                        >
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder={!formData.email ? "Email Address" : ""}
                                            name="email"
                                            value={formData.email}
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
                                    <Form.Group as={Col} md="12" controlId="password">
                                        <Form.Label
                                            className={`text-white ${formData.password ? "label-visible" : "label-fade"}`}
                                        >
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.password ? "Password" : ""}
                                            name="password"
                                            value={formData.password}
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
                                    <Form.Group as={Col} md="12" controlId="confirmPassword">
                                        <Form.Label
                                            className={`text-white ${
                                                formData.confirmPassword ? "label-visible" : "label-fade"
                                            }`}
                                        >
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.confirmPassword ? "Confirm Password" : ""}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Passwords must match.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: "2rem" }}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            color: "#FFFFFF",
                                            borderRadius: "4px",
                                            border: "1px solid #FFFFFF",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Row>
                            </Form>
                            <div className="text-center pt-3">
                                <p className="mb-0">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-white-50 fw-bold">
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
