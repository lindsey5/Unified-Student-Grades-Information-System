import {
  Select,
  type SelectProps,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export type EmeraldSelectProps = SelectProps<any> & {
  label?: string;
};

// Styled Select with emerald theme
const StyledSelect = styled((props: SelectProps) => <Select {...props} />)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d1d5db", // default (gray-300)
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#059669", // emerald-600
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#059669", // emerald-700
  },
  "& .MuiSelect-icon": {
    color: "#059669", // emerald-600
  },
});

// Styled InputLabel with emerald focus color
const EmeraldInputLabel = styled(InputLabel)({
  "&.Mui-focused": {
    color: "#059669", // emerald-600
  },
});

export const EmeraldSelect = ({ label, ...props }: EmeraldSelectProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <EmeraldInputLabel>{label}</EmeraldInputLabel>
      <StyledSelect label={label} {...props} />
    </FormControl>
  );
};
