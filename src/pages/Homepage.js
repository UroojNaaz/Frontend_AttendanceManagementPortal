import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/home_page.jpeg";
import { LightBlueButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            SMIT Attendence
                            <br />
                            Portal
                        </StyledTitle>
                        <StyledText>
                        Enhance administrative efficiencyand class organization, 
                        add students and faculty, seamlessly track attendance, 
                        assess performance, and provide feedback. 
                        Effortlessly access records, view marks, and communicate.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightBlueButton variant="contained" fullWidth>
                                    Login
                                </LightBlueButton>
                            </StyledLink>
                            {/* <StyledLink to="/chooseasguest">
                                <Button variant="outlined" fullWidth
                                    sx={{ mt: 2, mb: 3, color: "#0A6EAD", borderColor: "#0A6EAD" }}
                                >
                                    Login as Guest
                                </Button>
                            </StyledLink> */}
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#0A6EAD"}}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #0A6EAD;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  color: black; 
  margin-top: 15px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
//done styling and logic