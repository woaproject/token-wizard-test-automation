### Automated tests for token-wizard 
Start URL in ```config.json```

Test suite #1 , starts with command ```npm run -script test1```

#### UI tests
```

 - User is able to open wizard welcome page
 - Welcome page: button NewCrowdsale present
 - Welcome page: button ChooseContract present 
 - Welcome page: user is able to open Step1 by clicking button NewCrowdsale
 - Wizard step#1: user is able to open Step2 by clicking button Continue
 - Wizard step#2: user able to fill Name field with valid data
 - Wizard step#2: user able to fill Ticker field with valid data
 - Wizard step#2: user able to fill Decimals field with valid data
 - Wizard step#2: user is able to add reserved tokens
 - Wizard step#2: user is able to remove one of reserved tokens 
 - Wizard step#2: button ClearAll  present 
 - Wizard step#2: Alert present after clicking ClearAll, alert contains button No
 - Wizard step#2: User able to click button No and warning disappear
 - Wizard step#2: Alert present after clicking ClearAll, alert contains button Yse
 - Wizard step#2: user is able bulk delete of reserved tokens 
 - Wizard step#2: user is able to add one reserved tokens address after deletion
 - Wizard step#2: button Continue present
 - Wizard step#2: user is able to open Step3 by clicking button Continue 
 - Wizard step#3: field Wallet address contains the metamask account address 
 - Wizard step#3: User is able to set "Safe and cheap gasprice" checkbox 
 - Wizard step#3: User is able to set "Normal Gasprice" checkbox
 - Wizard step#3: User is able to set "Fast Gasprice" checkbox
 - Wizard step#3: User is able to set "Custom Gasprice" checkbox
 - Wizard step#3: User is able to fill "Custom Gasprice" with valid value
 - Wizard step#3: User is able to set checkbox  "Whitelist disabled"
 - Wizard step#3: User is able to set checkbox  "Whitelist enabled"
 - Wizard step#3: User is able to download CVS file with whitelisted addresses
 - Wizard step#3: User is able to add several whitelisted addresses
 - Wizard step#3: User is able to remove one whitelisted address
 - Wizard step#3: User is able to bulk delete all whitelisted addresses


```

#### Functional tests
```
1. Owner  can create crowdsale(scenario testSuite1.json),1 tier, not modifiable, no whitelist,1 reserved
2. Disabled to modify the end time if crowdsale is not modifiable
3. Investor can NOT buy less than mincap in first transaction
4. Investor can buy amount equal mincap
5. Investor can buy less than mincap after first transaction
6. Disabled to buy after crowdsale time expired
7. Owner able to distribute if crowdsale time expired but not all tokens were sold
8. Reserved address has received correct quantity of tokens after distribution
9. Owner able to finalize ( if crowdsale time expired but not all tokens were sold)
10.Investor has received correct quantity of tokens after finalization
11.Owner  can create crowdsale(scenario testSuite2.json): 1 tier,1 whitelist address,2 reserved addresses, modifiable
12.Whitelisted investor NOT able to buy before start of crowdsale 
13.Disabled to modify the name of tier
14.Tier's name  matches given value
15.Disabled to modify the wallet address
16.Tier's wallet address matches given value
17.Owner is able to add whitelisted address before start of crowdsale
18.Owner is able to modify the rate before start of crowdsale
19.Owner is able to modify the total supply before start of crowdsale
20.Owner is able to modify the start time  before start of crowdsale
21.Owner is able to modify the end time before start of crowdsale
22.Warning present if end time earlier than start time
23.Not owner is NOT able to modify the start time of tier 
24.Disabled to modify the start time if crowdsale has begun
25.Disabled to modify the total supply if crowdsale has begun
26.Disabled to modify the rate if crowdsale has begun
27.Owner is able to modify the end time after start of crowdsale
28.Owner is able to add whitelisted address if crowdsale has begun
29.Whitelisted investor is NOT able to buy less than min in first transaction
30.Whitelisted investor can buy amount equal min
31.Whitelisted investor is able to buy less than min after first transaction
32.Whitelisted investor is  NOT able to buy more than assigned max
33.Whitelisted investor is able to buy assigned max
34.Whitelisted investor is NOT able to buy more than total supply in tier
35.Owner is NOT able to distribute before all tokens are sold and crowdsale is not finished
36.Owner is NOT able to finalize before  all tokens are sold and crowdsale is not finished
37.Whitelisted investor able to buy total supply 
38.Whitelisted investor is NOT able to buy if all tokens were sold
39.Owner able to distribute after all tokens were sold but crowdsale is not finished
40.Reserved address has received correct QUANTITY of tokens after distribution
41.Reserved address has received correct PERCENT of tokens after distribution
42.Not Owner is NOT able to finalize (after all tokens were sold)
43.Owner able to finalize (after all tokens were sold)
44.Disabled to buy after finalization of crowdsale
45.Investor #1 has received correct amount of tokens after finalization
46.Investor #2 has received correct amount of tokens after finalization
```








 
 
 
 