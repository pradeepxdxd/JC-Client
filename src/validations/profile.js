export const imageValidation = [
    'image/jpeg',
    'image/jpg',
    'image/png',
]

export const isValidImage = fileType => {
    return imageValidation.includes(fileType);
}