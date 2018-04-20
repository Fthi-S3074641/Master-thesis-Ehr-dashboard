var Ehr = artifacts.require('./Ehr.sol');
module.exports = function(deployer) {
    deployer.deploy(Ehr, {gas: 4500000});
};