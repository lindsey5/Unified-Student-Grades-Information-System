import { TextField, type TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

// Create a styled TextField with emerald theme
export const EmeraldTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#059669", // emerald-600
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 185, 127, 1)", // emerald-700
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#059669", // emerald-600
  },
});

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export const SearchField = ({ value, onChange, placeholder = "Search...", fullWidth = true }: SearchFieldProps) => {
  return (
    <EmeraldTextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} className="text-emerald-600" />
          </InputAdornment>
        ),
      }}
    />
  );
};

