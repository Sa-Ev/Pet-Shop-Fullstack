import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import instaIcon from "../../assets/icons/instagram.svg";
import whatsIcon from "../../assets/icons/whatsapp.svg";
import styles from "./styles.module.scss";

const Item = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "#F1F3F4",
  minHeight: "177px",
  padding: "2.8%",
  textAlign: "start",
  boxShadow: "none",
  "@media (max-width: 900px)": {
    minHeight: "auto",
    padding: "5%",
  },
});
function GridFooter() {
  return (
    <Box sx={{ flexGrow: 1 }} className={styles.gridContainer}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Item className={styles.itemContwiner}>
            <p>Phone</p>
            <h1>+49 30 915-88492</h1>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Item>
            <p>Socials</p>
            <div className={styles.iconsContainer}>
              <img src={instaIcon} alt="insta" />
              <img src={whatsIcon} alt="whatsApp" />
            </div>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Item>
            <p>Address</p>
            <h1>Wallstraẞe 9-13, 10179 Berlin, Deutschland</h1>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Item>
            <p>Working Hours</p>
            <h1>24 hours a day</h1>
          </Item>
        </Grid>
      </Grid>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2300851570208!2d13.402063111292438!3d52.51117503676755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db3d613b%3A0x8fa6d253500b289f!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sde!2sde!4v1734058639801!5m2!1sde!2sde"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "12px",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
}

export default GridFooter;
