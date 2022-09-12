import { useMantineTheme } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { useRouter } from "next/router"

function Logo(props: React.SVGProps<SVGSVGElement>) {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  const [, scrollTo] = useWindowScroll()
  const router = useRouter()

  const handleLogoClick = () => {
    if (router.asPath === "/") {
      scrollTo({ y: 0 })
    } else {
      void router.push("/")
    }
  }
  return (
    <svg
      width="165"
      height="60"
      viewBox="0 0 1034 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <g filter="url(#filter0_dddd_416_3645)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.0524 13.8038C42.7848 12.2263 46.1977 12.4464 48.7049 14.3619L162.881 101.593C165.381 103.503 166.492 106.727 165.699 109.772C164.907 112.817 162.365 115.09 159.25 115.539L106.527 123.135C104.54 123.422 102.74 124.461 101.499 126.038L68.5586 167.9C66.6127 170.373 63.3736 171.437 60.34 170.601C57.3065 169.765 55.0702 167.191 54.666 164.071L36.2094 21.5761C35.8041 18.4471 37.32 15.3814 40.0524 13.8038Z"
          fill="url(#paint0_linear_416_3645)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.586 53.9366C203.318 52.3591 206.731 52.5792 209.238 54.4947L323.414 141.726C325.914 143.636 327.025 146.86 326.232 149.905C325.44 152.95 322.898 155.223 319.784 155.672L267.06 163.268C265.074 163.555 263.274 164.594 262.033 166.171L229.092 208.033C227.146 210.506 223.907 211.57 220.873 210.734C217.84 209.898 215.603 207.324 215.199 204.204L196.743 61.7089C196.337 58.58 197.853 55.5142 200.586 53.9366Z"
          fill="url(#paint1_linear_416_3645)"
        />
      </g>
      <path
        d="M412.739 166C406.043 166 400.429 164.866 395.896 162.599C391.467 160.332 388.17 157.034 386.007 152.706C383.843 148.274 382.762 142.813 382.762 136.32V103.394H374.726C372.254 103.394 370.348 102.776 369.009 101.539C367.67 100.199 367 98.3958 367 96.1286C367 93.7583 367.67 91.9549 369.009 90.7182C370.348 89.4815 372.254 88.8632 374.726 88.8632H382.762V74.7962C382.762 71.6015 383.586 69.1797 385.234 67.5308C386.985 65.8819 389.406 65.0575 392.497 65.0575C395.587 65.0575 397.957 65.8819 399.605 67.5308C401.253 69.1797 402.077 71.6015 402.077 74.7962V88.8632H418.457C420.929 88.8632 422.835 89.4815 424.174 90.7182C425.514 91.9549 426.183 93.7583 426.183 96.1286C426.183 98.3958 425.514 100.199 424.174 101.539C422.835 102.776 420.929 103.394 418.457 103.394H402.077V135.238C402.077 140.185 403.159 143.895 405.322 146.368C407.486 148.841 410.988 150.078 415.83 150.078C417.581 150.078 419.127 149.923 420.466 149.614C421.805 149.305 422.99 149.099 424.02 148.996C425.256 148.893 426.286 149.305 427.11 150.233C427.934 151.057 428.347 152.809 428.347 155.488C428.347 157.549 427.986 159.404 427.265 161.053C426.647 162.599 425.462 163.681 423.711 164.3C422.372 164.712 420.62 165.072 418.457 165.382C416.294 165.794 414.388 166 412.739 166Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M467.843 165.691C465.268 165.691 463.053 165.072 461.199 163.836C459.345 162.496 457.851 160.435 456.718 157.653L434.311 100.457C433.384 97.9836 433.075 95.8194 433.384 93.9644C433.796 92.0064 434.775 90.4606 436.32 89.3269C437.866 88.1933 439.926 87.6265 442.501 87.6265C444.768 87.6265 446.622 88.1933 448.064 89.3269C449.506 90.3575 450.743 92.3671 451.773 95.3557L470.47 146.832H466.916L486.232 94.119C487.056 91.8518 488.138 90.2029 489.477 89.1724C490.919 88.1418 492.774 87.6265 495.04 87.6265C497.306 87.6265 499.161 88.1933 500.603 89.3269C502.045 90.3575 503.127 91.9549 503.848 94.119L522.854 146.832H519.609L538.462 94.8919C539.492 92.1094 540.779 90.2029 542.325 89.1724C543.973 88.1418 545.776 87.6265 547.733 87.6265C550.205 87.6265 552.111 88.2449 553.45 89.4815C554.79 90.7182 555.562 92.3155 555.768 94.2736C555.974 96.1286 555.614 98.1897 554.687 100.457L532.435 157.653C531.405 160.332 529.911 162.342 527.954 163.681C526.099 165.021 523.885 165.691 521.309 165.691C518.734 165.691 516.467 165.021 514.51 163.681C512.656 162.342 511.214 160.332 510.183 157.653L489.941 104.012H498.749L478.969 157.498C477.939 160.28 476.497 162.342 474.643 163.681C472.788 165.021 470.522 165.691 467.843 165.691Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M603.327 166C595.498 166 588.699 164.403 582.93 161.208C577.161 158.013 572.68 153.479 569.486 147.605C566.293 141.627 564.696 134.62 564.696 126.581C564.696 120.501 565.571 115.091 567.323 110.35C569.177 105.507 571.804 101.384 575.204 97.9836C578.603 94.4797 582.672 91.8518 587.411 90.0999C592.15 88.2449 597.455 87.3174 603.327 87.3174C611.156 87.3174 617.956 88.9147 623.724 92.1094C629.493 95.3041 633.975 99.8386 637.168 105.713C640.362 111.587 641.958 118.543 641.958 126.581C641.958 132.662 641.031 138.124 639.177 142.967C637.426 147.811 634.85 151.984 631.451 155.488C628.051 158.889 623.982 161.517 619.243 163.372C614.504 165.124 609.199 166 603.327 166ZM603.327 151.315C607.139 151.315 610.487 150.387 613.371 148.532C616.256 146.677 618.471 143.946 620.016 140.339C621.664 136.629 622.488 132.043 622.488 126.581C622.488 118.337 620.737 112.205 617.234 108.186C613.732 104.064 609.096 102.003 603.327 102.003C599.516 102.003 596.167 102.93 593.283 104.785C590.399 106.537 588.132 109.268 586.484 112.978C584.939 116.585 584.166 121.119 584.166 126.581C584.166 134.723 585.917 140.906 589.42 145.131C592.922 149.254 597.558 151.315 603.327 151.315Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M692.824 166C684.892 166 677.989 164.403 672.117 161.208C666.245 157.91 661.713 153.273 658.519 147.295C655.326 141.318 653.729 134.311 653.729 126.272C653.729 120.192 654.605 114.782 656.356 110.041C658.21 105.197 660.837 101.127 664.237 97.829C667.636 94.4282 671.757 91.8518 676.599 90.0999C681.44 88.2449 686.849 87.3174 692.824 87.3174C696.223 87.3174 699.88 87.7811 703.795 88.7086C707.813 89.6361 711.573 91.1819 715.076 93.3461C716.724 94.3767 717.805 95.6133 718.321 97.0561C718.836 98.4989 718.939 99.9932 718.63 101.539C718.321 102.982 717.651 104.27 716.621 105.404C715.694 106.434 714.509 107.104 713.067 107.413C711.624 107.619 710.028 107.259 708.276 106.331C706.01 104.991 703.692 104.012 701.323 103.394C698.953 102.673 696.687 102.312 694.524 102.312C691.124 102.312 688.137 102.879 685.561 104.012C682.986 105.043 680.771 106.589 678.917 108.65C677.165 110.608 675.826 113.081 674.899 116.07C673.972 119.058 673.508 122.511 673.508 126.427C673.508 134.053 675.311 140.082 678.917 144.513C682.625 148.841 687.828 151.005 694.524 151.005C696.687 151.005 698.902 150.696 701.168 150.078C703.538 149.46 705.907 148.481 708.276 147.141C710.028 146.213 711.573 145.904 712.912 146.213C714.354 146.523 715.539 147.244 716.466 148.378C717.393 149.408 717.96 150.696 718.166 152.242C718.372 153.685 718.166 155.128 717.548 156.57C717.033 158.013 716.003 159.198 714.457 160.126C711.058 162.187 707.452 163.681 703.641 164.609C699.829 165.536 696.223 166 692.824 166Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M756.593 166C748.043 166 741.604 163.578 737.278 158.735C732.951 153.788 730.788 146.574 730.788 137.093V63.9754C730.788 60.7807 731.612 58.3589 733.26 56.71C734.908 55.0611 737.278 54.2367 740.368 54.2367C743.459 54.2367 745.828 55.0611 747.476 56.71C749.228 58.3589 750.103 60.7807 750.103 63.9754V136.166C750.103 140.906 751.082 144.41 753.039 146.677C755.1 148.944 757.984 150.078 761.693 150.078C762.517 150.078 763.289 150.078 764.011 150.078C764.732 149.975 765.453 149.872 766.174 149.769C767.616 149.563 768.595 149.975 769.11 151.005C769.625 151.933 769.882 153.891 769.882 156.88C769.882 159.456 769.367 161.466 768.337 162.908C767.307 164.351 765.607 165.227 763.238 165.536C762.208 165.639 761.126 165.742 759.993 165.845C758.86 165.948 757.726 166 756.593 166Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M789.714 165.536C786.623 165.536 784.254 164.609 782.605 162.754C780.957 160.899 780.133 158.322 780.133 155.025V98.2927C780.133 94.8919 780.957 92.3155 782.605 90.5636C784.254 88.7086 786.623 87.7811 789.714 87.7811C792.804 87.7811 795.174 88.7086 796.822 90.5636C798.573 92.3155 799.449 94.8919 799.449 98.2927V155.025C799.449 158.322 798.625 160.899 796.976 162.754C795.328 164.609 792.907 165.536 789.714 165.536ZM789.714 73.4049C786.108 73.4049 783.275 72.5289 781.215 70.777C779.257 68.922 778.279 66.3972 778.279 63.2025C778.279 59.9047 779.257 57.3798 781.215 55.6279C783.275 53.876 786.108 53 789.714 53C793.422 53 796.255 53.876 798.213 55.6279C800.17 57.3798 801.149 59.9047 801.149 63.2025C801.149 66.3972 800.17 68.922 798.213 70.777C796.255 72.5289 793.422 73.4049 789.714 73.4049Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M854.442 166C846.509 166 839.607 164.403 833.735 161.208C827.863 157.91 823.331 153.273 820.137 147.295C816.944 141.318 815.347 134.311 815.347 126.272C815.347 120.192 816.222 114.782 817.974 110.041C819.828 105.197 822.455 101.127 825.854 97.829C829.254 94.4282 833.375 91.8518 838.216 90.0999C843.058 88.2449 848.467 87.3174 854.442 87.3174C857.841 87.3174 861.498 87.7811 865.413 88.7086C869.431 89.6361 873.191 91.1819 876.693 93.3461C878.342 94.3767 879.423 95.6133 879.938 97.0561C880.453 98.4989 880.556 99.9932 880.247 101.539C879.938 102.982 879.269 104.27 878.239 105.404C877.311 106.434 876.127 107.104 874.684 107.413C873.242 107.619 871.645 107.259 869.894 106.331C867.628 104.991 865.31 104.012 862.941 103.394C860.571 102.673 858.305 102.312 856.141 102.312C852.742 102.312 849.754 102.879 847.179 104.012C844.604 105.043 842.389 106.589 840.534 108.65C838.783 110.608 837.444 113.081 836.517 116.07C835.59 119.058 835.126 122.511 835.126 126.427C835.126 134.053 836.929 140.082 840.534 144.513C844.243 148.841 849.445 151.005 856.141 151.005C858.305 151.005 860.52 150.696 862.786 150.078C865.155 149.46 867.525 148.481 869.894 147.141C871.645 146.213 873.191 145.904 874.53 146.213C875.972 146.523 877.157 147.244 878.084 148.378C879.011 149.408 879.578 150.696 879.784 152.242C879.99 153.685 879.784 155.128 879.166 156.57C878.651 158.013 877.62 159.198 876.075 160.126C872.676 162.187 869.07 163.681 865.258 164.609C861.447 165.536 857.841 166 854.442 166Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M901.986 165.691C898.895 165.691 896.526 164.866 894.878 163.218C893.23 161.466 892.405 158.992 892.405 155.798V63.9754C892.405 60.7807 893.23 58.3589 894.878 56.71C896.526 55.0611 898.895 54.2367 901.986 54.2367C905.076 54.2367 907.446 55.0611 909.094 56.71C910.845 58.3589 911.721 60.7807 911.721 63.9754V121.016H912.03L937.527 94.119C939.587 92.0579 941.39 90.4606 942.935 89.3269C944.48 88.1933 946.592 87.6265 949.271 87.6265C951.949 87.6265 953.958 88.3479 955.297 89.7907C956.739 91.1304 957.461 92.7793 957.461 94.7373C957.461 96.6954 956.533 98.6534 954.679 100.611L927.792 129.055V121.016L957.306 152.86C959.16 154.819 959.984 156.828 959.778 158.889C959.675 160.847 958.851 162.496 957.306 163.836C955.761 165.072 953.803 165.691 951.434 165.691C948.55 165.691 946.232 165.124 944.48 163.99C942.832 162.857 940.978 161.156 938.917 158.889L912.03 130.755H911.721V155.798C911.721 162.393 908.476 165.691 901.986 165.691Z"
        fill={dark ? theme.white : theme.black}
      />
      <path
        d="M1001.7 166C997.274 166 992.587 165.536 987.642 164.609C982.698 163.681 978.268 162.084 974.353 159.817C972.705 158.786 971.52 157.601 970.799 156.261C970.181 154.819 969.924 153.427 970.027 152.088C970.233 150.645 970.748 149.408 971.572 148.378C972.499 147.347 973.632 146.677 974.971 146.368C976.414 146.059 977.959 146.316 979.607 147.141C983.728 149.099 987.591 150.49 991.197 151.315C994.802 152.036 998.356 152.397 1001.86 152.397C1006.8 152.397 1010.46 151.572 1012.83 149.923C1015.3 148.171 1016.54 145.904 1016.54 143.122C1016.54 140.751 1015.71 138.948 1014.07 137.711C1012.52 136.372 1010.15 135.393 1006.96 134.774L991.506 131.837C985.119 130.601 980.225 128.282 976.826 124.881C973.529 121.377 971.881 116.894 971.881 111.432C971.881 106.486 973.22 102.209 975.899 98.6019C978.68 94.995 982.492 92.2125 987.333 90.2544C992.175 88.2964 997.738 87.3174 1004.02 87.3174C1008.55 87.3174 1012.78 87.8327 1016.69 88.8632C1020.71 89.7907 1024.57 91.285 1028.28 93.3461C1029.83 94.1705 1030.86 95.2526 1031.37 96.5923C1031.99 97.9321 1032.15 99.3233 1031.84 100.766C1031.53 102.106 1030.91 103.342 1029.98 104.476C1029.06 105.507 1027.87 106.176 1026.43 106.486C1025.09 106.692 1023.54 106.383 1021.79 105.558C1018.6 103.909 1015.51 102.724 1012.52 102.003C1009.64 101.281 1006.86 100.921 1004.18 100.921C999.129 100.921 995.369 101.797 992.896 103.549C990.527 105.301 989.342 107.619 989.342 110.505C989.342 112.669 990.063 114.472 991.506 115.915C992.948 117.358 995.163 118.337 998.15 118.852L1013.6 121.789C1020.3 123.026 1025.35 125.293 1028.75 128.591C1032.25 131.889 1034 136.32 1034 141.885C1034 149.408 1031.06 155.334 1025.19 159.662C1019.32 163.887 1011.49 166 1001.7 166Z"
        fill={dark ? theme.white : theme.black}
      />
      <defs>
        <filter
          id="filter0_dddd_416_3645"
          x="23.1445"
          y="0.757812"
          width="405.34"
          height="317.258"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_416_3645" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="6" dy="7" />
          <feGaussianBlur stdDeviation="9.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_416_3645"
            result="effect2_dropShadow_416_3645"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="24" dy="26" />
          <feGaussianBlur stdDeviation="17.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.21 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_416_3645"
            result="effect3_dropShadow_416_3645"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="54" dy="59" />
          <feGaussianBlur stdDeviation="24" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.13 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_416_3645"
            result="effect4_dropShadow_416_3645"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect4_dropShadow_416_3645"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_416_3645"
          x1="83.0974"
          y1="21.9289"
          x2="25.5508"
          y2="67.3053"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_416_3645"
          x1="243.631"
          y1="62.0617"
          x2="186.084"
          y2="107.438"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo
