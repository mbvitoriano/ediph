var feedback = function (res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-primary');
        document.querySelector('.status').classList.add('text-white');
        document.querySelector('.status').innerHTML =
            '<br><input style="display: none;" name="imageDone" class="image-url" value=\"' + get_link + '\"/>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
        document.querySelector('.labelFile').style.display = 'none';
        document.querySelector('.inputfile').style.display = 'none';
    }
};

new Imgur({
    clientid: '1838e8d1cf80450', // 4409588f10776f7
    callback: feedback
});