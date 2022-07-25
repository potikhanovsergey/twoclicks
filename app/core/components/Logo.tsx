import { useMantineTheme } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { useRouter } from "next/router"

const box = {
  width: "100%",
  height: "100%",
  borderRadius: "2px",
}
const border = {
  borderRadius: "40px",
}
const noBorder = {
  borderRadius: "0px",
}
const gradient = {
  background:
    "conic-gradient(from 180deg at 50% 50%, rgba(118, 221, 253, 1) 0%, rgba(254, 133, 206, 0.4) 64%, rgba(254, 133, 206, 0.96) 66%, rgba(133, 138, 254, 0.28) 100%)",
}
const gradient1 = {
  background:
    "conic-gradient(from 180deg at 50% 50%, rgba(118, 221, 253, 1) 0%, rgba(254, 133, 206, 0.4) 70%, rgba(254, 133, 206, 0.96) 72%, rgba(133, 138, 254, 0.28) 100%)",
}
const gradient2 = {
  background:
    "conic-gradient(from 180deg at 50% 53%, rgba(118, 221, 253, 1) 0%, rgba(254, 133, 206, 0.4) 72%, rgba(254, 133, 206, 0.96) 74%, rgba(133, 138, 254, 0.28) 100%)",
}
const gradient3 = {
  background:
    "conic-gradient(from 180deg at 50% 50%, rgba(118, 221, 253, 1) 0%, rgba(254, 133, 206, 0.4) 67%, rgba(254, 133, 206, 0.96) 69%, rgba(133, 138, 254, 0.5) 100%)",
}

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
    //     <svg
    //       onClick={handleLogoClick}
    //       style={{ cursor: "pointer" }}
    //       viewBox="0 0 1090 268"
    //       width="170"
    //       height="60"
    //       {...props}
    //     >
    //       <clipPath id="clip">
    //         <path d="M142 15.0114V36H123.5C123.333 30.8333 123.621 21.4851 123.5 21C123 19 121.833 18.8446 121 18.5112H21C19 18.5112 18.5 20.1779 18.5 21.0112V36H0V15.0114C1.6 5.41152 11.3333 1.01145 16 0.011392H126.5C133.7 -0.388608 139.833 9.84472 142 15.0114Z" />
    //       </clipPath>
    //       <foreignObject x="100" y="0" width="142" height="36" clipPath="url(#clip)">
    //         <div style={{ ...box, ...gradient2, ...noBorder }} />
    //       </foreignObject>
    //       <foreignObject x="0" y="36" width="340" height="232">
    //         <div style={{ ...box, ...border, ...gradient3 }} />
    //       </foreignObject>
    //       <foreignObject x="14" y="50" width="312" height="204">
    //         <div
    //           style={{ ...box, ...border, backgroundColor: dark ? theme.colors.dark[5] : theme.white }}
    //         />
    //       </foreignObject>
    //       <foreignObject x="182" y="92" width="120" height="121">
    //         <div style={{ ...box, ...gradient }} />
    //       </foreignObject>
    //       <foreignObject x="40" y="92" width="112" height="48">
    //         <div style={{ ...box, ...gradient1 }} />
    //       </foreignObject>
    //       <foreignObject x="40" y="164" width="112" height="21">
    //         <div style={{ ...box, ...gradient2 }} />
    //       </foreignObject>
    //       <foreignObject x="40" y="192" width="112" height="21">
    //         <div style={{ ...box, ...gradient2 }} />
    //       </foreignObject>
    //       <svg x="400" y="86">
    //         <path
    //           d="M51.4 124.7C46.4133 124.7 41.4267 124.303 36.44 123.51C31.4533 122.83 26.75 121.753 22.33 120.28C17.91 118.693 13.9433 116.767 10.43 114.5C8.39 113.14 6.97333 111.497 6.18 109.57C5.38667 107.643 5.10333 105.773 5.33 103.96C5.67 102.033 6.40667 100.39 7.54 99.03C8.78667 97.5567 10.3167 96.65 12.13 96.31C13.9433 95.97 15.9267 96.48 18.08 97.84C23.0667 100.787 28.3367 102.94 33.89 104.3C39.4433 105.66 45.28 106.34 51.4 106.34C60.3533 106.34 66.87 104.867 70.95 101.92C75.03 98.86 77.07 94.95 77.07 90.19C77.07 86.2233 75.5967 83.1067 72.65 80.84C69.8167 78.5733 64.8867 76.7033 57.86 75.23L39.16 71.32C28.3933 69.0533 20.3467 65.2567 15.02 59.93C9.80667 54.49 7.2 47.35 7.2 38.51C7.2 32.9567 8.33333 27.9133 10.6 23.38C12.8667 18.8467 16.04 14.9367 20.12 11.65C24.3133 8.36333 29.2433 5.86999 34.91 4.16999C40.69 2.35666 47.0367 1.44999 53.95 1.44999C60.75 1.44999 67.21 2.29999 73.33 3.99999C79.45 5.69999 84.9467 8.19333 89.82 11.48C91.6333 12.7267 92.8233 14.2567 93.39 16.07C94.07 17.8833 94.24 19.6967 93.9 21.51C93.56 23.21 92.7667 24.6833 91.52 25.93C90.2733 27.1767 88.6867 27.9133 86.76 28.14C84.9467 28.3667 82.85 27.8 80.47 26.44C76.2767 24.06 72.0267 22.36 67.72 21.34C63.4133 20.32 58.7667 19.81 53.78 19.81C48.5667 19.81 44.09 20.5467 40.35 22.02C36.61 23.4933 33.72 25.59 31.68 28.31C29.7533 30.9167 28.79 34.0333 28.79 37.66C28.79 41.74 30.15 45.0267 32.87 47.52C35.59 49.9 40.2367 51.77 46.81 53.13L65.34 57.04C76.56 59.42 84.89 63.16 90.33 68.26C95.8833 73.36 98.66 80.16 98.66 88.66C98.66 94.1 97.5267 99.03 95.26 103.45C93.1067 107.87 89.9333 111.667 85.74 114.84C81.66 118.013 76.73 120.45 70.95 122.15C65.17 123.85 58.6533 124.7 51.4 124.7ZM125.836 124.36C122.436 124.36 119.829 123.453 118.016 121.64C116.203 119.713 115.296 116.993 115.296 113.48V12.5C115.296 8.98666 116.203 6.32333 118.016 4.51C119.829 2.69666 122.436 1.78999 125.836 1.78999C129.236 1.78999 131.843 2.69666 133.656 4.51C135.583 6.32333 136.546 8.98666 136.546 12.5V75.23H136.886L164.936 45.65C167.203 43.3833 169.186 41.6267 170.886 40.38C172.586 39.1333 174.909 38.51 177.856 38.51C180.803 38.51 183.013 39.3033 184.486 40.89C186.073 42.3633 186.866 44.1767 186.866 46.33C186.866 48.4833 185.846 50.6367 183.806 52.79L154.226 84.07V75.23L186.696 110.25C188.736 112.403 189.643 114.613 189.416 116.88C189.303 119.033 188.396 120.847 186.696 122.32C184.996 123.68 182.843 124.36 180.236 124.36C177.063 124.36 174.513 123.737 172.586 122.49C170.773 121.243 168.733 119.373 166.466 116.88L136.886 85.94H136.546V113.48C136.546 120.733 132.976 124.36 125.836 124.36ZM216.979 124.19C213.579 124.19 210.972 123.17 209.159
    // 121.13C207.345 119.09 206.439 116.257 206.439 112.63V50.24C206.439 46.5 207.345 43.6667 209.159 41.74C210.972 39.7 213.579 38.68 216.979 38.68C220.379 38.68 222.985 39.7 224.799 41.74C226.725 43.6667 227.689 46.5 227.689 50.24V112.63C227.689 116.257 226.782 119.09 224.969 121.13C223.155 123.17 220.492 124.19 216.979 124.19ZM216.979 22.87C213.012 22.87 209.895 21.9067 207.629 19.98C205.475 17.94 204.399 15.1633 204.399 11.65C204.399 8.02333 205.475 5.24666 207.629 3.31999C209.895 1.39333 213.012 0.429997 216.979 0.429997C221.059 0.429997 224.175 1.39333 226.329 3.31999C228.482 5.24666 229.559 8.02333 229.559 11.65C229.559 15.1633 228.482 17.94 226.329 19.98C224.175 21.9067 221.059 22.87 216.979 22.87ZM278.159 124.7C268.752 124.7 261.669 122.037 256.909 116.71C252.149 111.27 249.769 103.337 249.769 92.91V12.5C249.769 8.98666 250.675 6.32333 252.489 4.51C254.302 2.69666 256.909 1.78999 260.309 1.78999C263.709 1.78999 266.315 2.69666 268.129 4.51C270.055 6.32333 271.019 8.98666 271.019 12.5V91.89C271.019 97.1033 272.095 100.957 274.249 103.45C276.515 105.943 279.689 107.19 283.769 107.19C284.675 107.19 285.525 107.19 286.319 107.19C287.112 107.077 287.905 106.963 288.699 106.85C290.285 106.623 291.362 107.077 291.929 108.21C292.495 109.23 292.779 111.383 292.779 114.67C292.779 117.503 292.212 119.713 291.079 121.3C289.945 122.887 288.075 123.85 285.469 124.19C284.335 124.303 283.145 124.417 281.899 124.53C280.652
    // 124.643 279.405 124.7 278.159 124.7ZM332.446 124.7C323.039 124.7 315.956 122.037 311.196 116.71C306.436 111.27 304.056 103.337 304.056 92.91V12.5C304.056 8.98666 304.963 6.32333 306.776 4.51C308.589 2.69666 311.196 1.78999 314.596 1.78999C317.996 1.78999 320.603 2.69666 322.416 4.51C324.343 6.32333 325.306 8.98666 325.306 12.5V91.89C325.306 97.1033 326.383 100.957 328.536 103.45C330.803 105.943 333.976 107.19 338.056 107.19C338.963 107.19 339.813 107.19 340.606 107.19C341.399 107.077 342.193 106.963 342.986 106.85C344.573 106.623 345.649 107.077 346.216 108.21C346.783 109.23 347.066 111.383 347.066 114.67C347.066 117.503 346.499 119.713 345.366 121.3C344.233 122.887 342.363 123.85 339.756 124.19C338.623 124.303 337.433 124.417 336.186 124.53C334.939 124.643 333.693 124.7 332.446 124.7ZM398.483 124.7C389.076 124.7 380.973 122.943 374.173 119.43C367.373 115.917 362.103 110.93 358.363 104.47C354.736 98.01 352.923 90.36 352.923 81.52C352.923 72.9067 354.68 65.37 358.193 58.91C361.82 52.45 366.75 47.4067 372.983 43.78C379.33 40.04 386.526 38.17 394.573 38.17C400.466 38.17 405.736 39.1333 410.383 41.06C415.143 42.9867 419.166 45.7633 422.453 49.39C425.853 53.0167 428.403 57.4367 430.103 62.65C431.916 67.75 432.823 73.53 432.823 79.99C432.823 82.03 432.086 83.6167 430.613 84.75C429.253 85.77 427.27 86.28 424.663 86.28H370.093V74.04H417.863L415.143 76.59C415.143 71.3767 414.35 67.0133 412.763 63.5C411.29 59.9867 409.08 57.3233 406.133 55.51C403.3 53.5833 399.73 52.62 395.423 52.62C390.663 52.62 386.583 53.7533 383.183 56.02C379.896 58.1733 377.346 61.29 375.533 65.37C373.833 69.3367 372.983 74.0967 372.983 79.65V80.84C372.983 90.1333 375.136 97.1033 379.443 101.75C383.863 106.283 390.323 108.55 398.823 108.55C401.77 108.55 405.056 108.21 408.683 107.53C412.423 106.737 415.936 105.433 419.223 103.62C421.603 102.26 423.7 101.693 425.513 101.92C427.326 102.033 428.743 102.657 429.763 103.79C430.896 104.923 431.576 106.34 431.803 108.04C432.03 109.627 431.69 111.27 430.783 112.97C429.99 114.67 428.573 116.143 426.533 117.39C422.566 119.883 417.976 121.753 412.763 123C407.663 124.133 402.903 124.7 398.483 124.7ZM487.4 124.7C480.033 124.7 473.856 123.453 468.87 120.96C463.996 118.467 460.37 114.84 457.99 110.08C455.61 105.207 454.42 99.2 454.42 92.06V55.85H445.58C442.86 55.85 440.763 55.17 439.29 53.81C437.816 52.3367 437.08 50.3533 437.08 47.86C437.08 45.2533 437.816 43.27 439.29 41.91C440.763 40.55 442.86 39.87 445.58 39.87H454.42V24.4C454.42 20.8867 455.326 18.2233 457.14 16.41C459.066 14.5967 461.73 13.69 465.13 13.69C468.53 13.69 471.136 14.5967 472.95 16.41C474.763 18.2233 475.67 20.8867 475.67 24.4V39.87H493.69C496.41
    // 39.87 498.506 40.55 499.98 41.91C501.453 43.27 502.19 45.2533 502.19 47.86C502.19 50.3533 501.453 52.3367 499.98 53.81C498.506 55.17 496.41 55.85 493.69 55.85H475.67V90.87C475.67 96.31 476.86 100.39 479.24 103.11C481.62 105.83 485.473 107.19 490.8 107.19C492.726 107.19 494.426 107.02 495.9 106.68C497.373 106.34 498.676 106.113 499.81 106C501.17 105.887 502.303 106.34 503.21 107.36C504.116 108.267 504.57 110.193 504.57 113.14C504.57 115.407 504.173 117.447 503.38 119.26C502.7 120.96 501.396 122.15 499.47 122.83C497.996 123.283 496.07 123.68 493.69 124.02C491.31 124.473 489.213 124.7 487.4 124.7ZM551.644 124.7C543.03 124.7 535.55 122.943 529.204 119.43C522.857 115.917 517.927 110.93 514.414 104.47C510.9 97.8967 509.144 90.19 509.144 81.35C509.144 74.6633 510.107 68.7133 512.034 63.5C514.074 58.1733 516.964 53.64 520.704 49.9C524.444 46.0467 528.92 43.1567 534.134 41.23C539.347 39.19 545.184 38.17 551.644 38.17C560.257 38.17 567.737 39.9267 574.084 43.44C580.43 46.9533 585.36 51.94 588.874 58.4C592.387 64.86 594.144 72.51 594.144 81.35C594.144 88.0367 593.124 94.0433 591.084 99.37C589.157 104.697 586.324 109.287 582.584 113.14C578.844 116.88 574.367 119.77 569.154 121.81C563.94 123.737 558.104 124.7 551.644 124.7ZM551.644 108.55C555.837 108.55 559.52 107.53 562.694 105.49C565.867 103.45 568.304 100.447 570.004 96.48C571.817 92.4 572.724 87.3567 572.724 81.35C572.724 72.2833 570.797 65.54 566.944 61.12C563.09
    // 56.5867 557.99 54.32 551.644 54.32C547.45 54.32 543.767 55.34 540.594 57.38C537.42 59.3067 534.927 62.31 533.114 66.39C531.414 70.3567 530.564 75.3433 530.564 81.35C530.564 90.3033 532.49 97.1033 536.344 101.75C540.197 106.283 545.297 108.55 551.644 108.55ZM622.223 124.36C618.823 124.36 616.216 123.453 614.403 121.64C612.589 119.713 611.683 116.993 611.683 113.48V49.22C611.683 45.7067 612.589 43.0433 614.403 41.23C616.216 39.4167 618.766 38.51 622.053 38.51C625.339 38.51 627.889 39.4167 629.703 41.23C631.516 43.0433 632.423 45.7067 632.423 49.22V60.78L630.553 56.53C633.046 50.5233 636.899 45.99 642.113 42.93C647.439 39.7567 653.446 38.17 660.133 38.17C666.819 38.17 672.316 39.4167 676.623 41.91C680.929 44.4033 684.159 48.2 686.313 53.3C688.466 58.2867 689.543 64.6333 689.543 72.34V113.48C689.543 116.993 688.636 119.713 686.823 121.64C685.009 123.453 682.403 124.36 679.003 124.36C675.603 124.36 672.939 123.453 671.013 121.64C669.199 119.713 668.293 116.993 668.293 113.48V73.36C668.293 66.9 667.046 62.1967 664.553 59.25C662.173 56.3033 658.433 54.83 653.333 54.83C647.099 54.83 642.113 56.8133 638.373 60.78C634.746 64.6333 632.933 69.79 632.933 76.25V113.48C632.933 120.733 629.363 124.36 622.223 124.36Z"
    //           fill={dark ? "#F1F1F1" : "#343C44"}
    //         />
    //       </svg>
    //     </svg>
    <svg
      width="170"
      height="60"
      viewBox="0 0 461 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <path d="M43.5701 74L22.7861 86V62L43.5701 50V74Z" fill="#76DDFD" />
      <path
        d="M43.5701 74L22.7861 86V62L43.5701 50V74Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.785 86L2.00098 74V50L22.785 62V86Z" fill="#76DDFD" />
      <path
        d="M22.785 86L2.00098 74V50L22.785 62V86Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.785 62L2 50L22.785 38L43.57 50L22.785 62Z" fill="#76DDFD" />
      <path
        d="M22.785 62L2 50L22.785 38L43.57 50L22.785 62Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3538 38L43.5698 50V26L64.3538 14V38Z" fill="#76DDFD" />
      <path
        d="M64.3538 38L43.5698 50V26L64.3538 14V38Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 50L22.7859 38V14L43.5699 26V50Z" fill="#76DDFD" />
      <path
        d="M43.5699 50L22.7859 38V14L43.5699 26V50Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 26L22.7849 14L43.5699 2L64.3549 14L43.5699 26Z" fill="#76DDFD" />
      <path
        d="M43.5699 26L22.7849 14L43.5699 2L64.3549 14L43.5699 26Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5701 50L22.7861 62V38L43.5701 26V50Z" fill="#76DDFD" />
      <path
        d="M43.5701 50L22.7861 62V38L43.5701 26V50Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.785 62L2.00098 50V26L22.785 38V62Z" fill="#76DDFD" />
      <path
        d="M22.785 62L2.00098 50V26L22.785 38V62Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.785 38L2 26L22.785 14L43.57 26L22.785 38Z" fill="#76DDFD" />
      <path
        d="M22.785 38L2 26L22.785 14L43.57 26L22.785 38Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M85.139 74L64.355 86V62L85.139 50V74Z" fill="#76DDFD" />
      <path
        d="M85.139 74L64.355 86V62L85.139 50V74Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3541 86L43.5701 74V50L64.3541 62V86Z" fill="#76DDFD" />
      <path
        d="M64.3541 86L43.5701 74V50L64.3541 62V86Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3551 62L43.5701 50L64.3551 38L85.1401 50L64.3551 62Z" fill="#76DDFD" />
      <path
        d="M64.3551 62L43.5701 50L64.3551 38L85.1401 50L64.3551 62Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 74L22.7849 62L43.5699 50L64.3549 62L43.5699 74Z" fill="#FE85CE" />
      <path
        d="M43.5699 74L22.7849 62L43.5699 50L64.3549 62L43.5699 74Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3538 86L43.5698 98V74L64.3538 62V86Z" fill="#FE85CE" />
      <path
        d="M64.3538 86L43.5698 98V74L64.3538 62V86Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 98L22.7859 86V62L43.5699 74V98Z" fill="#FE85CE" />
      <path
        d="M43.5699 98L22.7859 86V62L43.5699 74V98Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M85.139 50L64.355 62V38L85.139 26V50Z" fill="#76DDFD" />
      <path
        d="M85.139 50L64.355 62V38L85.139 26V50Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3541 62L43.5701 50V26L64.3541 38V62Z" fill="#76DDFD" />
      <path
        d="M64.3541 62L43.5701 50V26L64.3541 38V62Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3551 38L43.5701 26L64.3551 14L85.1401 26L64.3551 38Z" fill="#76DDFD" />
      <path
        d="M64.3551 38L43.5701 26L64.3551 14L85.1401 26L64.3551 38Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M64.3538 62L43.5698 74V50L64.3538 38V62Z" fill="#76DDFD" />
      <path
        d="M64.3538 62L43.5698 74V50L64.3538 38V62Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 74L22.7859 62V38L43.5699 50V74Z" fill="#76DDFD" />
      <path
        d="M43.5699 74L22.7859 62V38L43.5699 50V74Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M43.5699 50L22.7849 38L43.5699 26L64.3549 38L43.5699 50Z" fill="#76DDFD" />
      <path
        d="M43.5699 50L22.7849 38L43.5699 26L64.3549 38L43.5699 50Z"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M129.515 74.63C124.895 74.63 120.926 73.706 117.608 71.858C114.332 69.968 111.812 67.322 110.048 63.92C108.284 60.476 107.402 56.423 107.402 51.761C107.402 48.275 107.906 45.146 108.914 42.374C109.922 39.56 111.371 37.166 113.261 35.192C115.151 33.176 117.461 31.643 120.191 30.593C122.963 29.501 126.071 28.955 129.515 28.955C131.825 28.955 134.093 29.249 136.319 29.837C138.545 30.425 140.498 31.265 142.178 32.357C143.06 32.903 143.648 33.575 143.942 34.373C144.236 35.129 144.299 35.885 144.131 36.641C143.963 37.355 143.606 37.964 143.06 38.468C142.556 38.972 141.905 39.266 141.107 39.35C140.351 39.392 139.511 39.119 138.587 38.531C137.285 37.691 135.878 37.082 134.366 36.704C132.854 36.326 131.321 36.137 129.767 36.137C126.785 36.137 124.265 36.746 122.207 37.964C120.149 39.182 118.595 40.946 117.545 43.256C116.495 45.566 115.97 48.401 115.97 51.761C115.97 55.079 116.495 57.914 117.545 60.266C118.595 62.618 120.149 64.403 122.207 65.621C124.265 66.839 126.785 67.448 129.767 67.448C131.363 67.448 132.938 67.259 134.492 66.881C136.046 66.461 137.516 65.831 138.902 64.991C139.826 64.445 140.645 64.214 141.359 64.298C142.115 64.34 142.745 64.592 143.249 65.054C143.753 65.516 144.089 66.104 144.257 66.818C144.425 67.49 144.383 68.204 144.131 68.96C143.879 69.674 143.375 70.304 142.619 70.85C140.939 72.068 138.923 73.013 136.571 73.685C134.261 74.315 131.909 74.63 129.515 74.63ZM161.267 74.63C158.705 74.63 156.584 74.168 154.904 73.244C153.224 72.278 151.964 70.85 151.124 68.96C150.326 67.07 149.927 64.718 149.927 61.904V46.658C149.927 45.314 150.263 44.327 150.935 43.697C151.607 43.025 152.573 42.689 153.833 42.689C155.093 42.689 156.059 43.025 156.731 43.697C157.445 44.327 157.802 45.314 157.802 46.658V62.03C157.802 64.214 158.243 65.831 159.125 66.881C160.007 67.931 161.414 68.456 163.346 68.456C165.446 68.456 167.168 67.742 168.512 66.314C169.856 64.844 170.528 62.912 170.528 60.518V46.658C170.528 45.314 170.864 44.327 171.536 43.697C172.208 43.025 173.174 42.689 174.434 42.689C175.694 42.689 176.66 43.025 177.332 43.697C178.046 44.327 178.403 45.314 178.403 46.658V70.472C178.403 73.16 177.122 74.504 174.56 74.504C173.342 74.504 172.397 74.168 171.725 73.496C171.053 72.782 170.717 71.774 170.717 70.472V65.684L171.599 67.574C170.717 69.842 169.373 71.585 167.567 72.803C165.803 74.021 163.703 74.63 161.267 74.63ZM204.365 74.63C201.761 74.63 199.472 73.979 197.498 72.677C195.566 71.375 194.285 69.632 193.655 67.448L194.348 65.873V70.472C194.348 71.774 194.012 72.782 193.34 73.496C192.668 74.168 191.723 74.504 190.505 74.504C189.245 74.504 188.279 74.168 187.607 73.496C186.935 72.782 186.599 71.774 186.599 70.472V33.05C186.599 31.748 186.935 30.761 187.607 30.089C188.279 29.417 189.245 29.081 190.505 29.081C191.765 29.081 192.731 29.417 193.403 30.089C194.117 30.761 194.474 31.748 194.474 33.05V49.43H193.718C194.39 47.372 195.692 45.713 197.624 44.453C199.556 43.193 201.803 42.563 204.365 42.563C207.095 42.563 209.468 43.214 211.484 44.516C213.5 45.818 215.075 47.666 216.209 50.06C217.343 52.412 217.91 55.247 217.91 58.565C217.91 61.841 217.343 64.697 216.209 67.133C215.075 69.527 213.479 71.375 211.421 72.677C209.405 73.979 207.053 74.63 204.365 74.63ZM202.16 68.645C203.714 68.645 205.079 68.267 206.255 67.511C207.431 66.755 208.334 65.642 208.964 64.172C209.636 62.66 209.972 60.791 209.972 58.565C209.972 55.205 209.258 52.706 207.83 51.068C206.402 49.388 204.512 48.548 202.16 48.548C200.606 48.548 199.241 48.926 198.065 49.682C196.889 50.396 195.965 51.509 195.293 53.021C194.663 54.491 194.348 56.339 194.348 58.565C194.348 61.883 195.062 64.403 196.49 66.125C197.918 67.805 199.808 68.645 202.16 68.645ZM239.557 74.63C236.071 74.63 233.068 73.979 230.548 72.677C228.028 71.375 226.075 69.527 224.689 67.133C223.345 64.739 222.673 61.904 222.673 58.628C222.673 55.436 223.324 52.643 224.626 50.249C225.97 47.855 227.797 45.986 230.107 44.642C232.459 43.256 235.126 42.563 238.108 42.563C240.292 42.563 242.245 42.92 243.967 43.634C245.731 44.348 247.222 45.377 248.44 46.721C249.7 48.065 250.645 49.703 251.275 51.635C251.947 53.525 252.283 55.667 252.283 58.061C252.283 58.817 252.01 59.405 251.464 59.825C250.96 60.203 250.225 60.392 249.259 60.392H229.036V55.856H246.739L245.731 56.801C245.731 54.869 245.437 53.252 244.849 51.95C244.303 50.648 243.484 49.661 242.392 48.989C241.342 48.275 240.019 47.918 238.423 47.918C236.659 47.918 235.147 48.338 233.887 49.178C232.669 49.976 231.724 51.131 231.052 52.643C230.422 54.113 230.107 55.877 230.107 57.935V58.376C230.107 61.82 230.905 64.403 232.501 66.125C234.139 67.805 236.533 68.645 239.683 68.645C240.775 68.645 241.993 68.519 243.337 68.267C244.723 67.973 246.025 67.49 247.243 66.818C248.125 66.314 248.902 66.104 249.574 66.188C250.246 66.23 250.771 66.461 251.149 66.881C251.569 67.301 251.821 67.826 251.905 68.456C251.989 69.044 251.863 69.653 251.527 70.283C251.233 70.913 250.708 71.459 249.952 71.921C248.482 72.845 246.781 73.538 244.849 74C242.959 74.42 241.195 74.63 239.557 74.63ZM263.308 74.504C262.006 74.504 260.998 74.147 260.284 73.433C259.612 72.677 259.276 71.648 259.276 70.346V33.68C259.276 32.336 259.633 31.328 260.347 30.656C261.061 29.942 262.069 29.585 263.371 29.585H278.554C283.426 29.585 287.185 30.803 289.831 33.239C292.477 35.675 293.8 39.077 293.8 43.445C293.8 47.813 292.477 51.236 289.831 53.714C287.185 56.15 283.426 57.368 278.554 57.368H267.34V70.346C267.34 71.648 267.004 72.677 266.332 73.433C265.66 74.147 264.652 74.504 263.308 74.504ZM267.34 51.005H277.294C280.15 51.005 282.313 50.375 283.783 49.115C285.253 47.813 285.988 45.923 285.988 43.445C285.988 40.967 285.253 39.098 283.783 37.838C282.313 36.578 280.15 35.948 277.294 35.948H267.34V51.005ZM303.034 74.504C301.732 74.504 300.724 74.168 300.01 73.496C299.338 72.782 299.002 71.774 299.002 70.472V46.658C299.002 45.356 299.338 44.369 300.01 43.697C300.682 43.025 301.627 42.689 302.845 42.689C304.063 42.689 305.008 43.025 305.68 43.697C306.352 44.369 306.688 45.356 306.688 46.658V50.627H306.058C306.646 48.107 307.801 46.196 309.523 44.894C311.245 43.592 313.534 42.815 316.39 42.563C317.272 42.479 317.965 42.71 318.469 43.256C319.015 43.76 319.33 44.558 319.414 45.65C319.498 46.7 319.246 47.561 318.658 48.233C318.112 48.863 317.272 49.241 316.138 49.367L314.752 49.493C312.19 49.745 310.258 50.543 308.956 51.887C307.654 53.189 307.003 55.037 307.003 57.431V70.472C307.003 71.774 306.667 72.782 305.995 73.496C305.323 74.168 304.336 74.504 303.034 74.504ZM337.23 74.63C334.038 74.63 331.266 73.979 328.914 72.677C326.562 71.375 324.735 69.527 323.433 67.133C322.131 64.697 321.48 61.841 321.48 58.565C321.48 56.087 321.837 53.882 322.551 51.95C323.307 49.976 324.378 48.296 325.764 46.91C327.15 45.482 328.809 44.411 330.741 43.697C332.673 42.941 334.836 42.563 337.23 42.563C340.422 42.563 343.194 43.214 345.546 44.516C347.898 45.818 349.725 47.666 351.027 50.06C352.329 52.454 352.98 55.289 352.98 58.565C352.98 61.043 352.602 63.269 351.846 65.243C351.132 67.217 350.082 68.918 348.696 70.346C347.31 71.732 345.651 72.803 343.719 73.559C341.787 74.273 339.624 74.63 337.23 74.63ZM337.23 68.645C338.784 68.645 340.149 68.267 341.325 67.511C342.501 66.755 343.404 65.642 344.034 64.172C344.706 62.66 345.042 60.791 345.042 58.565C345.042 55.205 344.328 52.706 342.9 51.068C341.472 49.388 339.582 48.548 337.23 48.548C335.676 48.548 334.311 48.926 333.135 49.682C331.959 50.396 331.035 51.509 330.363 53.021C329.733 54.491 329.418 56.339 329.418 58.565C329.418 61.883 330.132 64.403 331.56 66.125C332.988 67.805 334.878 68.645 337.23 68.645ZM355.7 85.907C354.776 85.991 354.02 85.844 353.432 85.466C352.844 85.13 352.445 84.689 352.235 84.143C351.983 83.597 351.899 83.03 351.983 82.442C352.067 81.854 352.319 81.329 352.739 80.867C353.117 80.447 353.642 80.216 354.314 80.174C356.204 80.006 357.569 79.46 358.409 78.536C359.291 77.654 359.732 76.289 359.732 74.441V46.658C359.732 45.356 360.068 44.369 360.74 43.697C361.454 43.025 362.441 42.689 363.701 42.689C364.961 42.689 365.927 43.025 366.599 43.697C367.271 44.369 367.607 45.356 367.607 46.658V73.748C367.607 76.436 367.166 78.641 366.284 80.363C365.444 82.085 364.142 83.387 362.378 84.269C360.656 85.151 358.43 85.697 355.7 85.907ZM363.638 36.893C362.168 36.893 361.013 36.536 360.173 35.822C359.375 35.066 358.976 34.037 358.976 32.735C358.976 31.391 359.375 30.362 360.173 29.648C361.013 28.934 362.168 28.577 363.638 28.577C365.15 28.577 366.305 28.934 367.103 29.648C367.901 30.362 368.3 31.391 368.3 32.735C368.3 34.037 367.901 35.066 367.103 35.822C366.305 36.536 365.15 36.893 363.638 36.893ZM390.966 74.63C387.48 74.63 384.477 73.979 381.957 72.677C379.437 71.375 377.484 69.527 376.098 67.133C374.754 64.739 374.082 61.904 374.082 58.628C374.082 55.436 374.733 52.643 376.035 50.249C377.379 47.855 379.206 45.986 381.516 44.642C383.868 43.256 386.535 42.563 389.517 42.563C391.701 42.563 393.654 42.92 395.376 43.634C397.14 44.348 398.631 45.377 399.849 46.721C401.109 48.065 402.054 49.703 402.684 51.635C403.356 53.525 403.692 55.667 403.692 58.061C403.692 58.817 403.419 59.405 402.873 59.825C402.369 60.203 401.634 60.392 400.668 60.392H380.445V55.856H398.148L397.14 56.801C397.14 54.869 396.846 53.252 396.258 51.95C395.712 50.648 394.893 49.661 393.801 48.989C392.751 48.275 391.428 47.918 389.832 47.918C388.068 47.918 386.556 48.338 385.296 49.178C384.078 49.976 383.133 51.131 382.461 52.643C381.831 54.113 381.516 55.877 381.516 57.935V58.376C381.516 61.82 382.314 64.403 383.91 66.125C385.548 67.805 387.942 68.645 391.092 68.645C392.184 68.645 393.402 68.519 394.746 68.267C396.132 67.973 397.434 67.49 398.652 66.818C399.534 66.314 400.311 66.104 400.983 66.188C401.655 66.23 402.18 66.461 402.558 66.881C402.978 67.301 403.23 67.826 403.314 68.456C403.398 69.044 403.272 69.653 402.936 70.283C402.642 70.913 402.117 71.459 401.361 71.921C399.891 72.845 398.19 73.538 396.258 74C394.368 74.42 392.604 74.63 390.966 74.63ZM424.167 74.63C420.933 74.63 418.119 73.979 415.725 72.677C413.331 71.333 411.483 69.443 410.181 67.007C408.879 64.571 408.228 61.715 408.228 58.439C408.228 55.961 408.585 53.756 409.299 51.824C410.055 49.85 411.126 48.191 412.512 46.847C413.898 45.461 415.578 44.411 417.552 43.697C419.526 42.941 421.731 42.563 424.167 42.563C425.553 42.563 427.044 42.752 428.64 43.13C430.278 43.508 431.811 44.138 433.239 45.02C433.911 45.44 434.352 45.944 434.562 46.532C434.772 47.12 434.814 47.729 434.688 48.359C434.562 48.947 434.289 49.472 433.869 49.934C433.491 50.354 433.008 50.627 432.42 50.753C431.832 50.837 431.181 50.69 430.467 50.312C429.543 49.766 428.598 49.367 427.632 49.115C426.666 48.821 425.742 48.674 424.86 48.674C423.474 48.674 422.256 48.905 421.206 49.367C420.156 49.787 419.253 50.417 418.497 51.257C417.783 52.055 417.237 53.063 416.859 54.281C416.481 55.499 416.292 56.906 416.292 58.502C416.292 61.61 417.027 64.067 418.497 65.873C420.009 67.637 422.13 68.519 424.86 68.519C425.742 68.519 426.645 68.393 427.569 68.141C428.535 67.889 429.501 67.49 430.467 66.944C431.181 66.566 431.811 66.44 432.357 66.566C432.945 66.692 433.428 66.986 433.806 67.448C434.184 67.868 434.415 68.393 434.499 69.023C434.583 69.611 434.499 70.199 434.247 70.787C434.037 71.375 433.617 71.858 432.987 72.236C431.601 73.076 430.131 73.685 428.577 74.063C427.023 74.441 425.553 74.63 424.167 74.63ZM453.88 74.63C451.15 74.63 448.861 74.168 447.013 73.244C445.207 72.32 443.863 70.976 442.981 69.212C442.099 67.406 441.658 65.18 441.658 62.534V49.115H438.382C437.374 49.115 436.597 48.863 436.051 48.359C435.505 47.813 435.232 47.078 435.232 46.154C435.232 45.188 435.505 44.453 436.051 43.949C436.597 43.445 437.374 43.193 438.382 43.193H441.658V37.46C441.658 36.158 441.994 35.171 442.666 34.499C443.38 33.827 444.367 33.491 445.627 33.491C446.887 33.491 447.853 33.827 448.525 34.499C449.197 35.171 449.533 36.158 449.533 37.46V43.193H456.211C457.219 43.193 457.996 43.445 458.542 43.949C459.088 44.453 459.361 45.188 459.361 46.154C459.361 47.078 459.088 47.813 458.542 48.359C457.996 48.863 457.219 49.115 456.211 49.115H449.533V62.093C449.533 64.109 449.974 65.621 450.856 66.629C451.738 67.637 453.166 68.141 455.14 68.141C455.854 68.141 456.484 68.078 457.03 67.952C457.576 67.826 458.059 67.742 458.479 67.7C458.983 67.658 459.403 67.826 459.739 68.204C460.075 68.54 460.243 69.254 460.243 70.346C460.243 71.186 460.096 71.942 459.802 72.614C459.55 73.244 459.067 73.685 458.353 73.937C457.807 74.105 457.093 74.252 456.211 74.378C455.329 74.546 454.552 74.63 453.88 74.63Z"
        fill={dark ? theme.white : theme.black}
      />
    </svg>
  )
}

export default Logo
