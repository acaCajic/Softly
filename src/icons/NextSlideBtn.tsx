type SVGProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: SVGProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="61"
    height="61"
    viewBox="0 0 61 61"
    fill="none"
  >
    <circle opacity="0.5" cx="30.5" cy="30.5" r="30.5" fill="currentColor" />
    <path
      d="M24 21.055L33.8893 31L24 40.945L27.0445 44L40 31L27.0445 18L24 21.055Z"
      fill="currentColor"
    />
  </svg>
);
