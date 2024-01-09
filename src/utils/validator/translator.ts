type Values = {
    [key: string] : string
}
const dictionary:Values = {
    fullName: 'نام کامل',
    email: 'ایمیل',
    password: 'رمز عبور',
    rules: 'قوانین و مقررات',
    username:'نام کاربری',
    user_name:'نام کاربری',
    currentPassword:'رمز عبور فعلی',
    newPassword:'رمز عبور جدید',
    confirmNewPassword:'تکرار رمز عبور جدید',
    shareWithEmail: 'ایمیل اشتراک گذاری',
    workSpaceName: "نام ورک اسپیس جدید",
    first_name: "نام",
    last_name: "نام خانوادگی",
    phone_number: "شماره تلفن",
    thumbnail: "تصویر",
    old_password: 'رمز عبور',
    new_password: 'رمز عبور جدید',
    new_password1: 'تکرار رمز عبور جدید',
    board_id: 'ستون برای تسک',
    name: 'عنوان'
}

const Translator = (input: string): string => {
    return dictionary[input]
}

export default Translator;