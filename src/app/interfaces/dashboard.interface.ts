export interface IDashboardInfo {
     count: {
          school: number,
          teacher: number,
          student: number,
          totalUser: number
     },
     months :{
          month: string,
          school: number,
          teacher: number,
          student: number
     }[]
}
