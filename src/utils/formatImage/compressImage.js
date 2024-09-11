export async function compressImage(blobImg, percent) {
    let bitmap = await createImageBitmap(blobImg);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    let dataUrl = canvas.toDataURL("image/jpeg", percent / 100);
    return dataUrl;
}