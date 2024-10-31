import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { Box } from "@mui/material";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar></Navbar>
            <Box className="min-h-screen">{children}</Box>
            <Footer></Footer>
        </>
    )
};

export default CommonLayoutPage;
