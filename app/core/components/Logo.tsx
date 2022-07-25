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
    <svg
      onClick={handleLogoClick}
      style={{ cursor: "pointer" }}
      viewBox="0 0 1090 268"
      width="170"
      height="60"
      {...props}
    >
      <clipPath id="clip">
        <path d="M142 15.0114V36H123.5C123.333 30.8333 123.621 21.4851 123.5 21C123 19 121.833 18.8446 121 18.5112H21C19 18.5112 18.5 20.1779 18.5 21.0112V36H0V15.0114C1.6 5.41152 11.3333 1.01145 16 0.011392H126.5C133.7 -0.388608 139.833 9.84472 142 15.0114Z" />
      </clipPath>
      <foreignObject x="100" y="0" width="142" height="36" clipPath="url(#clip)">
        <div style={{ ...box, ...gradient2, ...noBorder }} />
      </foreignObject>
      <foreignObject x="0" y="36" width="340" height="232">
        <div style={{ ...box, ...border, ...gradient3 }} />
      </foreignObject>
      <foreignObject x="14" y="50" width="312" height="204">
        <div
          style={{ ...box, ...border, backgroundColor: dark ? theme.colors.dark[5] : theme.white }}
        />
      </foreignObject>
      <foreignObject x="182" y="92" width="120" height="121">
        <div style={{ ...box, ...gradient }} />
      </foreignObject>
      <foreignObject x="40" y="92" width="112" height="48">
        <div style={{ ...box, ...gradient1 }} />
      </foreignObject>
      <foreignObject x="40" y="164" width="112" height="21">
        <div style={{ ...box, ...gradient2 }} />
      </foreignObject>
      <foreignObject x="40" y="192" width="112" height="21">
        <div style={{ ...box, ...gradient2 }} />
      </foreignObject>
      <svg x="400" y="86">
        <path
          d="M51.4 124.7C46.4133 124.7 41.4267 124.303 36.44 123.51C31.4533 122.83 26.75 121.753 22.33 120.28C17.91 118.693 13.9433 116.767 10.43 114.5C8.39 113.14 6.97333 111.497 6.18 109.57C5.38667 107.643 5.10333 105.773 5.33 103.96C5.67 102.033 6.40667 100.39 7.54 99.03C8.78667 97.5567 10.3167 96.65 12.13 96.31C13.9433 95.97 15.9267 96.48 18.08 97.84C23.0667 100.787 28.3367 102.94 33.89 104.3C39.4433 105.66 45.28 106.34 51.4 106.34C60.3533 106.34 66.87 104.867 70.95 101.92C75.03 98.86 77.07 94.95 77.07 90.19C77.07 86.2233 75.5967 83.1067 72.65 80.84C69.8167 78.5733 64.8867 76.7033 57.86 75.23L39.16 71.32C28.3933 69.0533 20.3467 65.2567 15.02 59.93C9.80667 54.49 7.2 47.35 7.2 38.51C7.2 32.9567 8.33333 27.9133 10.6 23.38C12.8667 18.8467 16.04 14.9367 20.12 11.65C24.3133 8.36333 29.2433 5.86999 34.91 4.16999C40.69 2.35666 47.0367 1.44999 53.95 1.44999C60.75 1.44999 67.21 2.29999 73.33 3.99999C79.45 5.69999 84.9467 8.19333 89.82 11.48C91.6333 12.7267 92.8233 14.2567 93.39 16.07C94.07 17.8833 94.24 19.6967 93.9 21.51C93.56 23.21 92.7667 24.6833 91.52 25.93C90.2733 27.1767 88.6867 27.9133 86.76 28.14C84.9467 28.3667 82.85 27.8 80.47 26.44C76.2767 24.06 72.0267 22.36 67.72 21.34C63.4133 20.32 58.7667 19.81 53.78 19.81C48.5667 19.81 44.09 20.5467 40.35 22.02C36.61 23.4933 33.72 25.59 31.68 28.31C29.7533 30.9167 28.79 34.0333 28.79 37.66C28.79 41.74 30.15 45.0267 32.87 47.52C35.59 49.9 40.2367 51.77 46.81 53.13L65.34 57.04C76.56 59.42 84.89 63.16 90.33 68.26C95.8833 73.36 98.66 80.16 98.66 88.66C98.66 94.1 97.5267 99.03 95.26 103.45C93.1067 107.87 89.9333 111.667 85.74 114.84C81.66 118.013 76.73 120.45 70.95 122.15C65.17 123.85 58.6533 124.7 51.4 124.7ZM125.836 124.36C122.436 124.36 119.829 123.453 118.016 121.64C116.203 119.713 115.296 116.993 115.296 113.48V12.5C115.296 8.98666 116.203 6.32333 118.016 4.51C119.829 2.69666 122.436 1.78999 125.836 1.78999C129.236 1.78999 131.843 2.69666 133.656 4.51C135.583 6.32333 136.546 8.98666 136.546 12.5V75.23H136.886L164.936 45.65C167.203 43.3833 169.186 41.6267 170.886 40.38C172.586 39.1333 174.909 38.51 177.856 38.51C180.803 38.51 183.013 39.3033 184.486 40.89C186.073 42.3633 186.866 44.1767 186.866 46.33C186.866 48.4833 185.846 50.6367 183.806 52.79L154.226 84.07V75.23L186.696 110.25C188.736 112.403 189.643 114.613 189.416 116.88C189.303 119.033 188.396 120.847 186.696 122.32C184.996 123.68 182.843 124.36 180.236 124.36C177.063 124.36 174.513 123.737 172.586 122.49C170.773 121.243 168.733 119.373 166.466 116.88L136.886 85.94H136.546V113.48C136.546 120.733 132.976 124.36 125.836 124.36ZM216.979 124.19C213.579 124.19 210.972 123.17 209.159
121.13C207.345 119.09 206.439 116.257 206.439 112.63V50.24C206.439 46.5 207.345 43.6667 209.159 41.74C210.972 39.7 213.579 38.68 216.979 38.68C220.379 38.68 222.985 39.7 224.799 41.74C226.725 43.6667 227.689 46.5 227.689 50.24V112.63C227.689 116.257 226.782 119.09 224.969 121.13C223.155 123.17 220.492 124.19 216.979 124.19ZM216.979 22.87C213.012 22.87 209.895 21.9067 207.629 19.98C205.475 17.94 204.399 15.1633 204.399 11.65C204.399 8.02333 205.475 5.24666 207.629 3.31999C209.895 1.39333 213.012 0.429997 216.979 0.429997C221.059 0.429997 224.175 1.39333 226.329 3.31999C228.482 5.24666 229.559 8.02333 229.559 11.65C229.559 15.1633 228.482 17.94 226.329 19.98C224.175 21.9067 221.059 22.87 216.979 22.87ZM278.159 124.7C268.752 124.7 261.669 122.037 256.909 116.71C252.149 111.27 249.769 103.337 249.769 92.91V12.5C249.769 8.98666 250.675 6.32333 252.489 4.51C254.302 2.69666 256.909 1.78999 260.309 1.78999C263.709 1.78999 266.315 2.69666 268.129 4.51C270.055 6.32333 271.019 8.98666 271.019 12.5V91.89C271.019 97.1033 272.095 100.957 274.249 103.45C276.515 105.943 279.689 107.19 283.769 107.19C284.675 107.19 285.525 107.19 286.319 107.19C287.112 107.077 287.905 106.963 288.699 106.85C290.285 106.623 291.362 107.077 291.929 108.21C292.495 109.23 292.779 111.383 292.779 114.67C292.779 117.503 292.212 119.713 291.079 121.3C289.945 122.887 288.075 123.85 285.469 124.19C284.335 124.303 283.145 124.417 281.899 124.53C280.652
124.643 279.405 124.7 278.159 124.7ZM332.446 124.7C323.039 124.7 315.956 122.037 311.196 116.71C306.436 111.27 304.056 103.337 304.056 92.91V12.5C304.056 8.98666 304.963 6.32333 306.776 4.51C308.589 2.69666 311.196 1.78999 314.596 1.78999C317.996 1.78999 320.603 2.69666 322.416 4.51C324.343 6.32333 325.306 8.98666 325.306 12.5V91.89C325.306 97.1033 326.383 100.957 328.536 103.45C330.803 105.943 333.976 107.19 338.056 107.19C338.963 107.19 339.813 107.19 340.606 107.19C341.399 107.077 342.193 106.963 342.986 106.85C344.573 106.623 345.649 107.077 346.216 108.21C346.783 109.23 347.066 111.383 347.066 114.67C347.066 117.503 346.499 119.713 345.366 121.3C344.233 122.887 342.363 123.85 339.756 124.19C338.623 124.303 337.433 124.417 336.186 124.53C334.939 124.643 333.693 124.7 332.446 124.7ZM398.483 124.7C389.076 124.7 380.973 122.943 374.173 119.43C367.373 115.917 362.103 110.93 358.363 104.47C354.736 98.01 352.923 90.36 352.923 81.52C352.923 72.9067 354.68 65.37 358.193 58.91C361.82 52.45 366.75 47.4067 372.983 43.78C379.33 40.04 386.526 38.17 394.573 38.17C400.466 38.17 405.736 39.1333 410.383 41.06C415.143 42.9867 419.166 45.7633 422.453 49.39C425.853 53.0167 428.403 57.4367 430.103 62.65C431.916 67.75 432.823 73.53 432.823 79.99C432.823 82.03 432.086 83.6167 430.613 84.75C429.253 85.77 427.27 86.28 424.663 86.28H370.093V74.04H417.863L415.143 76.59C415.143 71.3767 414.35 67.0133 412.763 63.5C411.29 59.9867 409.08 57.3233 406.133 55.51C403.3 53.5833 399.73 52.62 395.423 52.62C390.663 52.62 386.583 53.7533 383.183 56.02C379.896 58.1733 377.346 61.29 375.533 65.37C373.833 69.3367 372.983 74.0967 372.983 79.65V80.84C372.983 90.1333 375.136 97.1033 379.443 101.75C383.863 106.283 390.323 108.55 398.823 108.55C401.77 108.55 405.056 108.21 408.683 107.53C412.423 106.737 415.936 105.433 419.223 103.62C421.603 102.26 423.7 101.693 425.513 101.92C427.326 102.033 428.743 102.657 429.763 103.79C430.896 104.923 431.576 106.34 431.803 108.04C432.03 109.627 431.69 111.27 430.783 112.97C429.99 114.67 428.573 116.143 426.533 117.39C422.566 119.883 417.976 121.753 412.763 123C407.663 124.133 402.903 124.7 398.483 124.7ZM487.4 124.7C480.033 124.7 473.856 123.453 468.87 120.96C463.996 118.467 460.37 114.84 457.99 110.08C455.61 105.207 454.42 99.2 454.42 92.06V55.85H445.58C442.86 55.85 440.763 55.17 439.29 53.81C437.816 52.3367 437.08 50.3533 437.08 47.86C437.08 45.2533 437.816 43.27 439.29 41.91C440.763 40.55 442.86 39.87 445.58 39.87H454.42V24.4C454.42 20.8867 455.326 18.2233 457.14 16.41C459.066 14.5967 461.73 13.69 465.13 13.69C468.53 13.69 471.136 14.5967 472.95 16.41C474.763 18.2233 475.67 20.8867 475.67 24.4V39.87H493.69C496.41
39.87 498.506 40.55 499.98 41.91C501.453 43.27 502.19 45.2533 502.19 47.86C502.19 50.3533 501.453 52.3367 499.98 53.81C498.506 55.17 496.41 55.85 493.69 55.85H475.67V90.87C475.67 96.31 476.86 100.39 479.24 103.11C481.62 105.83 485.473 107.19 490.8 107.19C492.726 107.19 494.426 107.02 495.9 106.68C497.373 106.34 498.676 106.113 499.81 106C501.17 105.887 502.303 106.34 503.21 107.36C504.116 108.267 504.57 110.193 504.57 113.14C504.57 115.407 504.173 117.447 503.38 119.26C502.7 120.96 501.396 122.15 499.47 122.83C497.996 123.283 496.07 123.68 493.69 124.02C491.31 124.473 489.213 124.7 487.4 124.7ZM551.644 124.7C543.03 124.7 535.55 122.943 529.204 119.43C522.857 115.917 517.927 110.93 514.414 104.47C510.9 97.8967 509.144 90.19 509.144 81.35C509.144 74.6633 510.107 68.7133 512.034 63.5C514.074 58.1733 516.964 53.64 520.704 49.9C524.444 46.0467 528.92 43.1567 534.134 41.23C539.347 39.19 545.184 38.17 551.644 38.17C560.257 38.17 567.737 39.9267 574.084 43.44C580.43 46.9533 585.36 51.94 588.874 58.4C592.387 64.86 594.144 72.51 594.144 81.35C594.144 88.0367 593.124 94.0433 591.084 99.37C589.157 104.697 586.324 109.287 582.584 113.14C578.844 116.88 574.367 119.77 569.154 121.81C563.94 123.737 558.104 124.7 551.644 124.7ZM551.644 108.55C555.837 108.55 559.52 107.53 562.694 105.49C565.867 103.45 568.304 100.447 570.004 96.48C571.817 92.4 572.724 87.3567 572.724 81.35C572.724 72.2833 570.797 65.54 566.944 61.12C563.09
56.5867 557.99 54.32 551.644 54.32C547.45 54.32 543.767 55.34 540.594 57.38C537.42 59.3067 534.927 62.31 533.114 66.39C531.414 70.3567 530.564 75.3433 530.564 81.35C530.564 90.3033 532.49 97.1033 536.344 101.75C540.197 106.283 545.297 108.55 551.644 108.55ZM622.223 124.36C618.823 124.36 616.216 123.453 614.403 121.64C612.589 119.713 611.683 116.993 611.683 113.48V49.22C611.683 45.7067 612.589 43.0433 614.403 41.23C616.216 39.4167 618.766 38.51 622.053 38.51C625.339 38.51 627.889 39.4167 629.703 41.23C631.516 43.0433 632.423 45.7067 632.423 49.22V60.78L630.553 56.53C633.046 50.5233 636.899 45.99 642.113 42.93C647.439 39.7567 653.446 38.17 660.133 38.17C666.819 38.17 672.316 39.4167 676.623 41.91C680.929 44.4033 684.159 48.2 686.313 53.3C688.466 58.2867 689.543 64.6333 689.543 72.34V113.48C689.543 116.993 688.636 119.713 686.823 121.64C685.009 123.453 682.403 124.36 679.003 124.36C675.603 124.36 672.939 123.453 671.013 121.64C669.199 119.713 668.293 116.993 668.293 113.48V73.36C668.293 66.9 667.046 62.1967 664.553 59.25C662.173 56.3033 658.433 54.83 653.333 54.83C647.099 54.83 642.113 56.8133 638.373 60.78C634.746 64.6333 632.933 69.79 632.933 76.25V113.48C632.933 120.733 629.363 124.36 622.223 124.36Z"
          fill={dark ? "#F1F1F1" : "#343C44"}
        />
      </svg>
    </svg>
  )
}

export default Logo
