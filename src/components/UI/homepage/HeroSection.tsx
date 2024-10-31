'use client'
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import { AnimatedButton, fadeIn } from "../animations/animation";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack column on small, row on larger
        my: { xs: 8, md: 16 }, // Adjust margin for smaller screens
        animation: `${fadeIn} 3s ease-in-out`
      }}
    >
      {/* Text and Button Section */}
      <Box sx={{ flex: 1, position: "relative", textAlign: { xs: 'center', md: 'left' } }}>
        <Box
          sx={{
            position: "absolute",
            width: { xs: "300px", md: "700px" }, // Resize image for smaller screens
            left: { xs: "auto", md: "-90px" },
            top: { xs: "-60px", md: "-120px" },
            right: { xs: 0, md: "auto" }, // Align to the right on mobile
            mx: { xs: 'auto', md: 0 }, // Center on mobile
          }}
        >
          <Image src={assets.svgs.grid} alt="doctor1" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600} fontSize={{ xs: "2rem", md: "3.75rem" }}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600} fontSize={{ xs: "2rem", md: "3.75rem" }}>
          Come From
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={600}
          color="primary.main"
          fontSize={{ xs: "2rem", md: "3.75rem" }}
        >
          Preventive Care
        </Typography>
        <Typography sx={{ my: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eum
          iusto consequatur eius, doloribus nesciunt facere aliquid eveniet et.
          Rerum maiores saepe cupiditate repellat recusandae atque sed. Saepe,
          vitae id?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
          <AnimatedButton variant="contained" color="primary" name='Make Appointment' background='linear-gradient(90deg, #4ECDC4, #43B3AC)' />
          <AnimatedButton variant="outlined" name='Book Now' color='black' />
        </Box>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: { xs: 4, md: 0 },
        }}
      >
        {/* Arrow Image */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "50%", md: "200px" },
            top: { xs: "-10px", md: "-30px" },
            transform: { xs: "translateX(-50%)", md: "none" }
          }}
        >
          <Image src={assets.svgs.arrow} width={100} height={100} alt="arrow" />
        </Box>

        {/* Doctor Images */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box mt={4}>
            <Image
              src={assets.images.doctor1}
              width={240}
              height={380}
              alt="doctor1"
              priority
            />
          </Box>
          <Box>
            <Image
              src={assets.images.doctor2}
              width={240}
              height={350}
              alt="doctor2"
              priority
            />
          </Box>
        </Box>

        {/* Additional Doctor Image */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "150px", md: "220px" },
            left: { xs: "50px", md: "150px" },
          }}
        >
          <Image
            src={assets.images.doctor3}
            width={240}
            height={240}
            alt="doctor3"
            priority
          />
        </Box>

        {/* Stethoscope Image */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-20px", md: "-50px" },
            right: { xs: "auto", md: 0 },
            zIndex: "-1",
          }}
        >
          <Image
            src={assets.images.stethoscope}
            width={180}
            height={180}
            alt="stethoscope"
            priority
          />
        </Box>
      </Box>
    </Container>
  )
};

export default HeroSection;
