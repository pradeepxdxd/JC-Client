export function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            const base64String = reader.result;
            resolve(base64String);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(imageFile);
    });
}