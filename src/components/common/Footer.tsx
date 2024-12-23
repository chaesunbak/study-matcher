const FEEEDBACK_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd45v8-HLfyxH-xCBoM0DWOUt-_wHyIA5ZjIYlDPq7qMs4jQw/viewform?usp=header';
const GIIHUB_URL = 'https://github.com/Team-LinkUp';

const Footer = () => {
  return (
    <footer className="container mx-auto p-4 text-center text-gray-600">
      <p>
        © 2024 Link Up. All rights reserved. |{' '}
        <a
          href={FEEEDBACK_URL}
          className="hover:text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          피드백
        </a>
        {' | '}
        <a
          href={GIIHUB_URL}
          className="hover:text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
