pragma solidity ^0.8.0;

contract MyeDiary {
    address owner;
    struct Entry {
        uint256 timestamp;
        string content;
    }

    mapping(address => Entry[]) private entries;   

    event EntryCreated(address indexed user, uint256 indexed index, uint256 timestamp);
    event EntryUpdated(address indexed user, uint256 indexed index, uint256 timestamp);
    event EntryDeleted(address indexed user, uint256 indexed index);

    function getAllEntry() public view returns (Entry[] memory) {
        return entries[msg.sender];
    }

    function getEntryCount() public view returns (uint256) {
        return entries[msg.sender].length;
    }

    function createEntry(string memory _content) public {
        Entry memory newEntry = Entry(block.timestamp, _content);
        entries[msg.sender].push(newEntry);
        uint256 index = entries[msg.sender].length - 1;
        emit EntryCreated(msg.sender, index, block.timestamp);
    }

    function readEntry(uint256 _index) public view returns (uint256, string memory) {
        require(_index < entries[msg.sender].length, "Entry does not exist");
        Entry memory entry = entries[msg.sender][_index];
        return (entry.timestamp, entry.content);
    }

    function updateEntry(uint256 _index, string memory _newContent) public {
        require(_index < entries[msg.sender].length, "Entry does not exist");
        entries[msg.sender][_index].content = _newContent;
        emit EntryUpdated(msg.sender, _index, block.timestamp);
    }

    function deleteEntry(uint256 _index) public {
    require(_index < entries[msg.sender].length, "Entry does not exist");

    // Move the last entry to the position of the deleted entry
    entries[msg.sender][_index] = entries[msg.sender][entries[msg.sender].length - 1];

    // Remove the last entry
    entries[msg.sender].pop();

    emit EntryDeleted(msg.sender, _index);
}

}