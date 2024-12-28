
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { APP_COLORS } from '../../../theme/colors';

export const ColorButton = styled(Button)(({ theme }) => ({
    color: APP_COLORS.PRIMARY,
    // backgroundColor: APP_COLORS.PRIMARY,
    '&:hover': {
        // backgroundColor: APP_COLORS.PRIMARY,
    },
}));

export const ColorButtonFilled = styled(Button)(({ theme }) => ({
    // color: APP_COLORS.PRIMARY,
    backgroundColor: APP_COLORS.PRIMARY,
    '&:hover': {
        backgroundColor: APP_COLORS.PRIMARY,
    },
}));
