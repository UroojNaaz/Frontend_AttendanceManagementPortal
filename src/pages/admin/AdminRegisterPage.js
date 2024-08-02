import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline,
    IconButton, InputAdornment, CircularProgress, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg";
import { LightBlueButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [campusNameError, setCampusNameError] = useState(false);
    const [campusName, setCampusName] = useState('');
    const role = "admin";  

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !campusName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!campusName) setCampusNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, campusName: campusName, role };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'campusName') setCampusNameError(false);
    };

    const handleCampusChange = (event) => {
        setCampusName(event.target.value);
        setCampusNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage(error);
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 2,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#0A6EAD" }}>
                            Admin Register
                        </Typography>
                        <Typography variant="h7">
                            Registering as an admin. You will be able to add students and faculty and manage the system.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your name"
                                name="adminName"
                                autoComplete="name"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth margin="normal" required error={campusNameError}>
                                <InputLabel id="campusName-label">Select your Campus</InputLabel>
                                <Select
                                    labelId="campusName-label"
                                    id="campusName"
                                    value={campusName}
                                    name="campusName"
                                    onChange={handleCampusChange}
                                >
                                    <MenuItem value="SMIT Head Office Bahadurabad">SMIT Head Office Bahadurabad</MenuItem>
                                    <MenuItem value="SMIT Gulshan Campus">SMIT Gulshan Campus</MenuItem>
                                    <MenuItem value="SMIT Malir Campus">SMIT Malir Campus</MenuItem>
                                    <MenuItem value="SMIT Numish Campus">SMIT Numish Campus</MenuItem>
                                    <MenuItem value="SMIT Aliabad Female Campus">SMIT Aliabad Female Campus</MenuItem>
                                </Select>
                                {campusNameError && <Typography color="error">Campus name is required</Typography>}
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <LightBlueButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
                            </LightBlueButton>
                            <Grid container>
                                <Grid>
                                    Already have an account?
                                </Grid>
                                <Grid item sx={{ ml: 2 }}>
                                    <StyledLink to="/Adminlogin">
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #0A6EAD;
`;


//WITHOUT DROPDOWN:
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline,
//     IconButton, InputAdornment, CircularProgress
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import bgpic from "../../assets/designlogin.jpg";
// import { LightBlueButton } from '../../components/buttonStyles';
// import { registerUser } from '../../redux/userRelated/userHandle';
// import styled from 'styled-components';
// import Popup from '../../components/Popup';

// const defaultTheme = createTheme();

// const AdminRegisterPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

//     const [toggle, setToggle] = useState(false);
//     const [loader, setLoader] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");

//     const [emailError, setEmailError] = useState(false);
//     const [passwordError, setPasswordError] = useState(false);
//     const [adminNameError, setAdminNameError] = useState(false);
//     const [campusNameError, setCampusNameError] = useState(false);
//     const role = "admin";  // Updated to match the role name used in the backend

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const name = event.target.adminName.value;
//         const campusName = event.target.campusName.value;
//         const email = event.target.email.value;
//         const password = event.target.password.value;

//         if (!name || !campusName || !email || !password) {
//             if (!name) setAdminNameError(true);
//             if (!campusName) setCampusNameError(true);
//             if (!email) setEmailError(true);
//             if (!password) setPasswordError(true);
//             return;
//         }

//         const fields = { name, email, password, campusName: campusName, role };
//         setLoader(true);
//         dispatch(registerUser(fields, role));
//     };

//     const handleInputChange = (event) => {
//         const { name } = event.target;
//         if (name === 'email') setEmailError(false);
//         if (name === 'password') setPasswordError(false);
//         if (name === 'adminName') setAdminNameError(false);
//         if (name === 'campusName') setCampusNameError(false);
//     };

//     useEffect(() => {
//         if (status === 'success' || (currentUser !== null && currentRole === 'admin')) {
//             navigate('/Admin/dashboard');
//         } else if (status === 'failed') {
//             setMessage(response);
//             setShowPopup(true);
//             setLoader(false);
//         } else if (status === 'error') {
//             setMessage(error);
//             setShowPopup(true);
//             setLoader(false);
//         }
//     }, [status, currentUser, currentRole, navigate, error, response]);

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 2,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Typography variant="h4" sx={{ mb: 2, color: "#0A6EAD" }}>
//                             Admin Register
//                         </Typography>
//                         <Typography variant="h7">
//                         Registering as an admin. You will be able to add students and faculty and manage the system.
//                         </Typography>
//                         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="adminName"
//                                 label="Enter your name"
//                                 name="adminName"
//                                 autoComplete="name"
//                                 autoFocus
//                                 error={adminNameError}
//                                 helperText={adminNameError && 'Name is required'}
//                                 onChange={handleInputChange}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="campusName"
//                                 label="Select your Campus"
//                                 name="campusName"
//                                 autoComplete="off"
//                                 error={campusNameError}
//                                 helperText={campusNameError && 'School name is required'}
//                                 onChange={handleInputChange}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Enter your email"
//                                 name="email"
//                                 autoComplete="email"
//                                 error={emailError}
//                                 helperText={emailError && 'Email is required'}
//                                 onChange={handleInputChange}
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type={toggle ? 'text' : 'password'}
//                                 id="password"
//                                 autoComplete="current-password"
//                                 error={passwordError}
//                                 helperText={passwordError && 'Password is required'}
//                                 onChange={handleInputChange}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton onClick={() => setToggle(!toggle)}>
//                                                 {toggle ? (
//                                                     <Visibility />
//                                                 ) : (
//                                                     <VisibilityOff />
//                                                 )}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
//                                 <FormControlLabel
//                                     control={<Checkbox value="remember" color="primary" />}
//                                     label="Remember me"
//                                 />
//                             </Grid>
//                             <LightBlueButton
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 1, mb: 2 }}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
//                             </LightBlueButton>
//                             <Grid container>
//                                 <Grid>
//                                     Already have an account?
//                                 </Grid>
//                                 <Grid item sx={{ ml: 2 }}>
//                                     <StyledLink to="/Adminlogin">
//                                         Log in
//                                     </StyledLink>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Grid>
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: `url(${bgpic})`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//             </Grid>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </ThemeProvider>
//     );
// }

// export default AdminRegisterPage;

// const StyledLink = styled(Link)`
//   margin-top: 9px;
//   text-decoration: none;
//   color: #0A6EAD;
// `;



