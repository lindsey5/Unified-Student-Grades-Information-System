import { Checkbox, FormControlLabel } from "@mui/material";

export const RedCheckBox = ({
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
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={{
            color: "#dc2626", // red-600
            "&.Mui-checked": {
              color: "#b91c1c", // red-700 when checked
            },
          }}
        />
      }
      label={label}
    />
  );
};
