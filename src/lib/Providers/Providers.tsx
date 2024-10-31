'use client'

import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AuthProvider } from "./AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>
        <AuthProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AuthProvider>
    </Provider>;
};

export default Providers;
