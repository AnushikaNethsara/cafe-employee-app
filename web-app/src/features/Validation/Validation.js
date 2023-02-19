export const validateLength = (value) => {
    return value.length >= 6 && value.length <= 10;
};

export const validatePhoneNumber = (value) => {
    const phoneRegex = /^[89]\d{7}$/;
    return phoneRegex.test(value);
};

export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

export const validateEmployeeId = (value) => {
    const regex = /^UI[\w\d]{7}$/;
    return regex.test(value);
};