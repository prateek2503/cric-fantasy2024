## Local
Install dependency
```npm install```

Start server
```npm start```

Homepage link
```localhost:8000```

## Setting up AWS
1. Launch an EC2 instance
2. Use AWS Linux or any other linux ditribution
3. Optional: Incrase storage to 30 GB (30 GB is max in free tier)
4. Configure Inbound rules in security group; Add Custom TCP on port 8000
5. Once instance is ready, open instance details and click on connect to open linux terminal
   - alternatively you connect from local system using the dowloaded pem file
7. Install nodejs and git (yum/apt/custom, google how to for your linux distribution)
8. Install PM2 (Process manager for nodejs) `npm install pm2 -g`
9. In instance details "Public IPv4 DNS" is the hostname URL

## Deployment (AWS)
### First Time
1. Git Clone 'cric-fantasy'
2. `cd cric-fantasy`
3. `npm install` (Only first time required)
4. `pm2 start cf` (cf is the name of the process; use short names like 'cf')

### Second Time Onwards
1. `pm2 stop cf`
2. `git pull` to get new changes 
3. `pm2 start cf`

### Applying database changes to data file directly
NeDB is used and any change done is appended. This creates duplicates of the same record and the latest state is the last entry. When you start the server NeDB consolidates these changes. So follow these steps before doing anything manually

1. `pm2 stop cf`
2. `pm2 start cf` (To consolidate updates)
3. `pm2 stop cf`
4. Make the changes and then start again 
