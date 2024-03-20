// import React, { useState, useEffect } from 'react';
// import { Typography, List, ListItem, ListItemText } from '@mui/material';

// const BankNeeds = ({ selectedBank }) => {
//   const [needs, setNeeds] = useState([]);

//   useEffect(() => {
    
//     if (selectedBank && selectedBank.needs) {
//         console.log(selectedBank);
//         setNeeds(selectedBank.needs);
//     }
//   }, [selectedBank]);

//   console.log(needs);

//   return (
//     <div className="bank-needs">
//       <Typography variant="h6">Bank Needs</Typography>
//       <List>
//         {needs.map((need, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={need} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default BankNeeds;