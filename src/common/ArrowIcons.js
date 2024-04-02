import PropTypes from 'prop-types';

const UpArrowIcon = ({ filled, onClick }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer', fill: filled ? '#FF7F50' : 'none', stroke: '#FF7F50' }}>
    <path d="M12 19V5 M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

UpArrowIcon.propTypes = {
  filled: PropTypes.bool,
  onClick: PropTypes.func
};

const DownArrowIcon = ({ filled, onClick }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer', fill: filled ? '#013A63' : 'none', stroke: '#013A63' }}>
    <path
      d="M12 5v14 M19 12l-7 7-7-7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

DownArrowIcon.propTypes = {
  filled: PropTypes.bool,
  onClick: PropTypes.func
};

export { UpArrowIcon, DownArrowIcon };
