export function getFullMonthStartEndDays(yearAndMonth: string | number) {
    const date = new Date(yearAndMonth);
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toISOString();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).toISOString();
    return { firstDay, lastDay };
  }



  export function getDaysInMonth(yearWithMonth: string) {
    if(!yearWithMonth) return
    const {year, month} = createYearAndMonthOrder(yearWithMonth);
    return new Date(Number(year), Number(month), 0).getDate();
  }
  
function createYearAndMonthOrder(yearWithMonth: string) {
 const yearAndMonth = yearWithMonth.split('-');
 return {year: yearAndMonth[0], month: yearAndMonth[1]}
}


export function convertTimeToDate(date: string | number) {
  return new Date(date).getDate();
}