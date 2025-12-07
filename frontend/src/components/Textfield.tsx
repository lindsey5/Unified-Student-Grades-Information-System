import { TextField, type TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import { Eye, EyeOff, Search } from "lucide-react";
import { useState } from "react";

export const RedTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#dc2626", // red-600
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b91c1c", // red-700
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#dc2626", // red-600
  },
});

/* 🔍 SEARCH FIELD */
interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export const SearchField = ({
  value,
  onChange,
  placeholder = "Search...",
  fullWidth = true,
}: SearchFieldProps) => {
  return (
    <RedTextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} className="text-red-600" />
          </InputAdornment>
        ),
      }}
    />
  );
};

/* 🔽 SEARCH DROPDOWN */
interface Option {
  label: string;
  value: any;
}

interface SearchDropdownProps {
  onSelect: (value: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  options: Option[];
  value: string;
  isLoading: boolean;
}

export const SearchDropdown = ({
  onChange,
  options,
  onSelect,
  value,
  placeholder,
  isLoading,
}: SearchDropdownProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className="w-full relative">
      <RedTextField
        fullWidth
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 200)}
      />

      {value && focus && (
        <div className="absolute inset-x-0 mt-1 border border-gray-200 bg-white z-50 rounded-md shadow max-h-[300px] overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, idx) => (
              <div
                key={idx}
                className="px-3 py-2 hover:bg-red-50 cursor-pointer transition"
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : isLoading ? (
            <div className="px-3 py-2 text-gray-500">Loading...</div>
          ) : (
            <div className="px-3 py-2 text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

/* 🔐 PASSWORD INPUT (RED THEME) */
interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  onToggle: () => void;
  placeholder: string;
  helper?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
  helper,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-red-500 focus:border-red-500 
                   outline-none transition-all"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
  </div>
);
