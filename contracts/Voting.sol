// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    constructor() {
        candidates.push(Candidate("Ram", 0));
        candidates.push(Candidate("Shyam", 0));
    }

    function vote(uint index) public {
        require(!hasVoted[msg.sender], "Already voted!");

        hasVoted[msg.sender] = true;
        candidates[index].voteCount++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
