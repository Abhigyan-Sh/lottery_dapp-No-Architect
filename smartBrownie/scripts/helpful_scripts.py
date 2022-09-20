from brownie import (accounts, network, config)

LOCAL_DEVELOPMENT_NETWORK= ["development", "ganache-local"]
MAINNET_FORK_NETWORK= ["mainnet-fork-dev"]

def get_account(id= None, index= None):
    if id:
        return accounts.load(id)
    if index:
        return accounts[index]
    if (network.show_active() in LOCAL_DEVELOPMENT_NETWORK 
    or network.show_active() in MAINNET_FORK_NETWORK):
     return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])
