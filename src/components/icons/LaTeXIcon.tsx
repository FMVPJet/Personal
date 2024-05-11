const LaTeXIcon = ({
  size = 17, // or any default size of your choice
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M2.176 2.814c.233.42.476.78.73 1.09c.247-.013 1.132.456 1.312.523c.508.282 1.063.63 1.567.966c.505.337.96.662 1.272.9c.156.12.278.218.352.286a.5.5 0 0 1 .078.082l.01.021a.06.06 0 0 1-.004.047a.06.06 0 0 1-.04.03h-.028c-.057 0-.203-.163-.497-.415a23.5 23.5 0 0 0-2.759-1.827c-.504-.28-.956-.542-1.264-.613a2.3 2.3 0 0 0-.36-.025a2.7 2.7 0 0 0-.788.133c.494.414.91.716 1.28.949c-.57-.182-1.182-.21-1.902.133c.526.329.967.567 1.354.745c1.103.156 2.258.696 3.224 1.309c.483.307.904.615 1.219.867c.157.125.29.237.39.328c.098.091.174.154.197.21c.03.073-.019.104-.084.058c-.032-.022-.088-.102-.184-.191a7 7 0 0 0-.384-.327a14 14 0 0 0-1.209-.857c-.893-.562-2.232-1.013-3.173-1.397a2.46 2.46 0 0 0-1.906.39c.449.2.837.349 1.182.463c.812 0 1.892.365 2.935.922c1.042.556 2.04 1.214 2.523 1.774c.066.077-.016.126-.074.07c-.52-.495-1.463-1.204-2.498-1.756c-.639-.337-2.153-1.01-2.886-1.01l.004.002c-.567.02-1.13.195-1.679.716c.477.118.885.196 1.244.249c-.44.088-.87.3-1.289.722q.485.103.882.162a2.5 2.5 0 0 0-.923.78c.373.03.703.042 1 .044c-.36.166-.696.43-.996.85c.533.027.98.025 1.364.003c-.422.172-.812.464-1.145.968c.662.01 1.188-.022 1.628-.076l-.006.002c.99-.073 2.297.127 2.962.847c.052.057-.024.118-.072.074c-.648-.58-1.493-.827-2.89-.921h-.002c-.543.149-1.046.446-1.46 1.074c.536.008.982-.013 1.366-.05c-.469.257-.873.644-1.139 1.306c.483-.092.888-.19 1.237-.292c-.363.265-.668.636-.873 1.194q.484-.108.871-.221a2.5 2.5 0 0 0-.513 1.095c.352-.13.655-.254.926-.377c-.257.3-.453.681-.55 1.19c.495-.199.899-.388 1.238-.568c-.31.333-.543.76-.635 1.356a12 12 0 0 0 1.442-.744c-.433.362-.764.843-.879 1.587c.788-.348 1.339-.663 1.767-.955c-.184.372-.282.806-.235 1.348c.762-.584 1.243-1.056 1.602-1.473c-.024.269-.003.56.077.884c.546-.939 1.089-1.212 1.65-1.526c-.895.451-.762.79-.762 1.184c.683-.72 1.635-1.482 1.927-1.96c-.39.585-.547 1.14-.65 1.63c-1.993 1.054-3.207 1.329-4.568 1.75c.528.194 1.093.383.859.652l-.624.622c.399-.124.805-.3 1.158-.059c-.035.327-.447.492-.8.683c.621-.224.756-.172.92-.12c.081.393-.203.603-.388.862c1.565-1.19 3.606-2.13 5.044-2.522c2.022-.681 4.63-1.389 5.339-3.115l.712-2.847l-.004.004c-.111-.034-.246-.063-.35-.133a.65.65 0 0 1-.235-.297c-.252.065-.44.03-.56-.088c-.117-.117-.167-.296-.203-.491c-.203.041-.362.016-.467-.077c-.116-.101-.17-.26-.198-.444l-.008-.039l.037-.015a.8.8 0 0 0 .302-.194a.26.26 0 0 0 .07-.225l-.006-.037l.03-.016c.163-.093.345-.169.428-.28a.27.27 0 0 0 .053-.21a.9.9 0 0 0-.155-.357l-.027-.04l.04-.027c.118-.09.244-.179.308-.26q.048-.06.047-.11c0-.033-.015-.07-.064-.117l-.098-.094l.135.006q.321.015.538-.053a.5.5 0 0 0 .274-.197c-.007-.033-.02-.063-.02-.098a.484.484 0 0 1 .967 0c0 .044-.015.084-.026.125c.177.014.347.01.507-.06l.002.001l.035-.013c.236-.085.334.045.72-.456c-1.69-2.19-4.157-.635-4.977 1.622c-.21.576-1.405.578-1.751 0c-1.37-2.95-5.53-6.068-9.07-7.218m.86 2.145c.906.293 1.913.782 2.77 1.328c.43.273.813.543 1.114.779s.566.473.62.575s0 .14-.082.06c-.081-.078-.303-.32-.6-.553a14 14 0 0 0-1.106-.777c-.775-.49-1.982-.958-2.716-1.412m-1.7 2.7c1.116.014 2.35.447 3.434.997a11.5 11.5 0 0 1 1.395.83c.372.263.672.524.734.657c.061.134-.02.13-.087.055a4.4 4.4 0 0 0-.704-.626a11.5 11.5 0 0 0-1.385-.826C3.76 8.264 2.439 7.82 1.336 7.66zm14.916.772a.381.381 0 1 0 0 .762a.381.381 0 0 0 0-.762M1.7 8.478c.822.072 1.72.368 2.534.75c1.086.509 2.035 1.158 2.434 1.667c.035.045-.014.131-.08.062c-.428-.44-1.322-1.131-2.397-1.635c-.913-.421-2.282-.87-3.262-.78c.251-.03.497-.088.771-.064m16.339.01c-.366.475-.53.423-.703.464c.094.43.35.586.585.77l-.06.012c2.315-.447 4.186-.286 6.139-.236zm-.178 1.246h-.002l-.004.016zm-.625-.757a1.2 1.2 0 0 1-.563.059a.48.48 0 0 1-.42.26a.48.48 0 0 1-.435-.278a.6.6 0 0 1-.274.188a1.6 1.6 0 0 1-.493.055c.02.035.054.068.055.104a.27.27 0 0 1-.069.174c-.073.092-.189.17-.295.248q.13.21.149.362a.4.4 0 0 1-.07.284c-.106.14-.288.21-.439.293a.37.37 0 0 1-.09.268a.9.9 0 0 1-.297.198c.027.156.074.283.154.354c.086.076.211.103.425.047l.055-.014l.01.055c.033.207.088.385.187.483c.1.099.244.135.503.055l.049-.015l.016.048a.52.52 0 0 0 .209.282c.087.06.247.112.358.147c.798-.869 1.525-1.772 1.884-2.86c-.225-.177-.506-.338-.609-.797m-16.23.386c1.165-.08 2.283.196 3.202.626c.92.43 1.658.939 1.974 1.307c.075.087-.019.12-.072.072a8.2 8.2 0 0 0-1.947-1.29c-.904-.414-2.193-.644-3.157-.715m.864.802c.61.02 1.24.155 1.806.352c.756.262 1.421.614 1.747.98c.045.05-.007.127-.074.069c-.349-.304-.961-.693-1.706-.951c-.574-.195-1.613-.369-2.268-.397c.197-.022.292-.06.495-.053m1.05 1.788c.423.034.886.133 1.341.407c.043.026.049.136-.049.09c-.856-.402-1.326-.49-2.457-.31c.386-.128.74-.221 1.164-.187zm-.04.788c.4-.035.784-.002 1.297.204c.044.018.08.126-.033.094c-.857-.243-1.167-.328-2.287.104a1.84 1.84 0 0 1 1.023-.402m1.285.687c.317-.023.635-.026.934.006c.052.006.055.105-.006.102a8 8 0 0 0-1.837.115c-.243.046-.423.043-1.405.458c.287-.233.794-.452 1.385-.56a9 9 0 0 1 .93-.12zm1.28.49c.099.003.062.104.006.103c-.728-.01-1.304.132-1.875.295a10 10 0 0 0-1.318.525c.283-.23.713-.457 1.291-.622c.579-.166 1.248-.326 1.896-.302zm.528.398c.036-.005.105.084.018.1c-.73.137-1.244.267-1.794.454c-.216.074-.58.207-1.243.587c.26-.269.656-.492 1.213-.68a10.6 10.6 0 0 1 1.806-.46zm.311.507c.075-.012.097.087.02.102c-1.217.241-1.76.556-2.54 1.144c.504-.523 1.297-1.051 2.52-1.246m.595.448c.087-.013.11.087.021.1c-.872.13-1.477.553-2.255 1.33c.295-.493 1.004-1.24 2.234-1.43m.372.39c.046-.006.114.073.023.1a2.6 2.6 0 0 0-.669.3c-.182.118-.3.2-.597.507c.111-.245.296-.434.542-.59c.247-.157.509-.293.7-.317z"></path>
  </svg>
);


export default LaTeXIcon;
