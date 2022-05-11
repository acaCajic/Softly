type SVGProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: SVGProps) => (
  <svg
    {...props}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="12px"
    width="12px"
  >
    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
  </svg>
);
