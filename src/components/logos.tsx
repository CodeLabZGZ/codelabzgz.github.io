import Image from 'next/image'
import { useId } from 'react'

export function Codelab(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId()

  return (
    <div className='flex items-center gap-4'>
      <Image 
        key={id} 
        src="/logo.webp" 
        alt='logo' 
        className='-rotate-12' 
        width={50}
        height={50}
      />
      <span className='text-2xl font-mono text-white'>
        CodeLab
      </span>
    </div>
  )
}

export function Eina({ className }) {
  return (
    <svg className={`${className} h-auto`} version="1.0" width="729.000000pt" height="729.000000pt" viewBox="0 0 729.000000 729.000000">
      <g transform="translate(0.000000,729.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
      <path d="M4250 6354 c-306 -171 -410 -233 -410 -243 0 -5 33 -12 73 -15 39 -4 445 -40 902 -81 456 -41 830 -75 832 -75 6 0 3 -1966 -3 -1988 -6 -21 -11 -22 -53 -17 -97 14 -307 46 -323 51 -17 5 -18 53 -18 824 l0 819 -42 6 c-144 20 -1836 225 -1860 225 -17 0 -175 -73 -391 -181 -489 -245 -592 -300 -576 -309 22 -12 571 -86 1599 -216 289 -36 527 -68 530 -71 7 -7 12 -2138 5 -2211 l-7 -63 -31 6 c-18 2 -106 16 -197 31 -91 14 -172 27 -181 30 -15 4 -17 81 -20 909 -3 585 -8 907 -14 913 -14 14 -876 144 -1667 253 l-666 91 -532 -286 c-706 -381 -685 -369 -663 -378 21 -9 557 -110 1633 -308 421 -77 771 -142 778 -145 9 -3 12 -266 11 -1272 -1 -697 -4 -1295 -8 -1328 -6 -59 -6 -60 -36 -57 -16 1 -295 54 -620 117 -650 126 -1408 269 -1470 278 l-40 6 45 -15 c25 -8 371 -98 770 -200 740 -189 1572 -403 1940 -498 l205 -54 382 -6 381 -6 213 323 c429 649 603 923 594 936 -3 5 -33 14 -67 20 -59 10 -1154 171 -1164 171 -2 0 -4 90 -4 200 0 164 2 200 14 200 14 0 648 -127 900 -181 131 -27 153 -29 365 -29 l226 0 160 242 c296 451 384 593 371 605 -7 7 -276 51 -603 99 l-263 39 0 162 c0 146 2 163 17 163 9 0 125 -20 257 -45 440 -81 539 -96 681 -102 l140 -5 84 128 c238 364 321 493 321 502 0 10 -60 19 -365 53 -104 12 -200 25 -212 30 l-23 9 0 953 0 953 -307 32 c-170 18 -522 52 -783 77 -261 24 -500 47 -530 50 l-55 5 -225 -126z"/>
      <path d="M708 1683 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
      </g>
    </svg>
  )
}

export function Dcrow({ className = 'w-full' }) {
  return (
    <svg 
      version="1.0" 
      xmlns="http://www.w3.org/2000/svg" 
      width="5795.000000pt" 
      height="6126.000000pt" 
      viewBox="0 0 5795.000000 6126.000000" 
      preserveAspectRatio="xMidYMid meet" 
      className={`${className} h-auto`}
    >
      <g transform="translate(0.000000,6126.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
      <path d="M29930 61254 c-1029 -24 -1880 -82 -2785 -190 -6736 -800 -12924 -4065 -17423 -9194 -3559 -4057 -5848 -9077 -6566 -14405 -173 -1279 -246 -2392 -246 -3731 0 -635 7 -956 35 -1489 221 -4183 1398 -8260 3443 -11920 52 -93 162 -286 244 -427 l150 -257 -599 -628 c-1149 -1206 -1248 -1308 -1258 -1306 -5 1 -67 27 -137 57 -324 142 -686 233 -1057 267 -190 17 -595 7 -771 -20 -236 -35 -379 -68 -580 -133 -530 -171 -979 -447 -1375 -843 -547 -547 -878 -1226 -981 -2020 -22 -161 -25 -619 -5 -770 66 -529 214 -970 465 -1393 324 -545 813 -1005 1373 -1290 489 -249 939 -364 1478 -379 593 -16 1127 102 1649 364 530 266 999 688 1329 1194 293 451 466 936 532 1495 20 168 23 538 6 704 -45 427 -160 832 -340 1195 l-60 120 22 24 c26 29 554 583 4430 4651 1622 1702 2973 3119 3003 3149 l53 54 1778 -16 c978 -10 1913 -20 2078 -23 l300 -6 5500 5608 c3024 3085 5582 5692 5684 5794 413 412 837 717 1351 974 250 125 426 198 675 281 404 135 818 218 1270 256 187 15 754 6 935 -15 1231 -145 2301 -667 3156 -1537 863 -880 1365 -1980 1475 -3234 15 -168 15 -643 0 -810 -81 -909 -355 -1711 -838 -2445 -155 -235 -258 -366 -407 -520 -249 -255 -7800 -7937 -8022 -8159 l-213 -215 -88 41 c-269 126 -585 225 -864 272 -230 39 -320 46 -604 45 -299 0 -419 -11 -665 -60 -1391 -277 -2477 -1394 -2709 -2789 -66 -393 -62 -837 10 -1215 191 -999 806 -1855 1696 -2359 349 -197 758 -336 1188 -401 179 -28 596 -38 795 -21 1007 89 1926 620 2506 1447 505 721 711 1595 584 2476 -49 334 -139 634 -292 966 l-61 133 270 272 c148 150 1847 1876 3775 3837 1928 1961 3559 3613 3624 3671 778 694 1425 1597 1838 2567 776 1824 776 3900 0 5724 -819 1924 -2444 3417 -4429 4067 -565 186 -1155 303 -1740 347 l-90 6 -3 177 c-26 1611 -583 3152 -1598 4422 -176 221 -281 338 -503 562 -561 567 -1115 977 -1856 1371 l-190 101 -3569 5 -3568 5 145 151 c340 352 763 681 1182 920 669 380 1435 610 2213 663 103 7 1136 11 3111 11 l2958 0 53 113 c147 310 338 687 411 812 356 608 818 1129 1369 1545 940 709 2083 1077 3255 1047 258 -7 366 -16 600 -48 914 -124 1802 -508 2530 -1092 402 -323 782 -736 1066 -1159 198 -293 607 -1041 958 -1748 1992 -4013 2871 -8456 2570 -12995 -161 -2437 -683 -4865 -1539 -7160 -585 -1569 -1352 -3125 -2245 -4555 -1521 -2436 -3456 -4612 -5695 -6406 -2537 -2032 -5476 -3581 -8533 -4495 l-249 -74 -1616 -1579 c-2070 -2022 -2893 -2827 -3114 -3045 l-177 -174 -118 55 c-347 165 -672 261 -1063 315 -182 25 -672 25 -860 0 -643 -87 -1183 -314 -1700 -713 -139 -107 -427 -391 -536 -529 -410 -514 -646 -1065 -741 -1725 -25 -178 -25 -702 0 -875 96 -661 314 -1177 713 -1695 114 -148 416 -450 564 -564 331 -256 639 -423 1015 -553 511 -176 1086 -228 1625 -147 601 90 1162 335 1645 720 141 113 406 378 519 519 256 322 441 657 572 1040 246 714 246 1516 0 2230 -42 125 -118 310 -157 386 l-18 37 941 919 941 920 135 -29 c990 -210 2281 -391 3402 -478 790 -61 1193 -75 2160 -75 852 0 1035 5 1640 40 4255 252 8360 1476 12045 3593 1647 946 3179 2050 4615 3327 680 604 1577 1499 2200 2195 2854 3187 4920 6974 6041 11073 802 2934 1110 5965 919 9042 -437 6999 -3539 13555 -8690 18365 -3173 2963 -7015 5142 -11160 6330 -2164 620 -4328 964 -6620 1050 -275 10 -1254 20 -1490 14z m1350 -2104 c1511 -54 2946 -226 4380 -526 4295 -899 8286 -2905 11596 -5830 500 -442 1107 -1026 1568 -1509 2006 -2102 3652 -4553 4831 -7195 1684 -3773 2416 -7898 2140 -12070 -243 -3672 -1286 -7249 -3053 -10475 -1426 -2604 -3305 -4949 -5537 -6910 -4060 -3566 -9105 -5737 -14455 -6219 -850 -77 -1399 -100 -2325 -100 -1096 0 -1886 43 -2910 160 -347 39 -935 119 -941 127 0 1 183 182 408 401 l409 399 472 157 c478 160 755 258 1127 400 4794 1830 8971 4956 12101 9055 1050 1375 1989 2885 2762 4442 2164 4360 3121 9183 2796 14088 -241 3638 -1195 7159 -2826 10425 -286 574 -710 1355 -906 1670 -1173 1886 -3130 3137 -5317 3399 -341 41 -437 46 -900 46 -360 -1 -493 -4 -635 -18 -965 -96 -1793 -332 -2625 -748 -1140 -572 -2100 -1423 -2811 -2491 -65 -98 -128 -196 -140 -218 l-23 -40 -2376 0 c-1526 0 -2433 -4 -2535 -10 -1492 -97 -2922 -651 -4085 -1584 -368 -295 -768 -689 -1074 -1059 -396 -478 -771 -1081 -1019 -1637 -48 -107 -652 -1545 -684 -1627 -4 -10 1003 -13 5013 -13 l5018 0 70 -42 c641 -378 1231 -939 1656 -1575 580 -868 880 -1851 880 -2889 l0 -212 -107 -26 c-1167 -290 -2222 -849 -3128 -1656 -65 -58 -2532 -2566 -5483 -5575 l-5365 -5470 -276 3 c-152 1 -978 9 -1836 17 -858 8 -1674 16 -1813 19 l-253 4 -2387 -2504 c-1313 -1377 -2390 -2504 -2393 -2504 -4 0 -62 100 -130 223 -1740 3151 -2779 6592 -3074 10181 -55 678 -74 1107 -82 1856 -7 766 11 1400 62 2100 397 5459 2518 10586 6099 14745 631 732 1430 1553 2146 2205 2064 1879 4444 3421 6985 4525 2928 1272 6022 1969 9245 2084 326 12 1418 12 1740 1z m-3893 -40834 c510 -101 921 -490 1048 -991 68 -268 50 -553 -54 -820 -113 -293 -354 -556 -644 -704 -187 -95 -382 -141 -602 -141 -220 0 -415 46 -602 141 -379 193 -638 540 -719 964 -24 121 -23 348 0 469 52 267 170 497 354 687 215 224 463 354 769 404 110 18 336 13 450 -9z m-23736 -2382 c483 -81 899 -436 1055 -901 88 -262 89 -572 3 -836 -134 -410 -486 -754 -894 -872 -765 -222 -1545 255 -1702 1042 -26 131 -23 375 5 510 118 550 550 965 1102 1058 108 19 319 18 431 -1z m16399 -11189 c471 -104 858 -449 1004 -897 49 -151 61 -231 61 -418 0 -187 -12 -267 -61 -418 -129 -394 -457 -723 -855 -856 -144 -48 -231 -61 -419 -61 -188 0 -273 12 -419 61 -410 137 -749 486 -867 892 -44 152 -57 260 -51 432 4 129 10 175 35 272 135 524 553 908 1092 1004 100 18 379 11 480 -11z"/>
      <path d="M30554 34766 c-231 -44 -398 -133 -573 -304 -49 -48 -3677 -3779 -8061 -8292 -4385 -4513 -8034 -8267 -8109 -8343 l-137 -138 -135 59 c-344 153 -714 248 -1097 282 -170 16 -584 7 -742 -15 -544 -76 -1027 -258 -1468 -554 -657 -440 -1146 -1100 -1372 -1853 -322 -1074 -106 -2236 581 -3113 558 -713 1353 -1164 2274 -1291 185 -26 675 -26 860 0 394 54 721 151 1063 316 1064 514 1778 1518 1918 2700 24 200 24 583 0 780 -49 404 -147 746 -318 1102 l-61 127 485 498 c5007 5144 15874 16335 15910 16383 69 91 143 248 174 365 24 88 27 119 27 260 0 141 -3 172 -27 260 -14 55 -48 145 -75 200 -137 279 -380 475 -689 556 -100 26 -327 34 -428 15z m-18139 -18840 c468 -105 839 -429 994 -869 55 -156 74 -273 74 -447 0 -174 -19 -290 -74 -447 -113 -324 -368 -607 -684 -759 -375 -181 -797 -179 -1170 6 -264 131 -479 345 -613 610 -157 313 -180 699 -61 1037 160 452 566 794 1043 878 105 18 392 13 491 -9z"/>
      <path d="M34885 33680 c-162 -26 -334 -95 -464 -187 -73 -52 75 96 -8551 -8563 -3540 -3554 -5825 -5855 -5859 -5901 -109 -144 -184 -337 -199 -509 -4 -48 2 -1036 15 -2196 12 -1160 22 -2272 22 -2470 l1 -361 -1637 -1604 c-901 -882 -2425 -2375 -3388 -3318 -962 -942 -1839 -1802 -1947 -1909 l-197 -196 -128 62 c-464 223 -946 332 -1478 332 -566 0 -1061 -119 -1568 -377 -1411 -718 -2142 -2323 -1766 -3873 233 -956 885 -1784 1757 -2228 389 -199 722 -301 1182 -364 128 -17 662 -17 790 0 460 63 793 165 1182 364 415 211 802 526 1097 893 814 1012 987 2393 449 3583 l-51 114 154 153 c85 84 838 822 1674 1641 4715 4617 5723 5607 5773 5675 100 135 168 305 192 479 8 54 3 764 -15 2564 l-26 2490 539 540 c5052 5067 13391 13448 13431 13501 177 233 247 554 186 846 -84 399 -405 721 -800 804 -96 20 -287 28 -370 15z m-23525 -28939 c457 -106 826 -432 979 -864 54 -155 74 -273 74 -447 0 -174 -20 -292 -74 -447 -155 -438 -533 -768 -999 -869 -120 -26 -410 -26 -530 0 -399 87 -732 338 -923 696 -103 192 -150 388 -150 620 0 278 69 509 218 735 218 329 551 537 960 599 75 11 362 -3 445 -23z"/>
    </g>
    </svg>
  )
}

export function Twitch({ className }) {
  return (
    <svg className={`${className} h-auto`} width="454.93066" height="280.76587" viewBox="0 0 454.93066 280.76587">
      <path
        d="m0 0-13.652-13.651h-21.445l-11.699-11.697v11.697h-17.548v56.544H0V0Zm-72.146 50.692-3.899-15.599v-70.19h17.55v-9.751h9.746l9.752 9.751h15.596L7.795-3.905v54.597h-79.941z"
        fill="currentColor"
        transform="matrix(1.3333333 0 0 -1.3333333 379.55105933 67.58932837)"
      />
      <path
        d="M377.167 655.053h7.799v23.401h-7.799v-23.401zm21.446 0h7.799v23.401h-7.799v-23.401z"
        transform="matrix(1.3333333 0 0 -1.3333333 -180.53426 935.79824)"
        fill="currentColor"
      />
      <path
        d="m0 0-13.646 13.645h-25.35v17.55h-21.451v-79.94h21.451v40.947h17.545v-40.947H0V0Zm-68.241 13.645h-33.146L-115.036 0v-35.094l13.649-13.651h33.146V-27.3h-25.35v19.502h25.35v21.443zm-54.594 0h-17.545v17.55h-21.451v-66.289l13.649-13.651h25.347V-27.3h-17.545v19.502h17.545v21.443zm-46.795 17.55h-21.445v-9.752h21.445v9.752zm0-17.55h-21.445v-62.389h21.445v62.389zm-29.244 0h-21.447V-27.3h-7.797v40.945h-21.448V-27.3h-7.796v40.945h-21.451v-62.39h66.293l13.646 13.651v48.739zm-87.738 0h-17.546v17.55h-21.447v-66.289l13.648-13.651h25.345V-27.3h-17.546v19.502h17.546v21.443zM7.793 3.9v-58.491L-21.451-74.09h-19.496v9.752l-13.648-9.752H-72.14v9.752l-9.746-9.752h-31.197l-9.752 9.752-1.952-9.752h-27.292l-11.161 9.752-.625-9.752H-194.8l-1.094 9.752-8.374-9.752h-47.25l-9.75 3.9v-3.9h-25.344l-29.247 17.552-17.546 17.539v77.991h37.047l17.545-17.549h79.939v17.549h66.29V21.443h17.548v-9.746l9.752 9.746h19.493l17.55 17.549h37.044V21.443h21.448L7.793 3.9Z"
        fill="currentColor"
        transform="matrix(1.3333333 0 0 -1.3333333 444.53999104 181.97919218)"
      />
    </svg>
  )
}

export function Cohere({ className = 'w-full' }) {
  return (
    <svg
      width="1320"
      height="225"
      viewBox="0 0 1320 225"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} h-auto`}
    >
      <g clipPath="url(#clip0_2833_44487)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.7878 133.637C76.6687 133.637 88.367 133.305 104.537 126.48C123.38 118.525 160.869 104.085 187.913 89.2536C206.827 78.8799 215.117 65.1597 215.117 46.6833C215.118 21.0401 194.843 0.251953 169.833 0.251953H65.0456C29.1218 0.251953 0 30.111 0 66.9442C0 103.777 27.2666 133.637 70.7878 133.637Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M88.5088 179.584C88.5088 161.529 99.1098 145.25 115.374 138.329L148.374 124.287C181.753 110.083 218.493 135.234 218.493 172.29C218.493 200.998 195.791 224.269 167.791 224.261L132.061 224.251C108.006 224.245 88.5088 204.249 88.5088 179.584Z"
          fill="currentColor"
        ></path>
        <path
          d="M37.4969 142.404H37.4962C16.7876 142.404 0 159.617 0 180.85V185.829C0 207.062 16.7876 224.275 37.4962 224.275H37.4969C58.2055 224.275 74.9932 207.062 74.9932 185.829V180.85C74.9932 159.617 58.2055 142.404 37.4969 142.404Z"
          fill="currentColor"
        ></path>
      </g>
      <path
        d="M377.992 224.23C410.448 224.23 438.852 207.591 450.081 173.998C452.261 167.27 449.135 162.8 442.903 162.8H430.727C425.112 162.8 421.369 165.351 418.859 170.792C409.193 190.32 395.761 197.342 378.917 197.342C348.95 197.342 330.542 175.894 330.542 140.066C330.542 104.238 349.588 82.7903 378.278 82.7903C395.761 82.7903 410.118 90.4662 419.167 108.708C421.986 114.149 425.399 116.7 431.035 116.7H443.212C449.443 116.7 452.57 112.546 450.39 106.45C437.289 69.9671 407.938 55.9021 377.992 55.9021C332.744 55.9021 299.033 90.1501 299.033 140.066C299.033 189.982 331.181 224.23 377.992 224.23ZM1194.69 125.346C1198.74 98.1421 1216.84 81.1874 1241.5 81.1874C1266.16 81.1874 1284.57 98.4581 1286.75 125.346H1194.69ZM1242.75 224.23C1271.47 224.23 1300.18 210.481 1314.23 179.439C1317.66 172.079 1314.54 166.954 1308.3 166.954H1296.77C1291.15 166.954 1287.72 169.505 1284.9 174.63C1275.54 191.585 1259.31 198.628 1242.78 198.628C1214.37 198.628 1195.97 178.784 1193.79 146.478H1308.33C1314.56 146.478 1318.63 142.956 1318.63 136.228C1317.38 85.9961 1285.56 55.9247 1241.54 55.9247C1197.53 55.9247 1162.58 88.5698 1162.58 140.089C1162.58 191.607 1196.6 224.252 1242.8 224.252L1242.75 224.23ZM1061.12 144.243H1071.43C1077.66 144.243 1081.09 140.721 1082.04 133.993C1087.99 90.7597 1112.67 85.0253 1138.91 86.3122C1144.53 86.5831 1149.13 82.1582 1149.13 76.3787V66.4678C1149.13 60.0787 1146 56.2182 1139.77 55.9021C1116.54 54.9991 1095.82 63.1716 1083.85 86.3122C1083.19 87.5764 1081.34 87.2378 1081.18 85.8155L1079.24 68.3642C1078.63 61.9751 1075.19 58.7693 1068.94 58.7693H1021.82C1016.31 58.7693 1011.82 63.3523 1011.82 69.0189V74.4597C1011.82 80.1037 1016.29 84.7093 1021.82 84.7093H1041.17C1046.68 84.7093 1051.17 89.2922 1051.17 94.9588V133.993C1051.17 139.637 1055.64 144.243 1061.17 144.243H1061.12ZM1019 221.047H1116.68C1122.91 221.047 1126.67 217.209 1126.67 210.797V205.356C1126.67 198.967 1122.93 195.107 1116.68 195.107H1091.71C1085.48 195.107 1081.71 191.269 1081.71 184.857V167.248C1081.71 160.859 1077.97 156.998 1071.71 156.998H1061.1C1054.87 156.998 1051.1 160.836 1051.1 167.248V184.857C1051.1 191.246 1047.36 195.107 1041.11 195.107H1018.96C1012.73 195.107 1008.96 198.945 1008.96 205.356V210.797C1008.96 217.186 1012.7 221.047 1018.96 221.047H1019ZM868.261 125.369C872.312 98.1646 890.411 81.21 915.072 81.21C939.733 81.21 958.141 98.4807 960.321 125.369H868.261ZM916.327 224.252C945.04 224.252 973.752 210.504 987.8 179.461C991.235 172.102 988.108 166.977 981.877 166.977H970.339C964.725 166.977 961.29 169.528 958.471 174.653C949.113 191.607 932.886 198.651 916.349 198.651C887.945 198.651 869.538 178.807 867.358 146.5H981.899C988.13 146.5 992.204 142.978 992.204 136.251C990.949 86.0187 959.132 55.9473 915.116 55.9473C871.101 55.9473 836.157 88.5924 836.157 140.111C836.157 191.63 870.176 224.275 916.372 224.275L916.327 224.252ZM555.265 224.252C602.077 224.252 635.479 188.74 635.479 140.089C635.479 91.437 602.077 55.9247 555.265 55.9247C508.453 55.9247 475.051 92.0917 475.051 140.089C475.051 151.286 476.922 163.771 482.537 177.52C485.355 184.247 490.662 185.196 496.277 181.042L505.326 174.314C510.016 170.792 511.249 166.638 509.686 160.565C507.198 152.573 506.559 145.529 506.559 139.456C506.559 105.863 526.222 82.8129 555.243 82.8129C584.263 82.8129 603.926 105.524 603.926 140.089C603.926 174.653 584.572 197.364 555.859 197.364C545.863 197.364 536.505 195.445 525.275 186.799C520.585 182.961 516.226 182.328 511.227 186.166L504.358 191.291C498.743 195.445 498.126 201.202 503.411 205.695C519.639 219.128 538.354 224.252 555.221 224.252H555.265ZM675.091 221.047H685.395C690.9 221.047 695.392 216.464 695.392 210.797V134.332C695.392 102.025 712.236 82.8129 738.46 82.8129C762.175 82.8129 775.914 98.8194 775.914 128.259V210.82C775.914 216.464 780.384 221.069 785.911 221.069H796.524C802.028 221.069 806.52 216.486 806.52 210.82V123.134C806.52 79.9457 784.986 55.9473 748.479 55.9473C723.62 55.9473 708.933 66.3775 697.968 80.8939C697.131 82.0001 695.436 81.3906 695.436 80.0135V10.5015C695.37 4.83491 690.9 0.251953 685.395 0.251953H675.091C669.586 0.251953 665.094 4.83491 665.094 10.5015V210.797C665.094 216.441 669.564 221.047 675.091 221.047Z"
        fill="currentColor"
      ></path>
      <defs>
        <clipPath id="clip0_2833_44487">
          <rect width="218.492" height="224.023" fill="white" transform="translate(0 0.251953)"></rect>
        </clipPath>
      </defs>
    </svg>
  )
}