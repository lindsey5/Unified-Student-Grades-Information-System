import { Checkbox, FormControlLabel } from "@mui/material";

export const EmeraldCheckBox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormControlLabel
        control={(
            <Checkbox 
                checked={checked} 
                onChange={onChange} 
                sx={{
                    color: "#059669",
                    "&.Mui-checked": {
                    color: "#059669", // checked color
                    },
                }}
            />
        )}
        label={label}
    />
  );
};
