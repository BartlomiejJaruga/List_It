import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form } from "react-bootstrap";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const res = await response.json();
                if (res.status) {
                    console.log("User logged in successfully:", res);
                    navigate("/homepage");
                } else {
                    console.error("Failed to log in:", res.message);
                    // Display error message to user
                }
            } else {
                console.error("Failed to log in:", response.statusText);
                // Handle error
            }
        } catch (error) {
            console.error("Error logging in:", error);
            // Handle connection error or other errors
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center h-100">
                <Col xs={12}>
                    <Card
                        className="bg-dark text-white my-5 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "400px" }}
                    >
                        <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">
                                Please enter your login and password!
                            </p>

                            <Form onSubmit={handleSubmit} className="w-100">
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label className={`text-white ${formData.email ? "label-visible" : "label-fade"}`}>
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        className="mdb-input"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label className={`text-white ${formData.password ? "label-visible" : "label-fade"}`}>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        className="mdb-input"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password is required.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <p className="small mb-3 pb-lg-2">
                                    <a className="text-white-50" href="#!">
                                        Forgot password?
                                    </a>
                                </p>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn-login" type="submit">Log in</button>
                                </div>
                            </Form>
                            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                                <p className="mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-white-50 fw-bold">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
