import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, IconButton, Link } from '@mui/material';
import { Icon } from '@iconify/react';
import './footer.css'; // Import footer styles

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
    <footer className="footer">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
      >
        {links.map((link, i) => (
          <div key={i}>
            <Link component="a" href={link.href}>
              <IconButton color="black" size="medium" className='footer-link'>
                <Icon icon={link.icon} />
              </IconButton>
            </Link>
            <p>{link.name}</p>
          </div>
        ))}
      </Grid>
      <div className="footer-info">
        {location.pathname !== '/' && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
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
          &nbsp; by the Not The Ternary Operator &#169; 2024
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
