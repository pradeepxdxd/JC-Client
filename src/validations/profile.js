export const imageValidation = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/heic',
]

export const isValidImage = fileType => {
    return imageValidation.includes(fileType);
}