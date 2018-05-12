
webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
const fs = require('fs-extra');
///////////////////////////////////////////////////////
const wizardWelcome=require('../pages/WizardWelcome.js');
const WizardWelcome=wizardWelcome.WizardWelcome;
const wizStep1=require('../pages/WizardStep1.js');
const WizardStep1=wizStep1.WizardStep1;
const wizStep2=require('../pages/WizardStep2.js');
const WizardStep2=wizStep2.WizardStep2;
const wizStep3=require('../pages/WizardStep3.js');
const WizardStep3=wizStep3.WizardStep3;
const wizStep4=require('../pages/WizardStep4.js');
const WizardStep4=wizStep4.WizardStep4;
const tierpage=require('../pages/TierPage.js');
const TierPage=tierpage.TierPage;
const reservedTokensPage=require('../pages/ReservedTokensPage.js');
const ReservedTokensPage=reservedTokensPage.ReservedTokensPage;
const crowdPage=require('../pages/CrowdsalePage.js');
const CrowdsalePage=crowdPage.CrowdsalePage;
const invstPage=require('../pages/InvestPage.js');
const InvestPage=invstPage.InvestPage;
const managePage=require('../pages/ManagePage.js');
const ManagePage=managePage.ManagePage;

////////////////////////////////////////////////////////
const Logger= require('../entity/Logger.js');
const logger=Logger.logger;
const tempOutputPath=Logger.tempOutputPath;
const tempOutputFile=Logger.tempOutputFile;
const utils=require('../utils/Utils.js');
const Utils=utils.Utils;
const mtMask=require('../pages/MetaMask.js');
const MetaMask=mtMask.MetaMask;
const user=require("../entity/User.js");
const User=user.User;
const crowdsale=require('../entity/Crowdsale.js');
const Crowdsale=crowdsale.Crowdsale;

const supplyTier1=200;
const rateTier1=50000;
const mincapForInvestor2=20;
const maxForInvestor2=200;
const minReservedAddress=15;
const maxReservedAddress=50;

const smallAmount=0.1;
const significantAmount=12345678900;
const endTimeForTestEarlier="11:23";
const endDateForTestEarlier="01/07/2049";
const endTimeForTestLater="11:23";
const endDateForTestLater="01/07/2050";

test.describe('POA token-wizard. Test suite #1',  async function() {


	this.timeout(2400000);//40 min
	this.slow(1800000);

	const user8545_56B2File='./users/user8545_56B2.json';//Owner
	const user8545_F16AFile='./users/user8545_F16A.json';//Investor1 - whitelisted before deployment
	const user8545_f5aAFile='./users/user8545_f5aA.json';//Investor2 - added from manage page before start
	const user8545_ecDFFile= './users/user8545_ecDF.json';//Reserved address, also wh investor that added after start time

    let scenario;
	let scenario1;
	let driver ;
	let Owner ;
	let Investor1;
	let Investor2;
	let ReservedAddress;
	let balance;

	let metaMask;
	let welcomePage;
	let wizardStep1 ;
	let wizardStep2;
	let wizardStep3;
	let tierPage;
	let reservedTokensPage;
    let investPage;
	let startURL;
	let crowdsale;
	let crowdsale1;

/////////////////////////////////////////////////////////////////////////

	test.before(async function() {
		console.log(Date.now());
		logger.info("Version 2.3.0 - truffle ");
		startURL = await Utils.getStartURL();
		driver = await Utils.startBrowserWithMetamask();

		scenario1 = "./scenarios/simple.json";

		const user8545_56B2File='./users/user8545_56B2.json';//Owner
		const user8545_F16AFile='./users/user8545_F16A.json';//Investor1 - whitelisted before deployment
		const user8545_f5aAFile='./users/user8545_f5aA.json';//Investor2 - added from manage page before start
		const user8545_ecDFFile= './users/user8545_ecDF.json';//Reserved address, also wh investor that added after start time

		Owner = new User (driver,user8545_56B2File);
		Investor1 = new User (driver,user8545_F16AFile);
		Investor2 = new User (driver,user8545_f5aAFile);
		ReservedAddress = new User (driver,user8545_ecDFFile);

		await Utils.receiveEth(Owner,20);
		await Utils.receiveEth(Investor1,20);
		await Utils.receiveEth(Investor2,20);
		await Utils.receiveEth(ReservedAddress,20);

		logger.info("Balance: Owner "+ await Utils.getBalance(Owner)/1e18);
		logger.info("Balance: Investor1 "+ await Utils.getBalance(Investor1)/1e18);
		logger.info("Balance: Investor2 "+ await Utils.getBalance(Investor2)/1e18);
		logger.info("Balance: ReservedAddress "+ await Utils.getBalance(ReservedAddress)/1e18);


		crowdsale1=await  Utils.getCrowdsaleInstance(scenario1);
		metaMask = new MetaMask(driver);
		await metaMask.activate();

		welcomePage = new WizardWelcome(driver,startURL);
		wizardStep1 = new WizardStep1(driver);
		wizardStep2 = new WizardStep2(driver);
		wizardStep3 = new WizardStep3(driver);
		investPage = new InvestPage(driver);

		balance = 0;

	});

	test.after(async function() {
		// Utils.killProcess(ganache);
		//await Utils.sendEmail(tempOutputFile);
		let outputPath=Utils.getOutputPath();
		outputPath=outputPath+"/result"+Utils.getDate();
		await fs.ensureDirSync(outputPath);
		await fs.copySync(tempOutputPath,outputPath);
		//await fs.remove(tempOutputPath);
		//await driver.quit();
	});

	/////// Tests
	test.it.skip('Owner  can create crowdsale: 1 tier, no reserved, no whitelist' ,

		async function () {
			await  welcomePage.open();
			await  welcomePage.clickButtonNewCrowdsale();


		   // await wizardStep1.clickCheckboxDutchAuction();
		   // await driver.sleep(2000);
			//await wizardStep1.clickCheckboxWhitelistWithCap();
          await wizardStep1.clickButtonContinue();

			await wizardStep2.fillName("nama");
			await wizardStep2.fillTicker("tik");
			await wizardStep2.clickButtonContinue();


			tierPage = new TierPage(driver,crowdsale1.tiers[0]);

			 await driver.sleep(5000);
			 await wizardStep3.clickCheckboxGasPriceCustom();
			 //console.log(await tierPage.isDisplayedFieldCistomGasPrice());
			 await wizardStep3.clickCheckboxWhitelistYes()
			 await tierPage.fillWhitelist();

			await tierPage.fillSetupName();
			await tierPage.fillRate();
			await tierPage.fillSupply();
			await tierPage.fillStartTime();
			await tierPage.fillEndTime();

			await tierPage.setModify();

			 await wizardStep3.clickButtonAddTier();
			tierPage = new TierPage(driver,crowdsale1.tiers[1]);
			await tierPage.fillWhitelist();
			await driver.sleep(5000);
			await tierPage.fillSetupName();
			await tierPage.fillRate();
			await tierPage.fillSupply();
			await tierPage.fillStartTime();
			await tierPage.fillEndTime();
await tierPage.setModify();
			return await assert.equal(true,false,"stop");

		});
////////////////// Simple scenario  /////////////////////////////////////////////////
	test.it('Owner  can create crowdsale: 1 tier, no reserved, no whitelist' ,
		async function () {
			let owner = Owner;//Owner
			balance = 0;
			await owner.setMetaMaskAccount();
			await owner.createMintedCappedCrowdsale(crowdsale1);
			logger.info("Execution ID:  " + crowdsale1.executionID);
			logger.info("url:  " + crowdsale1.url);
			return await assert.notEqual(crowdsale1.executionID, "", 'Test FAILED. Crowdsale has not created ');
	});
	test.it('Countdown timer displayed' ,
		async function () {
			await investPage.waitUntilLoaderGone();
			let result = await investPage.getTimerStatus();
			return await assert.notEqual(result,false, 'Test FAILED. Countdown timer are not displayed ');
	});

	test.it('Tier start as scheduled' ,
		async function () {
			await investPage.waitUntilLoaderGone();
			let counter =120;
			do {
				logger.info("wait "+ Date.now());
				await driver.sleep(1000);
			}
			while( counter-->0 &&  !await investPage.isCrowdsaleStarted());
			return await assert.equal(counter>0,true, 'Test FAILED. Tier has not start in time ');
	});

	test.it('Investor can buy half of total supply',
		async function() {
			let owner = Owner;
			//await driver.sleep(180000);

			await owner.setMetaMaskAccount();
			let investor=Owner;
			//crowdsale1.url = "http://localhost:3000/invest?exec-id=0x9a62b390a67ffc0e22038d188679467872e5f2638633f553d548e4d7285d0ff1&networkID=1526069545307";
			 await investor.openInvestPage(crowdsale1);


			let contribution=crowdsale1.tiers[0].supply/2;
			balance = balance + contribution;
			let r =await investor.contribute(contribution);
			console.log("RRRRTTTTRR=   "+ r);

			let result = await investor.getBalanceFromInvestPage(crowdsale1);
			await driver.sleep(10000);
            return await assert.equal(true,false,"");
			return await assert.equal(result,balance,'Test FAILED. Investor can not buy amount = min');
		});
	test.it('Investor can not buy more than total supply',
		async function() {
			//await driver.sleep(180000);
			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale1.tier[0].supply+10;
			await investor.contribute(contribution);
			let result = await investor.getBalanceFromInvestPage(crowdsale);
			return await assert.equal(result,balance,'Test FAILED. Investor can not buy amount = min');
		});
	test.it('Investor can  buy  total supply',
		async function() {
			//await driver.sleep(180000);
			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale1.tier[0].supply/2;
			balance = balance + contribution;
			await investor.contribute(contribution);
			let result = await investor.getBalanceFromInvestPage(crowdsale);
			return await assert.equal(result,balance,'Test FAILED. Investor can not buy amount = min');
		});








	////////////////// MinCap scenario  /////////////////////////////////////////////////


	test.it('Owner  can create crowdsale: 1 tier, no reserved, no whitelist' ,
		async function () {
			let owner = Owner;//Owner
			await owner.setMetaMaskAccount();
			let Tfactor=1;
			await owner.createMintedCappedCrowdsale(crowdsale1,Tfactor);
			logger.info("Execution ID:  " + crowdsale1.executionID);
			logger.info("url:  " + crowdsale1.url);
			//return await assert.equal(true,false,"stop");
			return await assert.notEqual(crowdsale1.executionID, "", 'Test FAILED. Crowdsale has not created ');
	});

	test.it('Investor is NOT able to buy less than mincap in first transaction',
		async function() {
			let owner = Owner;//Owner
			await owner.setMetaMaskAccount();
			await owner.openInvestPage(crowdsale1);
			await owner.contribute(crowdsale1.minCap * 0.5);
			let result = await owner.getBalanceFromInvestPage(crowdsale1);
			return await assert.equal(result, 0, "Test FAILED.Investor can buy less than minCap in first transaction");
	});

	test.it('Investor can buy amount equal mincap',
		async function() {

			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale1.minCap;
			balance = balance + contribution;
			await investor.contribute(contribution);
			let result = await investor.getBalanceFromInvestPage(crowdsale);
			return await assert.equal(result,contribution,'Test FAILED. Investor can not buy amount = min');
	});

	test.it('Investor is able to buy less than min after first transaction',
		async function() {
			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale.minCap-2;
			balance = balance + contribution;
			await investor.contribute(contribution);
			let result = await investor.getBalanceFromInvestPage(crowdsale);

			return await assert.equal(result, balance, "Test FAILED. Investor can NOT buy less than min after first transaction");

	});

	test.it('Investor is  NOT able to buy more than total supply',
		async function() {

			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale1.tiers[0].supply;
			let result = await investor.contribute(contribution);
			return await assert.equal(result, false, "Test FAILED.Investor can  buy more than assigned max");

	});

	test.it('Investor is able to buy total supply',
		async function() {

			let investor=Owner;
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale1.tiers[0].supply-
							 2*crowdsale1.minCap+2;
			balance = balance + contribution;
			let result  = await investor.contribute(contribution);
			return await assert.equal(result, balance, "Test FAILED.Investor can not buy  assigned max");

	});

	test.it('Investor is NOT able to buy if all tokens were sold',
		async function () {

			let investor=Owner;
			await investor.setMetaMaskAccount();
			await investor.openInvestPage(crowdsale1);
			let contribution=crowdsale.tier[0].minCap;
			let result  = await investor.contribute(contribution);
			return await assert.equal(result,false, "Test FAILED.Investor can not buy if all tokens were sold");

	});

	test.it('Owner able to distribute after all tokens were sold but crowdsale is not finished',
		async function() {

			let owner=Owner;
			await owner.setMetaMaskAccount();
			let result = await owner.distribute(crowdsale1);
			return await assert.equal(result, true, "Test FAILED. Owner can NOT distribute (after all tokens were sold)");

	});


});
