import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { GUESTBOOK_LIMITS, validateGuestbook, validatePhoto } from '../../utils/validate-guestbook';
import { outlinedCardSx } from './contact-styles';
import PhotoUploadField from './photo-upload-field';

const INITIAL_VALUES = { nickname: '', email: '', affiliation: '', message: '' };

/** 밑줄형 입력창 (참고 이미지 "Enter your name" 스타일) */
const underlineFieldSx = {
  '& .MuiInputBase-root': { color: 'var(--contact-text)', fontSize: 15 },
  '& .MuiInput-underline::before': { borderBottom: '1.5px solid var(--contact-border)' },
  '& .MuiInput-underline:hover:not(.Mui-disabled)::before': { borderBottom: '2px solid var(--contact-navy)' },
  '& .MuiInput-underline::after': { borderBottomColor: 'var(--contact-navy)' },
  '& .MuiInputLabel-root': { color: 'var(--contact-text-on-sky)', fontWeight: 600 },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--contact-navy)' },
  '& .MuiFormHelperText-root': { color: 'var(--contact-text-on-sky)', mx: 0 },
  '& .MuiFormHelperText-root.Mui-error, & .MuiInputLabel-root.Mui-error': { color: 'error.main' },
};

/** 메모장 박스형 입력창 (참고 이미지 "Keep your notes here" 스타일) */
const noteFieldSx = {
  '& .MuiInputBase-root': {
    bgcolor: 'var(--contact-surface)',
    color: 'var(--contact-text)',
    borderRadius: 3,
    alignItems: 'flex-start',
  },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-border)', borderWidth: 1.5 },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-navy)' },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--contact-navy)' },
  '& .MuiFormHelperText-root': { color: 'var(--contact-text-on-sky)', mx: 0, textAlign: 'right' },
  '& .MuiFormHelperText-root.Mui-error': { color: 'error.main', textAlign: 'left' },
};

/**
 * 방명록 작성 폼
 * - 아이디/닉네임은 공개되고, 이메일은 DB에만 저장됩니다(비공개).
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
    slotProps: { htmlInput: { maxLength } },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ ...outlinedCardSx, bgcolor: 'var(--contact-sky)', p: { xs: 3, md: 4 } }}
    >
      <Grid container columnSpacing={4} rowSpacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('nickname', '아이디 / 닉네임', GUESTBOOK_LIMITS.nickname)}
            variant="standard"
            required
            sx={underlineFieldSx}
            helperText={errors.nickname || '방명록에 표시돼요. 아이디나 닉네임 중 편한 걸로 적어 주세요.'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...fieldProps('affiliation', '소속 / 직업 (선택)', GUESTBOOK_LIMITS.affiliation)}
            variant="standard"
            sx={underlineFieldSx}
            helperText={errors.affiliation || '예: OO대학교, 프론트엔드 개발자'}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...fieldProps('email', '이메일 (선택)', 254)}
            variant="standard"
            type="email"
            sx={underlineFieldSx}
            helperText={errors.email || '공개되지 않아요. 답장이 필요할 때만 사용해요.'}
          />
        </Grid>
        <Grid size={12} sx={{ mt: 1 }}>
          <TextField
            {...fieldProps('message', '', GUESTBOOK_LIMITS.message)}
            placeholder="남기실 말을 적어 주세요..."
            slotProps={{ htmlInput: { maxLength: GUESTBOOK_LIMITS.message, 'aria-label': '남기실 말' } }}
            required
            multiline
            minRows={4}
            sx={noteFieldSx}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 13, color: 'var(--contact-text-on-sky)' }}>
          <LockOutlinedIcon sx={{ fontSize: 16 }} aria-hidden="true" />
          이메일은 비공개로 저장돼요.
        </Box>
        <Button
          type="submit"
          disabled={isSubmitting}
          endIcon={
            isSubmitting ? (
              <CircularProgress size={18} sx={{ color: 'inherit' }} />
            ) : (
              <Box
                component="span"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'var(--contact-on-navy)',
                  color: 'var(--contact-navy)',
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
            )
          }
          sx={{
            pl: 3,
            pr: 1,
            bgcolor: 'var(--contact-navy)',
            color: 'var(--contact-on-navy)',
            '&:hover': { bgcolor: 'var(--contact-navy-hover)' },
            '&.Mui-disabled': { bgcolor: 'var(--contact-navy-soft)', color: 'var(--contact-text-sub)' },
          }}
        >
          방명록 남기기
        </Button>
      </Box>
    </Box>
  );
}

export default GuestbookForm;
