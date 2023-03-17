const svgCaptchaConfig = {
    size: 4, // 验证码长度
    width: 160,
    height: 60,
    fontSize: 50,
    ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#eee' // 验证码图片背景颜色
}

module.exports = svgCaptchaConfig