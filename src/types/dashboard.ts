export type IDashboardInfo = {
     count: {
          school: number,
          teacher: number,
          student: number,
          totalUser: number
     },
     months: {
          month: string,
          school: number,
          teacher: number,
          student: number
     }[],
     province: IDashboardProvince[]
}

export type IDashboardProvince = {
     provinceName: string,
     school: number,
     student: number,
     teacher: number
}
