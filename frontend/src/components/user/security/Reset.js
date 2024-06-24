import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

const Reset = () => {
    const [passwordForm, setPasswordForm] = useState({ 
        password: "",
        token: "",
        tokenId: ""
    });

    const { passwordReset } = useContext(UserContext);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setPasswordForm({ ...passwordForm, [name]: value });
    };

    const resetPasswordWithToken = async () => {
        try {
            const { token, tokenId, password } = passwordForm;

            if (!password || !token || !tokenId) {
                alert("Please provide all required information.");
                return;
            }

            await passwordReset(token, tokenId, password);

            alert("Password reset successfully!");
        } catch (error) {
            alert(`Error resetting password:\n\nPassword: ${passwordForm.password}\nToken: ${passwordForm.token}\nToken ID: ${passwordForm.tokenId}\n\n${error.message}`);
        }
    };

    return (
        <form className="reset-form">
            <h1>Reset Password</h1>
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                name="password"
                value={passwordForm.password}
                onChange={onFormInputChange}
                className="form-input"
            />
            <TextField
                label="Token"
                variant="outlined"
                name="token"
                value={passwordForm.token}
                onChange={onFormInputChange}
                className="form-input"
            />
            <TextField
                label="Token ID"
                variant="outlined"
                name="tokenId"
                value={passwordForm.tokenId}
                onChange={onFormInputChange}
                className="form-input"
            />
            <Button variant="contained" color="primary" onClick={resetPasswordWithToken} className="submit-button">
                Reset Password
            </Button>
        </form>
    );
};

export default Reset;
