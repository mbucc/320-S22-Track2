import {List, ListItem, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

/**
 *
 * @return {JSX.Element}
 */
export default function LogDetail() {
  const router = useRouter();
  const logID = router.query.logid;

  const [data, setData] = useState(null);
  const mockData = [];

  const titleStyle = {
    margin: '20px',
  };

  const subtitleStyle = {
    marginRight: '10px',
    fontWeight: '600',
  };

  useEffect(()=>{
    for (let i = 0; i < 1000; i++) {
      let severity = 'N/A'; const date = `1/${(i%30) + 1}/${2022 + (Math.floor(i / 2022))} 0${i%10}:00:00`; const ps = 'Update Costumer'; const app = 'CRM'; const activity = 'Activity'; let priority = 'N/A'; let category = 'N/A'; let eai = 'N/A'; let BD = ''; let BSD = '';
      switch (i%5) {
        case (0): category = 'Heartbeat'; break;
        case (1): category = 'Stop'; break;
        case (2): category = 'Status'; break;
        case (3): category = 'Security'; break;
        case (4): category = 'Start'; break;
      };
      switch (i%4) {
        case (0): severity = 'Error'; eai = 'EAI Domain 1'; BD = 'Business Domain 1'; BSD = 'Business SubDomain 1'; break;
        case (1): severity = 'Warning'; eai = 'EAI Domain 2'; BD = 'Business Domain 2'; BSD = 'Business SubDomain 2'; break;
        case (2): severity = 'Info'; eai = 'EAI Domain 3'; BD = 'Business Domain 1'; BSD = 'Business SubDomain 1'; break;
        case (3): severity = 'Success'; eai = 'EAI Domain 4'; BD = 'Business Domain 2'; BSD = 'Business SubDomain 2'; break;
      };
      switch (i%3) {
        case (0): priority = 'High'; break;
        case (1): priority = 'Medium'; break;
        case (2): priority = 'Low'; break;
      };
      mockData.push({
        'severity': severity,
        'Created Date': date,
        'Process/Service': ps,
        'Application': app,
        'Activity': activity,
        'Log Event': 'detail',
        'priority': priority,
        'category': category,
        'EAI Domain': eai,
        'Business Domain': BD,
        'Business SubDomain': BSD,
        'id': i,
      });
    }

    setData(mockData[logID]);
  }, []);

  return (
    <>
      <Typography variant = 'h4' style = {titleStyle}>Log Event ID: {logID}</Typography>
      {data === null ? (<Typography variant = 'p'> loading... </Typography>) :
            (<div>
              <Box sx = {{
                width: '90%',
                maxWidth: '800px',
              }}>
                <List>
                  <ListItem dividerß>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Severity:
                    </Typography>
                    {data['severity']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Created Date:
                    </Typography>
                    {data['Created Date']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Process/Service:
                    </Typography>
                    {data['Process/Service']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Application:
                    </Typography>
                    {data['Application']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Activity:
                    </Typography>
                    {data['Activity']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Log Event:
                    </Typography>
                    {data['Log Event']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Priority:
                    </Typography>
                    {data['priority']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Category:
                    </Typography>
                    {data['category']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      EAI Domain:
                    </Typography>
                    {data['EAI Domain']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Business Domain:
                    </Typography>
                    {data['Business Domain']}
                  </ListItem>
                  <ListItem divider>
                    <Typography variant = 'subtitle1' sx = {subtitleStyle}>
                      Business SubDomain:
                    </Typography>
                    {data['Business SubDomain']}
                  </ListItem>
                </List>
              </Box>
            </div>
            )
      }


    </>
  );
}
