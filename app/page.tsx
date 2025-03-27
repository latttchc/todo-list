import { Alert, Box, Typography } from "@mui/material";
import AuthForm from "./components/AuthForm";

const Home = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ my: 2 }}>
        <Typography variant="h2">Welcome! TodoLIST!!</Typography>
        <Alert sx={{ my: 2 }}>
          メールアドレスを登録して利用できます。
        </Alert>
        <Box display="flex" justifyContent="center">
          <AuthForm />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;