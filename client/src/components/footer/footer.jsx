import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, IconButton, Link } from '@mui/material';
import { Icon } from '@iconify/react';

const links = [
  {
    name: 'Email Me',
    href: `mailto:nottheternaryoperator@gmail.com`,
    icon: 'ci:mail',
  },
  {
    name: 'Github',
    href: 'https://github.com/nottheternaryoperator',
    icon: 'ant-design:github-outlined',
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Made with{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Not The Ternary Operator &#169; 2024
        </h4>
      </div>
      <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          rowSpacing={2}
        >
          {links.map((link, i) => (
            <div key={i}>
              <Link component="a" href={link.href}>
                <IconButton color="inherit" size="medium">
                  <Icon icon={link.icon} />
                </IconButton>
              </Link>
              <p>{link.name}</p>
            </div>
          ))}
        </Grid>
    </footer>
  );
};

export default Footer;
