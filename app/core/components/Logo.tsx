import { useMantineTheme } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { useRouter } from "next/router"

function Logo({
  withRedirect = true,
  ...props
}: React.SVGProps<SVGSVGElement> & { withRedirect?: boolean }) {
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
      // width="165"
      // height="60"
      viewBox="0 0 1034 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={withRedirect ? handleLogoClick : undefined}
      style={{ cursor: "pointer", marginBottom: "-6px" }}
      {...props}
    >
      <g filter="url(#a)" fillRule="evenodd" clipRule="evenodd">
        <path
          d="M40.052 13.804a7.816 7.816 0 0 1 8.653.558l114.176 87.231a7.815 7.815 0 0 1-3.631 13.946l-52.723 7.596a7.82 7.82 0 0 0-5.028 2.903L68.559 167.9a7.815 7.815 0 0 1-13.893-3.829L36.209 21.576a7.815 7.815 0 0 1 3.843-7.772z"
          fill="url(#b)"
        />
        <path
          d="M200.586 53.937a7.815 7.815 0 0 1 8.652.558l114.176 87.231a7.815 7.815 0 0 1-3.63 13.946l-52.724 7.596a7.82 7.82 0 0 0-5.027 2.903l-32.941 41.862a7.816 7.816 0 0 1-13.893-3.829L196.743 61.709a7.813 7.813 0 0 1 3.843-7.772z"
          fill="url(#c)"
        />
      </g>
      <path
        d="M412.739 166c-6.696 0-12.31-1.134-16.843-3.401-4.429-2.267-7.726-5.565-9.889-9.893-2.164-4.432-3.245-9.893-3.245-16.386v-32.926h-8.036c-2.472 0-4.378-.618-5.717-1.855-1.339-1.34-2.009-3.143-2.009-5.41 0-2.37.67-4.174 2.009-5.41 1.339-1.237 3.245-1.856 5.717-1.856h8.036V74.796c0-3.195.824-5.616 2.472-7.265 1.751-1.65 4.172-2.474 7.263-2.474 3.09 0 5.46.825 7.108 2.474 1.648 1.649 2.472 4.07 2.472 7.265v14.067h16.38c2.472 0 4.378.618 5.717 1.855 1.34 1.237 2.009 3.04 2.009 5.41 0 2.268-.669 4.071-2.009 5.411-1.339 1.237-3.245 1.855-5.717 1.855h-16.38v31.844c0 4.947 1.082 8.657 3.245 11.13 2.164 2.473 5.666 3.71 10.508 3.71 1.751 0 3.297-.155 4.636-.464 1.339-.309 2.524-.515 3.554-.618 1.236-.103 2.266.309 3.09 1.237.824.824 1.237 2.576 1.237 5.255 0 2.061-.361 3.916-1.082 5.565-.618 1.546-1.803 2.628-3.554 3.247-1.339.412-3.091.772-5.254 1.082-2.163.412-4.069.618-5.718.618zM467.843 165.691c-2.575 0-4.79-.619-6.644-1.855-1.854-1.34-3.348-3.401-4.481-6.183l-22.407-57.196c-.927-2.473-1.236-4.638-.927-6.493.412-1.958 1.391-3.503 2.936-4.637 1.546-1.134 3.606-1.7 6.181-1.7 2.267 0 4.121.566 5.563 1.7 1.442 1.03 2.679 3.04 3.709 6.029l18.697 51.476h-3.554l19.316-52.713c.824-2.267 1.906-3.916 3.245-4.947 1.442-1.03 3.297-1.546 5.563-1.546 2.266 0 4.121.567 5.563 1.7 1.442 1.032 2.524 2.629 3.245 4.793l19.006 52.713h-3.245l18.853-51.94c1.03-2.783 2.317-4.69 3.863-5.72a10.004 10.004 0 0 1 5.408-1.546c2.472 0 4.378.619 5.717 1.855 1.34 1.237 2.112 2.835 2.318 4.793.206 1.855-.154 3.916-1.081 6.183l-22.252 57.196c-1.03 2.679-2.524 4.689-4.481 6.028-1.855 1.34-4.069 2.01-6.645 2.01-2.575 0-4.842-.67-6.799-2.01-1.854-1.339-3.296-3.349-4.327-6.028l-20.242-53.641h8.808l-19.78 53.486c-1.03 2.782-2.472 4.844-4.326 6.183-1.855 1.34-4.121 2.01-6.8 2.01zM603.327 166c-7.829 0-14.628-1.597-20.397-4.792-5.769-3.195-10.25-7.729-13.444-13.603-3.193-5.978-4.79-12.985-4.79-21.024 0-6.08.875-11.49 2.627-16.231 1.854-4.843 4.481-8.966 7.881-12.366 3.399-3.504 7.468-6.132 12.207-7.884 4.739-1.855 10.044-2.783 15.916-2.783 7.829 0 14.629 1.598 20.397 4.792 5.769 3.195 10.251 7.73 13.444 13.604 3.194 5.874 4.79 12.83 4.79 20.868 0 6.081-.927 11.543-2.781 16.386-1.751 4.844-4.327 9.017-7.726 12.521-3.4 3.401-7.469 6.029-12.208 7.884-4.739 1.752-10.044 2.628-15.916 2.628zm0-14.685c3.812 0 7.16-.928 10.044-2.783 2.885-1.855 5.1-4.586 6.645-8.193 1.648-3.71 2.472-8.296 2.472-13.758 0-8.244-1.751-14.376-5.254-18.395-3.502-4.122-8.138-6.183-13.907-6.183-3.811 0-7.16.927-10.044 2.782-2.884 1.752-5.151 4.483-6.799 8.193-1.545 3.607-2.318 8.141-2.318 13.603 0 8.142 1.751 14.325 5.254 18.55 3.502 4.123 8.138 6.184 13.907 6.184zM692.824 166c-7.932 0-14.835-1.597-20.707-4.792-5.872-3.298-10.404-7.935-13.598-13.913-3.193-5.977-4.79-12.984-4.79-21.023 0-6.08.876-11.49 2.627-16.231 1.854-4.844 4.481-8.914 7.881-12.212 3.399-3.4 7.52-5.977 12.362-7.73 4.841-1.854 10.25-2.782 16.225-2.782 3.399 0 7.056.464 10.971 1.392a37.268 37.268 0 0 1 11.281 4.637c1.648 1.03 2.729 2.267 3.245 3.71.515 1.443.618 2.937.309 4.483-.309 1.443-.979 2.731-2.009 3.865-.927 1.03-2.112 1.7-3.554 2.009-1.443.206-3.039-.154-4.791-1.082-2.266-1.34-4.584-2.319-6.953-2.937-2.37-.721-4.636-1.082-6.799-1.082-3.4 0-6.387.567-8.963 1.7a17.642 17.642 0 0 0-6.644 4.638c-1.752 1.958-3.091 4.431-4.018 7.42-.927 2.988-1.391 6.441-1.391 10.357 0 7.626 1.803 13.655 5.409 18.086 3.708 4.328 8.911 6.492 15.607 6.492 2.163 0 4.378-.309 6.644-.927 2.37-.618 4.739-1.597 7.108-2.937 1.752-.928 3.297-1.237 4.636-.928 1.442.31 2.627 1.031 3.554 2.165.927 1.03 1.494 2.318 1.7 3.864.206 1.443 0 2.886-.618 4.328-.515 1.443-1.545 2.628-3.091 3.556a38.165 38.165 0 0 1-10.816 4.483c-3.812.927-7.418 1.391-10.817 1.391zM756.593 166c-8.55 0-14.989-2.422-19.315-7.265-4.327-4.947-6.49-12.161-6.49-21.642V63.975c0-3.194.824-5.616 2.472-7.265 1.648-1.649 4.018-2.473 7.108-2.473 3.091 0 5.46.824 7.108 2.473 1.752 1.649 2.627 4.07 2.627 7.265v72.191c0 4.74.979 8.244 2.936 10.511 2.061 2.267 4.945 3.401 8.654 3.401h2.318l2.163-.309c1.442-.206 2.421.206 2.936 1.236.515.928.772 2.886.772 5.875 0 2.576-.515 4.586-1.545 6.028-1.03 1.443-2.73 2.319-5.099 2.628-1.03.103-2.112.206-3.245.309a37.547 37.547 0 0 1-3.4.155zM789.714 165.536c-3.091 0-5.46-.927-7.109-2.782-1.648-1.855-2.472-4.432-2.472-7.729V98.293c0-3.401.824-5.978 2.472-7.73 1.649-1.854 4.018-2.782 7.109-2.782 3.09 0 5.46.928 7.108 2.783 1.751 1.752 2.627 4.328 2.627 7.729v56.732c0 3.297-.824 5.874-2.473 7.729-1.648 1.855-4.069 2.782-7.262 2.782zm0-92.131c-3.606 0-6.439-.876-8.499-2.628-1.958-1.855-2.936-4.38-2.936-7.575 0-3.297.978-5.822 2.936-7.574 2.06-1.752 4.893-2.628 8.499-2.628 3.708 0 6.541.876 8.499 2.628 1.957 1.752 2.936 4.277 2.936 7.575 0 3.194-.979 5.719-2.936 7.574-1.958 1.752-4.791 2.628-8.499 2.628zM854.442 166c-7.933 0-14.835-1.597-20.707-4.792-5.872-3.298-10.404-7.935-13.598-13.913-3.193-5.977-4.79-12.984-4.79-21.023 0-6.08.875-11.49 2.627-16.231 1.854-4.844 4.481-8.914 7.88-12.212 3.4-3.4 7.521-5.977 12.362-7.73 4.842-1.854 10.251-2.782 16.226-2.782 3.399 0 7.056.464 10.971 1.392a37.252 37.252 0 0 1 11.28 4.637c1.649 1.03 2.73 2.267 3.245 3.71.515 1.443.618 2.937.309 4.483-.309 1.443-.978 2.731-2.008 3.865-.928 1.03-2.112 1.7-3.555 2.009-1.442.206-3.039-.154-4.79-1.082-2.266-1.34-4.584-2.319-6.953-2.937-2.37-.721-4.636-1.082-6.8-1.082-3.399 0-6.387.567-8.962 1.7a17.653 17.653 0 0 0-6.645 4.638c-1.751 1.958-3.09 4.431-4.017 7.42-.927 2.988-1.391 6.441-1.391 10.357 0 7.626 1.803 13.655 5.408 18.086 3.709 4.328 8.911 6.492 15.607 6.492 2.164 0 4.379-.309 6.645-.927 2.369-.618 4.739-1.597 7.108-2.937 1.751-.928 3.297-1.237 4.636-.928 1.442.31 2.627 1.031 3.554 2.165.927 1.03 1.494 2.318 1.7 3.864.206 1.443 0 2.886-.618 4.328-.515 1.443-1.546 2.628-3.091 3.556a38.159 38.159 0 0 1-10.817 4.483c-3.811.927-7.417 1.391-10.816 1.391zM901.986 165.691c-3.091 0-5.46-.825-7.108-2.473-1.648-1.752-2.473-4.226-2.473-7.42V63.975c0-3.194.825-5.616 2.473-7.265s4.017-2.473 7.108-2.473c3.09 0 5.46.824 7.108 2.473 1.751 1.649 2.627 4.07 2.627 7.265v57.041h.309l25.497-26.897c2.06-2.061 3.863-3.658 5.408-4.792 1.545-1.134 3.657-1.7 6.336-1.7 2.678 0 4.687.72 6.026 2.164 1.442 1.34 2.164 2.988 2.164 4.946 0 1.958-.928 3.916-2.782 5.874l-26.887 28.444v-8.039l29.514 31.844c1.854 1.959 2.678 3.968 2.472 6.029-.103 1.958-.927 3.607-2.472 4.947-1.545 1.236-3.503 1.855-5.872 1.855-2.884 0-5.202-.567-6.954-1.701-1.648-1.133-3.502-2.834-5.563-5.101l-26.887-28.134h-.309v25.043c0 6.595-3.245 9.893-9.735 9.893zM1001.7 166c-4.426 0-9.113-.464-14.058-1.391-4.944-.928-9.374-2.525-13.289-4.792-1.648-1.031-2.833-2.216-3.554-3.556-.618-1.442-.875-2.834-.772-4.173.206-1.443.721-2.68 1.545-3.71a6.41 6.41 0 0 1 3.399-2.01c1.443-.309 2.988-.052 4.636.773 4.121 1.958 7.984 3.349 11.59 4.174 3.605.721 7.159 1.082 10.663 1.082 4.94 0 8.6-.825 10.97-2.474 2.47-1.752 3.71-4.019 3.71-6.801 0-2.371-.83-4.174-2.47-5.411-1.55-1.339-3.92-2.318-7.11-2.937l-15.454-2.937c-6.387-1.236-11.281-3.555-14.68-6.956-3.297-3.504-4.945-7.987-4.945-13.449 0-4.946 1.339-9.223 4.018-12.83 2.781-3.607 6.593-6.39 11.434-8.348 4.842-1.958 10.405-2.937 16.687-2.937 4.53 0 8.76.516 12.67 1.546 4.02.928 7.88 2.422 11.59 4.483 1.55.825 2.58 1.907 3.09 3.246a6.46 6.46 0 0 1 .47 4.174c-.31 1.34-.93 2.576-1.86 3.71-.92 1.031-2.11 1.7-3.55 2.01-1.34.206-2.89-.103-4.64-.928-3.19-1.649-6.28-2.834-9.27-3.555-2.88-.722-5.66-1.082-8.34-1.082-5.051 0-8.811.876-11.284 2.628-2.369 1.752-3.554 4.07-3.554 6.956 0 2.164.721 3.967 2.164 5.41 1.442 1.443 3.657 2.422 6.644 2.937l15.45 2.937c6.7 1.237 11.75 3.504 15.15 6.802 3.5 3.298 5.25 7.729 5.25 13.294 0 7.523-2.94 13.449-8.81 17.777-5.87 4.225-13.7 6.338-23.49 6.338z"
        fill={dark ? theme.white : theme.black}
      />
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
          y1="62.062"
          x2="186.084"
          y2="107.438"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F06595" />
          <stop offset="1" stopColor="#7A4BFF" />
        </linearGradient>
        <filter
          id="a"
          x="23.145"
          y=".758"
          width="405.34"
          height="317.258"
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_416_3645" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="24" dy="26" />
          <feGaussianBlur stdDeviation="17.5" />
          <feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.21 0" />
          <feBlend in2="effect1_dropShadow_416_3645" result="effect2_dropShadow_416_3645" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="54" dy="59" />
          <feGaussianBlur stdDeviation="24" />
          <feColorMatrix values="0 0 0 0 0.529412 0 0 0 0 0.168627 0 0 0 0 0.968627 0 0 0 0.13 0" />
          <feBlend in2="effect2_dropShadow_416_3645" result="effect3_dropShadow_416_3645" />
          <feBlend in="SourceGraphic" in2="effect3_dropShadow_416_3645" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default Logo
