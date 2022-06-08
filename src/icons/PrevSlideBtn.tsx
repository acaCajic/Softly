type SVGProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: SVGProps) => (
  <svg {...props} width="61" height="61" viewBox="0 0 61 61" fill="none">
    <circle
      opacity="0.5"
      r="30.5"
      transform="matrix(-1 0 0 1 30.5 30.5)"
      fill="currentColor"
    />
    <path
      d="M37 21.055L27.1107 31L37 40.945L33.9555 44L21 31L33.9555 18L37 21.055Z"
      fill="currentColor"
    />
  </svg>
);
