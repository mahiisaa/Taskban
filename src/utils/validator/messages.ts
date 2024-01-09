export const requiredMessage = (fieldName: string) => {
    return `وارد کردن ${fieldName} الزامی است.`;
}

export const minLengthMessage = (fieldName: string, n: number) => {
    return  `${fieldName} باید حداقل ${n} کاراکتر باشد.`;
}

export const minMessage = (fieldName: string, n: number) => {
    return `${fieldName} باید بزرگتر از ${n} باشد.`;
}    

export const maxMessage = (fieldName: string, n: number) => {
    return `${fieldName} باید کوچکتر از ${n} باشد.`;
}

export const emailMessage = (fieldName: string) => {
    return  `آدرس ${fieldName} معتبر نیست.`;
}   

export const checkedMessage = (fieldName: string) => {
    return  `${fieldName} باید پذیرفته شود.`;
}   

export const strongMessage = (fieldName: string) => {
    return  `${fieldName} باید شامل حروف، اعداد و علامت باشد.`;
}   

export const equalMessage = (fieldName: string, extraValue: string) => {
    return `${fieldName} باید برابر با ${extraValue} باشد.`;
}   