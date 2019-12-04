export default function getDate() {
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();
  let newDate = `${month}-${date}-${year}`;

  return newDate;
}
