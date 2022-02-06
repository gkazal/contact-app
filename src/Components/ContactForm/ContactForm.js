import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const useStyles = makeStyles({
  leftRoot: {
    backgroundColor: "#6C2DC7",
    height: "100%",
    minHeight: "100vh",
    color: "white",
    padding: "30px",
    paddingTop: "50px",
    paddingLeft: "50px",
    "@media(max-width: 900px)": {
      display: "none",
    },
  },
  footer: {
    // position: "absolute",
    paddingTop: "400px",
    gap: "30px !important",
    display: "flex",
  },
  rightRoot: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    // backgroundColor: "#F5F5F7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  textField: {
    background: "white !important",
    border: "1px solid silver !important",
    outline: "none !important",
    resize: "none !important",
    borderRadius: "8px !important",

    "& .MuiOutlinedInput-notchedOutline": {
      // borderStyle: "none!important",
      borderWidth: "0px !important",
    },
  },
  button: {
    backgroundColor: "#6C2DC7 !important",
    width: "200px",
    padding: "20px",
    color: "white !important",
  },
});

const ContactForm = () => {
  const classes = useStyles();

  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sales: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSend = async () => {
    setFormErrors(validate(...form));
    setIsSubmit(true);
    setSent(true);
    try {
      await axios.post("http://localhost:8000/send_mail", {
        ...form,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(form);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.name) {
      errors.name = "user name is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    }

    if (!values.phone) {
      errors.phone = "phone is required";
    }

    return errors;
  };

  return (
    <>
      <Grid container>
        <Grid item lg={3} md={4} className={classes.leftRoot}>
          <Typography variant="h5">Get in touch</Typography>
          <Typography variant="small">
            We love to hear from you. Our friendly team is always here to chat.
          </Typography>
          <Box display="flex" alignItems="center" mt={3} sx={{ gap: "20px" }}>
            <MailOutlineIcon sx={{ fontSize: 30 }} />
            <Typography>Get in touch</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={3} sx={{ gap: "20px" }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography>Office</Typography>
          </Box>
          <Box pl={6}>
            <Typography>Come say hello at our office</Typography>
            <Typography>Nikunjo-2, Road No-4, Dhaka</Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={3} sx={{ gap: "20px" }}>
            <LocalPhoneOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography>Phone</Typography>
          </Box>
          <Box pl={6}>
            <Typography>Monday-Saturday from 10am-7pm</Typography>
            <Typography>+88 01900110000</Typography>
          </Box>

          <Box className={classes.footer}>
            <FacebookOutlinedIcon sx={{ fontSize: 30 }} />
            <TwitterIcon sx={{ fontSize: 30 }} />
            <LinkedInIcon sx={{ fontSize: 30 }} />
            <YouTubeIcon sx={{ fontSize: 30 }} />
          </Box>
        </Grid>

        <Grid item lg={9} md={8} className={classes.rightRoot}>
          {/* {sent && (
            <Box>
              <Typography>Message Send Successfully</Typography>
            </Box>
          )} */}
          {/* {!sent && ( */}
          <Box>
            <Typography variant="h4">Level up you brand</Typography>
            <Typography>You can reach us anytime</Typography>
            <form onSubmit={handleSend}>
              <Box mt={5}>
                <Grid container spacing={3}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography mb={1}>Name</Typography>
                    <ValidatorForm>
                      <TextField
                        className={classes.textField}
                        placeholder="Your Name"
                        variant="outlined"
                        value={form.name}
                        onChange={(e) => setForm(e.target.value)}
                        fullWidth
                        error={formErrors.phone}
                      />
                    </ValidatorForm>
                    <FormHelperText id="component-error-text" error>
                      {formErrors.phone}
                    </FormHelperText>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography mb={1}>Email</Typography>
                    <TextField
                      className={classes.textField}
                      placeholder="you@gmail.com"
                      variant="outlined"
                      value={form.email}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography mb={1}>Phone Number</Typography>
                    <TextField
                      className={classes.textField}
                      placeholder="+88 01900.."
                      variant="outlined"
                      value={form.phone}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography mb={1}>Sales/Support</Typography>
                    <TextField
                      className={classes.textField}
                      placeholder="Sales/Support"
                      variant="outlined"
                      value={form.sales}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography mb={1}>Message</Typography>
                    <TextField
                      className={classes.textField}
                      placeholder="Message.."
                      variant="outlined"
                      multiline
                      minRows={5}
                      maxRows={5}
                      value={form.message}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3}>
                <Button type="submit" className={classes.button}>
                  Send
                </Button>
              </Box>
            </form>
          </Box>
          {/* )} */}
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
