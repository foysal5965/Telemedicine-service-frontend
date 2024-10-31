'use client'
import { Button, Card } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@mui/system";
import { motion } from 'framer-motion';
import Link from "next/link";


export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AnimatedCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)', // Zooms in when hovered
  },
});

export const AnimatedButton = (data: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}    // Slightly enlarges the button on hover
      whileTap={{ scale: 0.9 }}      // Slightly shrinks the button when clicked
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth spring-like transition
      onClick={data?.onClick ? data.onClick : ''}
    >
      <Button
      
        component={data.component ? data.component : null}
        href={data.href ? data.href : null}
        variant={data?.variant ? data.variant : 'contained'}
        sx={{
          background: data.background ? data.background : '',
         
          color: data.color? data.color : 'white',
          borderColor:`${data.borderColor}`,
          '&:hover': {
            backgroundColor: '#43B3AC',
            color: 'white' // Change background color on hover
          },
        }}
        
      >
        {data?.name ? data.name : ''}
      </Button>
    </motion.div>
  )
}