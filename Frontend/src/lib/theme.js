// Contains functions which are used to switch between themes

const style = document.documentElement.style;

export const setlighttheme = () => {
    style.setProperty('--imgcolor', 'white');
    style.setProperty('--backgroundcolor', 'white');

    style.setProperty('--secondarycolor2', '#b44bd8');
    style.setProperty('--secondarycolor', '#007bff');
    style.setProperty('--textcolor', 'black');
    style.setProperty('--blurcolor2', '#b54bd88e');
    style.setProperty('--btncolor', '#3c3c3c');
    style.setProperty('--invertedtextcolor', 'white');
    style.setProperty('--inverted', 'invert(1)');
    style.setProperty('--backward-invert', 'invert(0)');
    style.setProperty('--blurborder', 'rgba(0, 0, 0, 0.219)');
    style.setProperty('--backgroundcolor2', '#ad8dc7');
    // style.setProperty('--homebackground', '#5d5d74');
};

export const setdarktheme = () => {
    style.setProperty('--imgcolor', 'black');
    style.setProperty('--backgroundcolor', '#2c2c2c');

    style.setProperty('--secondarycolor', '#ffc047');
    style.setProperty('--secondarycolor2', '#d8914b');
    style.setProperty('--textcolor', 'white');
    style.setProperty('--btncolor', '#ffc047');
    style.setProperty('--blurcolor2', '#ffbf479c');
    style.setProperty('--invertedtextcolor', 'black');
    style.setProperty('--inverted', 'invert(0)');
    style.setProperty('--backward-invert', 'invert(1)');
    style.setProperty('--blurborder', 'rgba(255, 255, 255, 0.219)');
    style.setProperty('--backgroundcolor2', '#969481');
    // style.setProperty('--homebackground', 'red');
};
