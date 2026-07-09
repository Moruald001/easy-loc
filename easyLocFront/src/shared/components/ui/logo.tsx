export default function Logo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 350"
        width="400"
        height="150"
      >
        <path
          d="M170 130 L300 40 L430 130"
          fill="none"
          stroke="#555555"
          stroke-width="16"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <line
          x1="170"
          y1="130"
          x2="170"
          y2="175"
          stroke="#555555"
          stroke-width="16"
        />
        <line
          x1="430"
          y1="130"
          x2="430"
          y2="175"
          stroke="#555555"
          stroke-width="16"
        />

        <rect x="275" y="110" width="18" height="18" fill="#555555" />
        <rect x="307" y="110" width="18" height="18" fill="#555555" />
        <rect x="275" y="142" width="18" height="18" fill="#555555" />
        <rect x="307" y="142" width="18" height="18" fill="#555555" />

        <text
          x="300"
          y="290"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="84"
          font-weight="500"
          fill="#555555"
          className="font-display"
        >
          Easy-Loc
        </text>
      </svg>
    </div>
  );
}
