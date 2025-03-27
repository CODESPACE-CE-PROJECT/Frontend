import { IDashboardProvince } from "@/types/dashboard"

interface Props {
  provinces: IDashboardProvince[] | undefined
}

export const ProvinceTable: React.FC<Props> = ({ provinces }) => {
  return (
    <div className="table w-full rounded-xl">
      <div className="table-header-group bg-[#3049724D] w-full">
        <div className="table-row text-xl font-medium">
          <div className="table-cell text-left rounded-l-xl pl-8 py-4 w-1/2">จังหวัด</div>
          <div className="table-cell text-center rounded-r-xl py-4 w-1/2">โรงเรียน</div>
        </div>
      </div>

      <div className="table-row-group w-full">
        <div className="table-row w-full" >
          <div className="table-cell py-1"/>
        </div>
        {provinces?.map((item) => (
          <div className="table-row w-full" key={item.provinceName}>
            <div className="table-cell text-left pl-8 py-4">{item.provinceName}</div>
            <div className="table-cell text-center py-4">{item.school}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
