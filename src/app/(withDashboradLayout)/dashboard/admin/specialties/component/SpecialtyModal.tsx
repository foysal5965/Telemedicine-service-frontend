import { AnimatedButton } from "@/components/UI/animations/animation";
import PHModal from "@/components/UI/PHModal/PHModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { useState } from "react";
import { toast } from "sonner";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ConstructionOutlined } from "@mui/icons-material";
type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    specialty:any
};

const SpecialtyModal = ({ open, setOpen ,specialty}: TProps) => {
    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [createSpecialty, isLoading] = useCreateSpecialtyMutation()
    const [error, setError] = useState('')
    // Handle image upload
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submit
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (title && image) {
            const values = {
                title, // include the categoryName
                file: image,               // include the image file
            };
            const formData = modifyPayload(values);
            try {
                // Call Redux mutation to add the course category
                const res = await createSpecialty(formData)
                
                if (res?.data?.data?.id) {
                    toast.success('Category created Successfuly', {
                        position: 'top-right', // Change the position as needed
                    })


                    setTitle('');
                    setImage(null);
                    setImagePreview(null);
                } else if (res.error) {
                    // const errorResponse = res.error as ErrorResponse;
                    // setError(errorResponse?.data || 'An unknown error occurred.');
                }

            } catch (error) {
            }
        }
    };
    return (
        <PHModal open={open} setOpen={setOpen} title="Update Specialty">
            <Box marginTop={8}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}

            >
                <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Create Specialty
                    </Typography>
                    <Typography color='red' gutterBottom textAlign="center">
                       {error}
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Title Input */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Specialty Title"
                                variant="outlined"
                                defaultValue={specialty?.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>

                        {/* Image Upload */}
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                border="1px dashed #ccc"
                                padding={2}
                                borderRadius={2}
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: '120px', height: '120px', marginBottom: 16 }}
                                    />
                                ) : (
                                    <CloudUploadIcon style={{ fontSize: 48, color: "#ccc" }} />
                                )}
                                <Button sx={{
                                    background: 'linear-gradient(135deg, #43B3AC 0%, #66CDAA 100%)', // Gradient color
                                    borderRadius: '15px', // Rounded button
                                    padding: '10px 20px',
                                    color: '#fff', // Text color
                                    fontSize: '15px',
                                    fontWeight: 'bold', // Initial shadow

                                }} variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <AnimatedButton name="update Specialty" onClick={handleSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
            </motion.div>
        </Box>
        </PHModal>
    )
};

export default SpecialtyModal;
