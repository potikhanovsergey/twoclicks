import { Box, BoxProps } from "@mantine/core"

function Clicks(props: BoxProps) {
  return (
    <Box
      component="svg"
      width="343"
      height="222"
      viewBox="0 0 343 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.0519 2.80383C42.7843 1.22628 46.1972 1.44639 48.7044 3.36185L162.88 90.5931C165.381 92.5034 166.491 95.727 165.699 98.7722C164.906 101.817 162.364 104.09 159.25 104.539L106.526 112.135C104.54 112.422 102.74 113.461 101.499 115.038L68.5581 156.9C66.6122 159.373 63.3731 160.437 60.3395 159.601C57.306 158.765 55.0697 156.191 54.6655 153.071L36.2089 10.5761C35.8036 7.44714 37.3195 4.38138 40.0519 2.80383Z"
        fill="url(#paint0_linear_705_4934)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.585 42.9366C203.317 41.3591 206.73 41.5792 209.238 43.4947L323.413 130.726C325.914 132.636 327.025 135.86 326.232 138.905C325.439 141.95 322.898 144.223 319.783 144.672L267.059 152.268C265.073 152.555 263.273 153.594 262.032 155.171L229.091 197.033C227.145 199.506 223.906 200.57 220.873 199.734C217.839 198.898 215.603 196.324 215.199 193.204L196.742 50.7089C196.337 47.58 197.853 44.5142 200.585 42.9366Z"
        fill="url(#paint1_linear_705_4934)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_705_4934"
          x1="83.0969"
          y1="10.9289"
          x2="25.5503"
          y2="56.3053"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#98C1FF" />
          <stop offset="1" stopColor="#5C7CFA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_705_4934"
          x1="243.63"
          y1="51.0617"
          x2="186.084"
          y2="96.4381"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#98C1FF" />
          <stop offset="1" stopColor="#5C7CFA" />
        </linearGradient>
      </defs>
    </Box>
  )
}

export default Clicks
