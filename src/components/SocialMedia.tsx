interface IconProps {
  size?: number;
  color?: string;
}

const TwitterIcon: React.FC<IconProps> = ({ size = 24, color = '#1DA1F2' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.94 13.94 0 0 1 1.67 3.148a4.92 4.92 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616v.062a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.926 4.926 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.398 0-.79-.023-1.175-.068a13.925 13.925 0 0 0 7.548 2.212c9.054 0 14.001-7.496 14.001-14 0-.213-.005-.426-.015-.637A10.004 10.004 0 0 0 24 4.557z" />
    </svg>
  );
};

const GitHubIcon: React.FC<IconProps> = ({ size = 24, color = '#000000' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

const SocialMedia = () => (
  <div className="social">
    <div>
      <a
        href="https://twitter.com/farajisp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </a>
    </div>

    <div>
      <a
        href="https://github.com/FarajiSparks"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </a>
    </div>
  </div>
);

export default SocialMedia;
