import React, { useState } from 'react'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText, Input, FilledInput } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface PasswordProps {
  value: any
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  label?: string
  error?: string | boolean | undefined | null
  variant?: 'outlined' | 'standard' | 'filled'
  id?: string
}

function PasswordInput({ value, onChange, label, error, variant, id }: PasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <FormControl variant={variant} margin='dense' fullWidth>
      <InputLabel htmlFor="outlined-adornment-password" size='small' error={!!error}>{label}</InputLabel>
      {variant === 'standard' && (
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          size='small'
          value={value}
          error={!!error}
          onChange={e => onChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      )}
      {variant === 'outlined' && (
        <OutlinedInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          size='small'
          value={value}
          error={!!error}
          onChange={e => onChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      )}
      {variant === 'filled' && (
        <FilledInput
          id={id}
          type={showPassword ? 'text' : 'password'}
          size='small'
          value={value}
          error={!!error}
          onChange={e => onChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      )}
      {error && <FormHelperText error>{typeof error == 'string' && error}</FormHelperText>}
    </FormControl>
  )
}

PasswordInput.defaultProps = {
  variant: 'outlined'
}

export default PasswordInput