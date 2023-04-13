import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './style.module.scss';
const cx = classNames.bind(styles);

function TickBox({ click, value, force_select }) {
    const [ticked, setticked] = useState(false);
    let classes = ticked ? `${cx('checkbox')} ${cx('ticked')}` : cx('checkbox');

    // force_selected : if this is available, force the
    // current form to be unticked if its "value" doesn't
    // match "force_select"

    if (force_select !== undefined && force_select !== null)
        if (force_select === value)
            // TIckbox can be in two mode, first mode is independent, this box doesn't
            // involve the other boxes which doesn't need a "force_select",
            // Second mode will depend on multiple boxes, if one box is ticked, the others
            // have to be off
            classes = `${cx('checkbox')} ${cx('ticked')}`;
        else classes = cx('checkbox');

    return (
        <div
            onClick={() => {
                const new_v = !ticked;
                setticked(new_v);
                if (click) click(value ? value : new_v);
            }}
            className={classes}
        ></div>
    );
}

export default TickBox;
