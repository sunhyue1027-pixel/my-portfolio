import { useEffect, useId, useMemo } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { PHOTO_TYPES } from '../../utils/validate-guestbook';

/**
 * 사진 업로드 필드 (선택 + 미리보기 + 삭제)
 *
 * Props:
 * @param {File|null} file - 선택된 사진 [Required]
 * @param {function} onChange - 파일 선택/삭제 시 호출 (File | null) [Required]
 * @param {string} errorText - 에러 메시지 [Optional, 기본값: '']
 * @param {boolean} isDisabled - 비활성화 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <PhotoUploadField file={ photo } onChange={ setPhoto } />
 */
function PhotoUploadField({ file, onChange, errorText = '', isDisabled = false }) {
  const inputId = useId();
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleSelect = (event) => {
    const selected = event.target.files?.[0] ?? null;
    event.target.value = '';
    if (selected) onChange(selected);
  };

  return (
    <Box>
      {previewUrl ? (
        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
          <Box
            component="img"
            src={previewUrl}
            alt="선택한 사진 미리보기"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 3, border: '1px solid var(--contact-border)' }}
          />
          <IconButton
            size="small"
            aria-label="사진 삭제"
            onClick={() => onChange(null)}
            disabled={isDisabled}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              bgcolor: 'var(--contact-navy)',
              color: 'var(--contact-on-navy)',
              '&:hover': { bgcolor: 'var(--contact-navy-hover)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          component="label"
          htmlFor={inputId}
          sx={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            minHeight: 44,
            px: 2,
            borderRadius: 999,
            border: '1.5px dashed var(--contact-pink-strong)',
            color: 'var(--contact-pink-ink)',
            fontSize: 14,
            fontWeight: 600,
            cursor: isDisabled ? 'default' : 'pointer',
            opacity: isDisabled ? 0.5 : 1,
            transition: 'background-color 0.2s ease',
            '&:hover': { bgcolor: 'var(--contact-pink)' },
            '&:focus-within': { outline: '2px solid var(--contact-navy)', outlineOffset: 2 },
          }}
        >
          <AddPhotoAlternateOutlinedIcon fontSize="small" />
          사진 첨부 (선택 · 5MB 이하)
          <Box
            component="input"
            id={inputId}
            type="file"
            accept={PHOTO_TYPES.join(',')}
            onChange={handleSelect}
            disabled={isDisabled}
            sx={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }}
          />
        </Box>
      )}

      {errorText && (
        <Box role="alert" sx={{ mt: 1, fontSize: 13, color: 'error.main' }}>
          {errorText}
        </Box>
      )}
    </Box>
  );
}

export default PhotoUploadField;
