import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, Signer } from "hardhat";


async function deployContract() {

  const [accountOwner, accountOne, accountTwo] = await ethers.getSigners();
  const Contract = await ethers.getContractFactory("KYToken");
  const contract = await Contract.deploy();
  return { contract, accountOwner, accountOne, accountTwo };

}

// This function get the balance in string format
function b(balance) {
  console.log('tipo recibido => ', typeof balance);
  return ethers.formatEther(balance);
}


describe("Ky-Token", function () {

  let contractToken: Signer;
  let owner: Signer;
  let accOne: Signer;
  let accTwo: Signer;

  beforeEach(async () => {
    const { contract, accountOwner, accountOne, accountTwo } = await deployContract();
    contractToken = contract;
    owner = accountOwner;
    accOne = accountOne;
    accTwo = accountTwo;
  });

  describe("Ky-Token Transfers", function () {

    it("Token balance before", async function () {
      const balanceOwner = await contractToken.balanceOf(owner.address);
      const balanceAccountOne = await contractToken.balanceOf(accOne.address);
      const balanceAccountTwo = await contractToken.balanceOf(accTwo.address);
      expect(ethers.formatEther(balanceOwner)).to.be.equal('90000.0');
      expect(ethers.formatEther(balanceAccountOne)).to.be.equal('0.0');
      expect(ethers.formatEther(balanceAccountTwo)).to.be.equal('0.0');
    });

    // TODO : Create tests for the transactions with frees in ERC20 ;)
    it("Sending tokens", async function () {
      const response = await contractToken.transfer(accOne.address, 10);
      const balanceNow = await contractToken.balanceOf(owner.address);
      console.log(b(balanceNow));

      // TODO : The transactions goes to the contractToken
      // TODO : Send a transfer from the accOne to the accTwo
      // TODO : Calculate the receive amount - tax percentage ;)
      //expect(response.to).to.be.equal(contractToken.address);
    });

  });


});
