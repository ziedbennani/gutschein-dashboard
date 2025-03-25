import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllCoupons } from "@/lib/prismaFunctions";

export const dynamic = "force-dynamic"; // Disable static rendering
export const revalidate = 0; // Disable cache

export default async function DemoPage() {
  try {
    const data = await getAllCoupons();

    return (
      <div className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error in DemoPage:", error);
    // Return an error state or empty table
    return (
      <div className="container mx-auto">
        <DataTable columns={columns} data={[]} />
      </div>
    );
  }
}
