"use client"

import { useId } from "react"

/** Editable content in the 750 × 1612 homepage coordinate space. */
export function XinliuAppPetal() {
  const id = useId().replace(/:/g, "")

  return (
    <g aria-hidden="true" data-app-petal-content="true">
      <defs>
        {/* Rebuild the smooth glass beneath the label baked into the export. */}
        <linearGradient
          id={`${id}-left`}
          x1="0"
          y1="430"
          x2="0"
          y2="545"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6684ad" />
          <stop offset="0.07" stopColor="#607ea6" />
          <stop offset="0.28" stopColor="#5e7ca5" />
          <stop offset="0.47" stopColor="#6383ad" />
          <stop offset="0.65" stopColor="#6b8cb6" />
          <stop offset="0.91" stopColor="#7698c1" />
          <stop offset="1" stopColor="#7c9ec6" />
        </linearGradient>
        <linearGradient
          id={`${id}-right`}
          x1="0"
          y1="430"
          x2="0"
          y2="545"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c4cfe3" />
          <stop offset="0.07" stopColor="#b0c0d9" />
          <stop offset="0.28" stopColor="#7e96bb" />
          <stop offset="0.47" stopColor="#708cb2" />
          <stop offset="0.65" stopColor="#6f8db2" />
          <stop offset="0.91" stopColor="#7190b6" />
          <stop offset="1" stopColor="#7291b7" />
        </linearGradient>
        <linearGradient id={`${id}-blend`}>
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <mask id={`${id}-horizontal`}>
          <rect
            x="314"
            y="430"
            width="123"
            height="115"
            fill={`url(#${id}-blend)`}
          />
        </mask>
        <filter
          id={`${id}-feather`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <mask id={`${id}-surface`}>
          <rect
            x="321"
            y="437"
            width="109"
            height="101"
            rx="10"
            fill="white"
            filter={`url(#${id}-feather)`}
          />
        </mask>
      </defs>
      <g mask={`url(#${id}-surface)`}>
        <rect
          x="314"
          y="430"
          width="123"
          height="115"
          fill={`url(#${id}-left)`}
        />
        <rect
          x="314"
          y="430"
          width="123"
          height="115"
          fill={`url(#${id}-right)`}
          mask={`url(#${id}-horizontal)`}
        />
      </g>
      <image
        href="/images/page7/figma-home/icon-app.svg"
        x="353.5"
        y="440.5"
        width="43"
        height="43"
      />
      <text
        x="375"
        y="529"
        fill="white"
        textAnchor="middle"
        fontFamily="PingFang SC, Microsoft YaHei, sans-serif"
        fontSize="28"
        fontWeight="500"
      >
        做应用
      </text>
    </g>
  )
}
