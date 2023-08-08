
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

const Footer = () => {
    function Copyright(props) {
        return (
          <Typography variant="inherit" color="text.secondary" align="center" {...props} >
            {'Copyright © '}
            <Link color="inherit" to="https://">
              Lottery Bet 
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    return(
        <>
            <Copyright color="#4aed5c" sx={{ mt: 2}} style={{ display: 'flex', justifyContent: 'center', height: '4vh'}} />
        </>
    )
}
export default Footer;