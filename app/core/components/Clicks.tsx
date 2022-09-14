import { useMantineTheme } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { useRouter } from "next/router"

function Clicks(props: React.SVGProps<SVGSVGElement>) {
  const theme = useMantineTheme()
  const { colorScheme } = theme
  const dark = colorScheme === "dark"

  return (
    <svg
      width="429"
      viewBox="0 0 462 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_ddd_483_3350)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.0524 13.8038C42.7848 12.2263 46.1977 12.4464 48.7049 14.3619L162.881 101.593C165.381 103.503 166.492 106.727 165.699 109.772C164.907 112.817 162.365 115.09 159.25 115.539L106.527 123.135C104.54 123.422 102.74 124.461 101.499 126.038L68.5586 167.9C66.6127 170.373 63.3736 171.437 60.34 170.601C57.3065 169.765 55.0702 167.191 54.666 164.071L36.2094 21.5761C35.8041 18.4471 37.32 15.3814 40.0524 13.8038Z"
          fill="url(#paint0_linear_483_3350)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.586 53.9376C203.318 52.3601 206.731 52.5802 209.238 54.4956L323.414 141.727C325.914 143.637 327.025 146.861 326.232 149.906C325.44 152.951 322.898 155.224 319.784 155.673L267.06 163.269C265.074 163.556 263.274 164.595 262.033 166.172L229.092 208.034C227.146 210.507 223.907 211.571 220.873 210.735C217.84 209.899 215.603 207.325 215.199 204.205L196.743 61.7099C196.337 58.5809 197.853 55.5152 200.586 53.9376Z"
          fill="url(#paint1_linear_483_3350)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_483_3350"
          x="23.1445"
          y="0.756836"
          width="405.34"
          height="317.26"
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
          <feOffset dx="6" dy="7" />
          <feGaussianBlur stdDeviation="9.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_483_3350" />
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
            in2="effect1_dropShadow_483_3350"
            result="effect2_dropShadow_483_3350"
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
            in2="effect2_dropShadow_483_3350"
            result="effect3_dropShadow_483_3350"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_483_3350"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_483_3350"
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
          id="paint1_linear_483_3350"
          x1="243.631"
          y1="62.0627"
          x2="186.084"
          y2="107.439"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Clicks
