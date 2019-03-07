const abi = require('ethereumjs-abi');
const getConfig = require('./inc/getConfig');

const Sales = artifacts.require('Sales');

module.exports = (deployer, network, accounts) => {
  const { config, wallet } = getConfig(network, accounts);

  // assert.ok(wallet);

  const args = [
    wallet,
    config.total,
    config.name,
    config.decimals,
    config.symbol,
    config.price,
    config.startBlock,
    config.freezeBlock,
    config.cap,
    config.locked,
  ];

  console.log(`args: ${args.join(',')}`);

  const encoded = abi.rawEncode(
    [
      'address',
      'uint256',
      'string',
      'uint8',
      'string',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
    ],
    args,
  );

  console.log(`encoded argument for Sales contract: ${encoded.toString('hex')}`);

  return deployer.deploy(
    Sales,
    wallet,
    config.total,
    config.name,
    config.decimals,
    config.symbol,
    config.price,
    config.startBlock,
    config.freezeBlock,
    config.cap,
    config.locked,
  );
};
