import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { GUESTBOOK_LIMITS, validateGuestbook, validatePhoto } from '../../utils/validate-guestbook';
import PhotoUploadField from './photo-upload-field';

const INITIAL_VALUES = { nickname: '', realName: '', email: '', affiliation: '', message: '' };

/** Contact 색상에 맞춘 입력창 스타일 */
const fieldSx = {
  '& .MuiInputBase-root': { bgcolor: 'var(--contact-surface)', borderRadius: 3, color: 'var(--contact-text)' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-border)' },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-navy)' },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-navy)' },
  '& .MuiInputLabel-root': { color: 'var(--contact-text-sub)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--contact-navy)' },
  '& .MuiFormHelperText-root': { color: 'var(--contact-text-sub)' },
  '& .MuiFormHelperText-root.Mui-error, & .MuiInputLabel-root.Mui-error': { color: 'error.main' },
};

/**
 * 방명록 작성 폼
 * - 화면에는 닉네임만 공개되고, 실명·이메일은 DB에만 저장됩니다.
 *
 * Props:
 * @param {function} onSubmit - (values, photo) => Promise, 저장 실패 시 throw [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ addEntry } />
 */
function GuestbookForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhotoChange = (file) => {
    const photoError = file ? validatePhoto(file) : '';
    setErrors((prev) => ({ ...prev, photo: photoError }));
    setPhoto(photoError ? null : file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateGuestbook(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      await onSubmit(values, photo);
      setValues(INITIAL_VALUES);
      setPhoto(null);
      setStatus({ type: 'success', message: '방명록이 등록되었어요. 남겨 주셔서 감사합니다!' });
    } catch {
      setStatus({ type: 'error', message: '등록하지 못했어요. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /** 공통 TextField 속성 */
  const fieldProps = (name, label, maxLength) => ({
    name,
    label,
    value: values[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    disabled: isSubmitting,
    fullWidth: true,
    sx: fieldSx,
    slotProps: { htmlInput: { maxLength } },
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('nickname', '닉네임', GUESTBOOK_LIMITS.nickname)}
            required
            helperText={errors.nickname || '방명록에 표시되는 이름이에요.'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('realName', '실명', GUESTBOOK_LIMITS.realName)}
            required
            helperText={errors.realName || '공개되지 않아요.'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('email', '이메일 (선택)', 254)}
            type="email"
            helperText={errors.email || '공개되지 않아요. 답장이 필요할 때만 사용해요.'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('affiliation', '소속 / 직업 (선택)', GUESTBOOK_LIMITS.affiliation)}
            helperText={errors.affiliation || '예: OO대학교, 프론트엔드 개발자'}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...fieldProps('message', '남기실 말', GUESTBOOK_LIMITS.message)}
            required
            multiline
            minRows={4}
            helperText={errors.message || `${values.message.length} / ${GUESTBOOK_LIMITS.message}`}
          />
        </Grid>
        <Grid size={12}>
          <PhotoUploadField file={photo} onChange={handlePhotoChange} errorText={errors.photo} isDisabled={isSubmitting} />
        </Grid>
      </Grid>

      {status.message && (
        <Alert severity={status.type} sx={{ mt: 3, borderRadius: 3 }}>
          {status.message}
        </Alert>
      )}

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 13, color: 'var(--contact-text-sub)' }}>
          <LockOutlinedIcon sx={{ fontSize: 16 }} aria-hidden="true" />
          실명과 이메일은 안전하게 비공개로 저장돼요.
        </Box>
        <Button
          type="submit"
          disabled={isSubmitting}
          sx={{
            px: 4,
            bgcolor: 'var(--contact-navy)',
            color: 'var(--contact-on-navy)',
            '&:hover': { bgcolor: 'var(--contact-navy-hover)' },
            '&.Mui-disabled': { bgcolor: 'var(--contact-navy-soft)', color: 'var(--contact-text-sub)' },
          }}
        >
          {isSubmitting ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : '방명록 남기기'}
        </Button>
      </Box>
    </Box>
  );
}

export default GuestbookForm;
