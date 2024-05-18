import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

function Login({ onLogin, onToggleRegister }) {
    const handleLoginClick = () => {
        // Call the onLogin function passed as a prop to update the isLoggedIn state
        onLogin(true);
    };

    return (
        <MDBContainer fluid className='d-flex justify-content-center align-items-center vh-100'>

            <MDBCard className='bg-dark text-white' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

                    <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                    <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleLoginClick}>
                        Login
                    </MDBBtn>

                    <div className='d-flex flex-row mt-3 mb-5'>
                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='facebook-f' size="lg"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='twitter' size="lg"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='google' size="lg"/>
                        </MDBBtn>
                    </div>

                    <div>
                        <p className="mb-0">Don not have an account? <a href="#!" className="text-white-50 fw-bold" onClick={onToggleRegister}>Sign Up</a></p>
                    </div>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Login;