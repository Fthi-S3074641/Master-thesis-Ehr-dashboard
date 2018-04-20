pragma solidity ^0.4.17;

contract Ehr {
    
    address deployerAdmin;
    struct someone {
        string identf;
        uint balance;
        mapping (address => uint) gaveRightsTo;
        mapping (address => uint) hasRightsTo;
    }
    
    mapping (address => someone) private everyone;
    
    event RegisterParticipant(address identity, string category);
    event PaymentRequested(address from, address to, uint amount);
    
    function userRegister(string who) public{
        deployerAdmin = msg.sender;
        everyone[msg.sender].identf = who;
        everyone[msg.sender].balance = 15;
        RegisterParticipant(msg.sender, who);
        
        require(everyone[msg.sender].gaveRightsTo[msg.sender] == 0);
        everyone[msg.sender].gaveRightsTo[msg.sender] = 1;
        everyone[msg.sender].hasRightsTo[msg.sender] = 1;
    }
    
    function grantAccess(address doctor) public {
        everyone[msg.sender].gaveRightsTo[doctor]=1;
        everyone[doctor].hasRightsTo[msg.sender]=1;
    }
    
    function revokeAccess(address user) public{
        everyone[msg.sender].gaveRightsTo[user]=2;
        everyone[user].hasRightsTo[msg.sender]=2;
    }
    
    // function getPrivileged() public view returns(){
    //     return everyone[msg.sender].gaveRightsTo[msg.sender];
    // }
    
    function sendPayment(address receiver, uint amount) public {
        require(everyone[msg.sender].balance >=amount);
        everyone[msg.sender].balance -= amount;
        everyone[receiver].balance += amount;
    }
    
    function requestPayment(address from, uint amount) public {
        PaymentRequested(from, msg.sender, amount);
    }
    
    function getBalance() public view returns(uint){
        return everyone[msg.sender].balance;
    }
    
    function verifyPriviledge(address patient, address doctor) public view returns(bool) {
        // require(msg.sender == deployerAdmin);
        if(everyone[patient].gaveRightsTo[doctor] == 1){
            return true;
        }
        else {
            return false;
        }
    }
    
    function didIGaveRights(address x) public view returns(uint){
        return everyone[msg.sender].gaveRightsTo[x];
        
    }
}
