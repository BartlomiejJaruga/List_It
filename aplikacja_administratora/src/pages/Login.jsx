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
    const [errorMessage, setErrorMessage] = useState('');
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
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // Ensure cookies are sent/received
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorData = '';
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json();
                } else {
                    errorData = await response.text();
                }
                setErrorMessage(errorData.message || errorData);
                return;
            }

            const res = await response.json();
            console.log("Response JSON:", res); // Debugging line to see the response
            if (res.status) {
                console.log("User logged in successfully:", res);
                sessionStorage.setItem("user", JSON.stringify(res.user));
                if (res.user.type === "ADMIN") {
                    navigate("/homepage"); // Redirect to student dashboard if user is ADMIN
                } else {
                    setErrorMessage("Nie jesteś adminem.");
                    navigate("/"); // Redirect to a standard user homepage otherwise
                }
            } else {
                console.error("Failed to log in:", res.message);
                setErrorMessage(res.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
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
                            <h2 className="fw-bold mb-2 text-uppercase">Logowanie</h2>
                            <p className="text-white-50 mb-5">
                                Wprowadź swoje dane logowania!
                            </p>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <Form onSubmit={handleSubmit} className="w-100">
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label className={`text-white ${formData.email ? "label-visible" : "label-fade"}`}>
                                        Adres e-mail
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Adres e-mail"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        className="mdb-input"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Proszę wprowadzić prawidłowy adres e-mail.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label className={`text-white ${formData.password ? "label-visible" : "label-fade"}`}>
                                        Hasło
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Hasło"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        size="lg"
                                        className="mdb-input"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Hasło jest wymagane.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn-login" type="submit">Zaloguj się</button>
                                </div>
                            </Form>
                            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                                <p className="mb-0">
                                    Nie masz konta?{" "}
                                    <Link to="/register" className="text-white-50 fw-bold">
                                        Zarejestruj się
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
