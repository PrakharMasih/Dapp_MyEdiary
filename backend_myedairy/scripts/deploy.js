async function main() {
  const MyEDiary = await ethers.getContractFactory("MyeDiary");

  const MyEDiary_ = await MyEDiary.deploy();
  console.log('first', MyEDiary_);
  console.log('Contact Address:', MyEDiary_.target);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error); 
  process.exit(1);
})