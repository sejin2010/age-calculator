const input = document.getElementById('birth-date');
const result = document.getElementById('result');
const error = document.getElementById('error');
input.max = new Date().toISOString().split('T')[0];
const getBirthDate = () => {
    const birth = new Date(input.value);
    const birthDate = birth.getUTCDate();
    const birthMonth = birth.getUTCMonth() + 1;
    const birthYear = birth.getUTCFullYear();
    return { birthDate, birthMonth, birthYear };
};
const getToday = () => {
    const today = new Date();
    const dateToday = today.getUTCDate();
    const monthToday = today.getUTCMonth() + 1;
    const yearToday = today.getUTCFullYear();
    return { dateToday, monthToday, yearToday };
};
const calculateAge = () => {
    const { birthDate, birthMonth, birthYear } = getBirthDate();
    const { dateToday, monthToday, yearToday } = getToday();
    let day, month, year;
    year = yearToday - birthYear;
    if (monthToday >= birthMonth) {
        month = monthToday - birthMonth;
    } else {
        year--;
        month = 12 + monthToday - birthMonth;
    }
    if (month < 0) {
        month = 11;
        year--;
    }
    if (dateToday >= birthDate) {
        day = dateToday - birthDate;
    } else {
        month--;
        day = getDaysInMonth(yearToday, monthToday) + dateToday - birthDate;
    }
    return { day, month, year };
};
const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};
const displayAge = () => {
    const { day, month, year } = calculateAge();
    const dayText = day > 1 ? 'days' : 'day';
    const monthText = month > 1 ? 'months' : 'month';
    const yearText = year > 1 ? 'years' : 'year';
    result.innerHTML = `
        <p>Your age is: ${year} ${yearText}, ${month} ${monthText}, ${day} ${dayText}</p>
    `;
};
const showError = (message) => {
    error.innerHTML = `<p>${message}</p>`;
};
const calculateButton = document.getElementById('calculate-button');
calculateButton.addEventListener('click', function () {
    const { birthDate, birthMonth, birthYear } = getBirthDate();
    const { yearToday } = getToday();
    if (!birthDate, !birthMonth, !birthYear) {
        showError('Please Enter Your Birth Date');
        return;
    }
    if (birthYear > yearToday) {
        showError(`Year can not be more than ${yearToday}`);
        return;
    }
    error.textContent = '';
    calculateAge();
    displayAge();
});
