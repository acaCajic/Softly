import react from 'react';

type SVGProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: SVGProps) => (
  <svg
    {...props}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path
      d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
      fill="currentColor"
    />
  </svg>
);
