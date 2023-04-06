// Contains functions which are used to switch between themes

const style = document.documentElement.style;

export const setlighttheme = () => {
    style.setProperty('--imgcolor', 'white');
    style.setProperty('--backgroundcolor', 'white');
    style.setProperty('--textcolor', 'black');
    style.setProperty('--btncolor', '#c3c3c3');
};

export const setdarktheme = () => {
    style.setProperty('--imgcolor', 'black');
    style.setProperty('--backgroundcolor', 'rgb(48, 48, 48)');
    style.setProperty('--textcolor', 'white');
    style.setProperty('--btncolor', '#3c3c3c');
};
