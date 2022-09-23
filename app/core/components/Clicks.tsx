import { Box, BoxProps } from "@mantine/core"

function Clicks(props: BoxProps) {
  return (
    <Box
      component="svg"
      width="429"
      viewBox="0 0 490 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#a)" fillRule="evenodd" clipRule="evenodd">
        <path
          d="M40.052 13.804a7.816 7.816 0 0 1 8.653.558l114.176 87.231a7.815 7.815 0 0 1-3.631 13.946l-52.723 7.596a7.82 7.82 0 0 0-5.028 2.903L68.559 167.9a7.815 7.815 0 0 1-13.893-3.829L36.209 21.576a7.815 7.815 0 0 1 3.843-7.772z"
          fill="url(#b)"
        />
        <path
          d="M200.586 53.938a7.815 7.815 0 0 1 8.652.558l114.176 87.231a7.815 7.815 0 0 1-3.63 13.946l-52.724 7.596a7.82 7.82 0 0 0-5.027 2.903l-32.941 41.862a7.816 7.816 0 0 1-13.893-3.829L196.743 61.71a7.813 7.813 0 0 1 3.843-7.772z"
          fill="url(#c)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="83.097"
          y1="21.929"
          x2="25.551"
          y2="67.305"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="243.631"
          y1="62.063"
          x2="186.084"
          y2="107.439"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
        <filter
          id="a"
          x="23.145"
          y=".757"
          width="405.34"
          height="317.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="6" dy="7" />
          <feGaussianBlur stdDeviation="9.5" />
          <feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_483_3350" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="24" dy="26" />
          <feGaussianBlur stdDeviation="17.5" />
          <feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.21 0" />
          <feBlend in2="effect1_dropShadow_483_3350" result="effect2_dropShadow_483_3350" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="54" dy="59" />
          <feGaussianBlur stdDeviation="24" />
          <feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.13 0" />
          <feBlend in2="effect2_dropShadow_483_3350" result="effect3_dropShadow_483_3350" />
          <feBlend in="SourceGraphic" in2="effect3_dropShadow_483_3350" result="shape" />
        </filter>
      </defs>
    </Box>
  )
}

export default Clicks
