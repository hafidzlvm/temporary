import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { Button } from "@/components/lib/ui/button";
// import BasicTableOne from "@/components/tables/BasicTables/BasicTableOne";
// import { columns } from "@/components/user/column";
// import { DataTable } from "@/components/user/data-table";

export function UserPage() {
  // const data = [
  //   {
  //     id: "728ed52f",
  //     amount: 100,
  //     status: "pending",
  //     email: "m@example.com",
  //   },
  //   // ...
  // ];

  return (
    <>
      <PageMeta
        title="Master Data | User"
        description="This is Master Data of List User page for Kapin"
      />
      <PageBreadcrumb pageTitle="User" />
      <div className="space-y-6">
        <ComponentCard title="User List">
          {/*<BasicTableOne />*/}
          <Button>Button</Button>
          {/*<DataTable columns={columns} data={data} />*/}
        </ComponentCard>
      </div>
    </>
  );
}
