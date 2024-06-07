import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Register.css";

function Register() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "STUDENT", // Set default user type as STUDENT
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                // Include the type in the POST request body
                const response = await fetch("http://localhost:8081/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Unexpected response: ${text}`);
                }

                const data = await response.json();
                if (response.ok) {
                    console.log("User registered successfully:", data);
                    navigate("/"); // Redirect to the default page
                } else {
                    console.error("Failed to register user:", data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error("Error registering user:", error);
                setError("Wystąpił błąd podczas rejestracji użytkownika.");
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

    const handleLoginClick = () => {
        navigate("/"); // Redirect to the default page
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
                            <h2 className="fw-bold mb-2 text-uppercase">Rejestracja</h2>
                            <p className="text-white-50 mb-3">
                                Wprowadź swoje dane, aby utworzyć konto.
                            </p>
                            {error && <p className="text-danger">{error}</p>}
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                                className="w-100"
                            >
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="fullName"> {/* Changed from name to fullName */}
                                        <Form.Label
                                            className={`text-white ${formData.fullName ? "label-visible" : "label-fade"}`}
                                        >
                                            Imię i nazwisko
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={!formData.fullName ? "Imię i nazwisko" : ""}
                                            name="fullName" // Changed from name to fullName
                                            value={formData.fullName} // Changed from name to fullName
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Imię i nazwisko jest wymagane.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="email">
                                        <Form.Label
                                            className={`text-white ${formData.email ? "label-visible" : "label-fade"}`}
                                        >
                                            Adres e-mail
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder={!formData.email ? "Adres e-mail" : ""}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Proszę wprowadzić prawidłowy adres e-mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="password">
                                        <Form.Label
                                            className={`text-white ${formData.password ? "label-visible" : "label-fade"}`}
                                        >
                                            Hasło
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.password ? "Hasło" : ""}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Hasło jest wymagane.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="confirmPassword">
                                        <Form.Label
                                            className={`text-white ${formData.confirmPassword ? "label-visible" : "label-fade"}`}
                                        >
                                            Potwierdź hasło
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={!formData.confirmPassword ? "Potwierdź hasło" : ""}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            size="lg"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Hasła muszą się zgadzać.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
                                    <Button
                                        type="submit"
                                        sx={{
                                            color: "#FFFFFF",
                                            borderRadius: "4px",
                                            border: "1px solid #FFFFFF",
                                            fontSize: "1rem",
                                            minWidth: "12rem",
                                            maxWidth: "12rem"
                                        }}
                                    >
                                        Zarejestruj się
                                    </Button>
                                </Row>
                            </Form>
                            <div className="text-center pt-3">
                                <p className="mb-0" style={{minWidth: "15rem", maxWidth: "15rem"}}>
                                    Masz już konto?{" "}
                                    <a href="#!" className="text-white-50 fw-bold" onClick={handleLoginClick}>
                                        Zaloguj się
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
