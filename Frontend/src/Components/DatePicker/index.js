import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import './popup.scss';

const cx = classNames.bind(style);

function DatePicker({ label = 'Text', default_day = new Date(), onChange = () => {} }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['Picker']}>
                <Picker className={cx('date')} label={label} value={dayjs(default_day)} onChange={onChange} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default DatePicker;
