import {
  Select,
  type SelectProps,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export type RedSelectProps = SelectProps<any> & {
  label?: string;
};

// Styled Select with red theme
const StyledRedSelect = styled((props: SelectProps) => <Select {...props} />)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d1d5db", // gray-300
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#dc2626", // red-600
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#b91c1c", // red-700
  },
  "& .MuiSelect-icon": {
    color: "#dc2626", // red-600
  },
});

// Styled InputLabel with red focus color
const RedInputLabel = styled(InputLabel)({
  "&.Mui-focused": {
    color: "#dc2626", // red-600
  },
});

export const RedSelect = ({ label, ...props }: RedSelectProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <RedInputLabel>{label}</RedInputLabel>
      <StyledRedSelect label={label} {...props} />
    </FormControl>
  );
};
