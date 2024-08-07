const RedactOwnership = artifacts.require("RedactOwnership");

module.exports = function (deployer) {
  deployer.deploy(RedactOwnership);
};
